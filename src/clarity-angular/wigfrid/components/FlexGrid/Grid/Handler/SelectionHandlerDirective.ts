import {CellRange} from "../CellRange";
import {CellRangeEventArgs} from "../CellRangeEventArgs";
import {SelectionMode} from "../enum/SelectionMode";
import {RowColFlags} from "../enum/RowColFlags";
import {Row} from "../RowColumn";
import {SelectedState} from "../enum/SelectedState";
import {isNumber, asType} from "../../../../core/index";
import {SelMove} from "../enum/SelMove";
import {Inject, forwardRef, Directive} from "@angular/core";
import {FlexGridDirective} from "../FlexGridDirective";

/**
 * Handles the grid's selection.
 */
@Directive({
    selector: 'ar-flex-grid'
})
export class SelectionHandlerDirective {
	_g: FlexGridDirective;
	_sel = new CellRange(0, 0);
	_mode = SelectionMode.CellRange;

	/**
	 * Initializes a new instance of a @see:_SelectionHandler.
	 *
	 * @param grid @see:FlexGrid that owns this @see:_SelectionHandler.
	 */
	constructor(
		@Inject(forwardRef(() => FlexGridDirective))
		grid: FlexGridDirective
	) {
		this._g = grid;
        console.debug('SelectionHandlerDirective instantiate successfully');
	}

	/**
	 * Gets or sets the current selection mode.
	 */
	get selectionMode(): SelectionMode {
		return this._g.selectionMode;
        // return this._mode;
	}
	set selectionMode(value: SelectionMode) {
		if (value != this._mode) {

			// update listbox selection when switching modes
			if (value == SelectionMode.ListBox || this._mode == SelectionMode.ListBox) {
				let rows = this._g.rows;
				for (let i = 0; i < rows.length; i++) {
					(<Row>rows[i])._setFlag(
						RowColFlags.Selected,
						(value == SelectionMode.ListBox) ? this._sel.containsRow(i) : false,
						false);
				}
			}

			// apply new mode
			this._mode = value;
			this._g.invalidate();
		}
	}
	/**
	 * Gets or sets the current selection.
	 */
	get selection(): CellRange {
		return this._sel;
	}
	set selection(value: CellRange) {
		this.select(value);
	}
	/**
	 * Gets a @see:SelectedState value that indicates the selected state of a cell.
	 *
	 * @param r Row index of the cell to inspect.
	 * @param c Column index of the cell to inspect.
	 */
	getSelectedState(r: number, c: number): SelectedState {

		// disabled selection
		if (this._mode == SelectionMode.None) {
			return SelectedState.None;
		}

		// get current selection
		let sel = this._sel;

		// handle merged ranges
		let g = this._g;
		let rng = g.getMergedRange(g.cells, r, c);
		if (rng) {
			if (rng.contains(sel.row, sel.col)) {
				return SelectedState.Cursor;
			} else if (rng.intersects(sel)) {
				return SelectedState.Selected;
			}
		}

		// cursor
		if (sel.row == r && sel.col == c) {
			return SelectedState.Cursor;
		}

		// special cases: row/col selected property
		if (g.rows[r].isSelected || g.columns[c].isSelected) {
			return SelectedState.Selected;
		}

		// adjust for selection mode
		sel = this._adjustSelection(sel);

		// row/column headers (either row or col is -1)
		if ((r < 0 && sel.containsColumn(c)) ||
			(c < 0 && sel.containsRow(r))) {
			return SelectedState.Selected;
		}

		// ListBox mode (already checked for selected rows/cols)
		if (this._mode == SelectionMode.ListBox) {
			return SelectedState.None;
		}

		// regular ranges
		return sel.containsRow(r) && sel.containsColumn(c)
			? SelectedState.Selected
			: SelectedState.None;
	}
	/**
	 * Selects a cell range and optionally scrolls it into view.
	 *
	 * @param rng Range to select.
	 * @param show Whether to scroll the new selection into view.
	 */
	select(rng: any, show: any = true) {

		// allow passing in row and column indices
		if (isNumber(rng) && isNumber(show)) {
			rng = new CellRange(<number>rng, <number>show);
			show = true;
		}
		rng = asType(rng, CellRange);

		// get old and new selections
		let g = this._g,
			oldSel = this._sel,
			newSel = rng;

		// adjust for selection mode
		switch (g.selectionMode) {
			case SelectionMode.Cell:
				rng.row2 = rng.row;
				rng.col2 = rng.col;
				break;
			case SelectionMode.Row:
				rng.row2 = rng.row;
				break;
			case SelectionMode.ListBox:
				let rows = g.rows;
				for (let i = 0; i < rows.length; i++) {
					(<Row>rows[i])._setFlag(
						RowColFlags.Selected,
						newSel.containsRow(i),
						false);
				}
				// g.invalidate();
				break;
		}

		// no change? done
		if (newSel.equals(oldSel)) {
			if (show) {
				g.scrollIntoView(newSel.row, newSel.col);
			}
			return;
		}

		// raise selectionChanging event
		let e = new CellRangeEventArgs(g.cells, newSel);
		if (!g.onSelectionChanging(e)) {
			return;
		}

		// validate selection after the change
		newSel.row = Math.min(newSel.row, g.rows.length - 1);
		newSel.row2 = Math.min(newSel.row2, g.rows.length - 1);

		// update selection
		this._sel = newSel;

		// show the new selection
        //remove me
		// g.refreshCells(false, true, [
		// 	this._adjustSelection(oldSel),
		// 	this._adjustSelection(newSel)
		// ]);
		if (show) {
			g.scrollIntoView(newSel.row, newSel.col);
		}

		// update collectionView cursor
		if (g.collectionView) {
			let index = g._getCvIndex(newSel.row);
			g.collectionView.moveCurrentToPosition(index);
		}

		// raise selectionChanged event
		g.onSelectionChanged(e);
	}
	/**
	 * Moves the selection by a specified amount in the vertical and horizontal directions.
	 * @param rowMove How to move the row selection.
	 * @param colMove How to move the column selection.
	 * @param extend Whether to extend the current selection or start a new one.
	 */
	moveSelection(rowMove: SelMove, colMove: SelMove, extend: boolean) {
		let row, col,
			g = this._g,
			rows = g.rows,
			cols = g.columns,
			rng = this._getReferenceCell(rowMove, colMove, extend),
			pageSize = Math.max(0, g.clientSize.height - g.columnHeaders.height);

		// handle next cell with wrapping
		if (colMove == SelMove.NextCell) {
			col = cols.getNextCell(rng.col, SelMove.Next, pageSize);
			row = rng.row;
			if (col == rng.col) {
				row = rows.getNextCell(row, SelMove.Next, pageSize);
				if (row > rng.row) {
					col = cols.getNextCell(0, SelMove.Next, pageSize);
					col = cols.getNextCell(col, SelMove.Prev, pageSize);
				}
			}
			g.select(row, col);

		} else if (colMove == SelMove.PrevCell) {

			col = cols.getNextCell(rng.col, SelMove.Prev, pageSize);
			row = rng.row;
			if (col == rng.col) { // reached first column, wrap to previous row
				row = rows.getNextCell(row, SelMove.Prev, pageSize);
				if (row < rng.row) {
					col = cols.getNextCell(cols.length - 1, SelMove.Prev, pageSize);
					col = cols.getNextCell(col, SelMove.Next, pageSize);
				}
			}
			g.select(row, col);

		} else {

			// get target row, column
			row = rows.getNextCell(rng.row, rowMove, pageSize);
			col = cols.getNextCell(rng.col, colMove, pageSize);

			// extend or select
			if (extend) {
				let sel = g.selection;
				g.select(new CellRange(row, col, sel.row2, sel.col2));
			} else {
				g.select(row, col);
			}
		}
	}

