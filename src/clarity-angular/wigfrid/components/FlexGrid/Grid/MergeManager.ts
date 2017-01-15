import {GridPanel} from './GridPanel'
import {CellRange} from './CellRange'
import {_NewRowTemplate} from './Handler/_NewRowTemplate'
import {GroupRow} from './RowColumn'
import {CollectionViewGroup} from "../../../collections/CollectionViewGroup";
import {CellType} from "./enum/CellType";
import {Aggregate} from "../../../enum/Aggregate";
import {Injectable} from "@angular/core";
import {Inject} from "@angular/core";
import {forwardRef} from "@angular/core";
import {FlexGridComponent} from "./FlexGridComponent";


/**
 * Specifies constants that define which areas of the grid support cell merging.
 */
export enum AllowMerging
{
	/** No merging. */
	None = 0,
	/** Merge scrollable cells. */
	Cells = 1,
	/** Merge column headers. */
	ColumnHeaders = 2,
	/** Merge row headers. */
	RowHeaders = 4,
	/** Merge column and row headers. */
	AllHeaders = ColumnHeaders | RowHeaders,
	/** Merge all areas. */
	All = Cells | AllHeaders
}

/**
 * Defines the @see:FlexGrid's cell merging behavior.
 *
 * An instance of this class is automatically created and assigned to
 * the grid's @see:mergeManager property to implement the grid's default
 * merging behavior.
 *
 * If you want to customize the default merging behavior, create a class
 * that derives from @see:MergeManager and override the @see:getMergedRange method.
 */
@Injectable()
export class MergeManager {
	_g: FlexGridComponent;

	/**
	 * Initializes a new instance of a @see:MergeManager object.
	 *
	 * @param grid The @see:FlexGrid object that owns this @see:MergeManager.
	 */
	constructor(
		@Inject(forwardRef(() => FlexGridComponent))
		grid: FlexGridComponent
	) {
	    console.debug('MergeManager instantiate successfully');
		this._g = grid;
	}

	/**
	 * Gets a @see:CellRange that specifies the merged extent of a cell
	 * in a @see:GridPanel.
	 *
	 * @param panel The @see:GridPanel that contains the range.
	 * @param r The index of the row that contains the cell.
	 * @param c The index of the column that contains the cell.
	 * @return A @see:CellRange that specifies the merged range, or null if the cell is not merged.
	 */
	getMergedRange(panel: GridPanel, r: number, c: number): CellRange {
		let rng: CellRange,
            vr: CellRange;
        const ct = panel.cellType,
            cols = panel.columns,
            rows = panel.rows,
            row  = rows[r],
            col  = cols[c];

		// no merging in new row template (TFS 82235)
		if (row instanceof _NewRowTemplate) {
			return null;
		}

		// merge cells in group rows
		if (row instanceof GroupRow && row.dataItem instanceof CollectionViewGroup) {
			rng = new CellRange(r, c);

			// expand left and right preserving aggregates
			if (col.aggregate == Aggregate.None) {
				while (rng.col > 0 &&
				cols[rng.col - 1].aggregate == Aggregate.None &&
				rng.col != cols.frozen) {
					rng.col--;
				}
				while (rng.col2 < cols.length - 1 &&
				cols[rng.col2 + 1].aggregate == Aggregate.None &&
				rng.col2 + 1 != cols.frozen) {
					rng.col2++;
				}
			}

			// don't start range with invisible columns
			while (rng.col < c && !cols[rng.col].visible) {
				rng.col++;
			}

			// return merged range
			return rng.isSingleCell ? null : rng;
		}

		// honor grid's allowMerging setting
		let done = false;
		switch (this._g.allowMerging) {
			case AllowMerging.None:
				done = true;
				break;
			case AllowMerging.Cells:
				done = ct != CellType.Cell;
				break;
			case AllowMerging.ColumnHeaders:
				done = ct != CellType.ColumnHeader && ct != CellType.TopLeft;
				break;
			case AllowMerging.RowHeaders:
				done = ct != CellType.RowHeader && ct != CellType.TopLeft;
				break;
			case AllowMerging.AllHeaders:
				done = ct == CellType.Cell;
				break;
		}
		if (done) {
			return null;
		}

		// merge up and down columns
		if (cols[c].allowMerging) {
			rng = new CellRange(r, c);

			// clip to current viewport
			let rMin = 0,
                rMax = rows.length - 1;
			if (r >= rows.frozen) {
				if (ct == CellType.Cell || ct == CellType.RowHeader) {
					vr = panel._getViewRange(true, true);
					rMin = vr.topRow;
					rMax = vr.bottomRow;
				}
			} else {
				rMax = rows.frozen - 1;
			}

			// expand up
			var val = panel.getCellData(r, c, true),
				frz = rows.isFrozen(r);
			for (let tr = r - 1; val != null && tr >= rMin; tr--) {
				if (rows[tr] instanceof GroupRow ||
					rows[tr] instanceof _NewRowTemplate ||
					rows.isFrozen(tr) != frz ||
					panel.getCellData(tr, c, true) !== val) {
					break;
				}
				rng.row = tr;
			}

			// expand down
			for (let br = r + 1; val != null && br <= rMax; br++) {
				if (rows[br] instanceof GroupRow ||
					rows[br] instanceof _NewRowTemplate ||
					rows.isFrozen(br) != frz ||
					panel.getCellData(br, c, true) !== val) {
					break;
				}
				rng.row2 = br;
			}

			// don't start range with invisible rows
			while (rng.row < r && !rows[rng.row].visible) {
				rng.row++;
			}

			// done
			if (!rng.isSingleCell) {
				return rng;
			}
		}

		// merge left and right along rows
		if (rows[r].allowMerging) {
			rng = new CellRange(r, c);

			// get merging limits
			let cMin = 0,
                cMax = cols.length - 1;
			if (c >= cols.frozen) {
				if (ct == CellType.Cell || ct == CellType.ColumnHeader) {
					vr = panel._getViewRange(true, true);
					cMin = vr.leftCol;
					cMax = vr.rightCol;
				}
			} else {
				cMax = cols.frozen - 1;
			}

			// expand left
			var val = panel.getCellData(r, c, true),
				frz = cols.isFrozen(c);
			for (let cl = c - 1; cl >= cMin; cl--) {
				if (cols.isFrozen(cl) != frz|| panel.getCellData(r, cl, true) !== val) {
					break;
				}
				rng.col = cl;
			}

			// expand right
			for (let cr = c + 1; cr <= cMax; cr++) {
				if (cols.isFrozen(cr) || panel.getCellData(r, cr, true) !== val) {
					break;
				}
				rng.col2 = cr;
			}

			// don't start range with invisible columns
			while (rng.col < c && !cols[rng.col].visible) {
				rng.col++;
			}

			// done
			if (!rng.isSingleCell) {
				return rng;
			}
		}

		// no merging...
		return null;
	}

	/**
	 * Returns true if the caller queries for a supported interface.
	 *
	 * @param interfaceName Name of the interface to look for.
	 * @return True if the caller queries for a supported interface.
	 */
	implementsInterface(interfaceName: string): boolean {
		return interfaceName == 'IMergeManager';
	}
}