	// get reference cell for selection change, taking merging into account
	private _getReferenceCell(rowMove: SelMove, colMove: SelMove, extend: boolean): CellRange
	{
		let g = this._g,
			sel = g.selection,
			rng = g.getMergedRange(g.cells, sel.row, sel.col);

		// not merging? use selection as a reference
		if (!rng || rng.isSingleCell) {
			return sel;
		}

		// clone range and set reference cell within the range
		rng = rng.clone();
		switch (rowMove) {
			case SelMove.Next:
			case SelMove.NextCell:
				rng.row = rng.bottomRow;
				break;
			case SelMove.None:
				rng.row = sel.row;
				break;
		}
		switch (colMove) {
			case SelMove.Next:
			case SelMove.NextCell:
				rng.col = rng.rightCol;
				break;
			case SelMove.None:
				rng.col = sel.col;
				break;
		}

		// done
		return rng;
	}

	// adjusts a selection to reflect the current selection mode.
	private _adjustSelection(rng: CellRange): CellRange {
		switch (this._mode) {
			case SelectionMode.Cell:
				return new CellRange(rng.row, rng.col, rng.row, rng.col);
			case SelectionMode.Row:
				return new CellRange(rng.row, 0, rng.row, this._g.columns.length - 1);
			case SelectionMode.RowRange:
			case SelectionMode.ListBox:
				return new CellRange(rng.row, 0, rng.row2, this._g.columns.length - 1);
		}
		return rng;
	}
}
