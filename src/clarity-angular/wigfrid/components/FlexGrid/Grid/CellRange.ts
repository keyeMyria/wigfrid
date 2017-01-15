import {GridPanel} from "./GridPanel";
import {asInt, tryCast, isInt, Size} from "../../../core/index";


/**
 * Represents a rectangular group of cells defined by two row indices and
 * two column indices.
 */
export class CellRange {
	_row: number;
	_col: number;
	_row2: number;
	_col2: number;

	/**
	 * Initializes a new instance of a @see:CellRange.
	 *
	 * @param r The index of the first row in the range.
	 * @param c The index of the first column in the range.
	 * @param r2 The index of the last row in the range.
	 * @param c2 The index of the first column in the range.
	 */
	constructor(r: number = -1, c: number = -1, r2: number = r, c2: number = c) {
		this._row = asInt(r);
		this._col = asInt(c);
		this._row2 = asInt(r2);
		this._col2 = asInt(c2);
	}

	/**
	 * Gets or sets the index of the first row in the range.
	 */
	get row(): number {
		return this._row;
	}
	set row(value: number) {
		this._row = asInt(value);
	}
	/**
	 * Gets or sets the index of the first column in the range.
	 */
	get col(): number {
		return this._col;
	}
	set col(value: number) {
		this._col = asInt(value);
	}
	/**
	 * Gets or sets the index of the second row in the range.
	 */
	get row2(): number {
		return this._row2;
	}
	set row2(value: number) {
		this._row2 = asInt(value);
	}
	/**
	 * Gets or sets the index of the second column in the range.
	 */
	get col2(): number {
		return this._col2;
	}
	set col2(value: number) {
		this._col2 = asInt(value);
	}
	/**
	 * Creates a copy of the range.
	 */
	clone(): CellRange {
		return new CellRange(this._row, this._col, this._row2, this._col2);
	}
	/**
	 * Gets the number of rows in the range.
	 */
	get rowSpan(): number {
		return Math.abs(this._row2 - this._row) + 1;
	}
	/**
	 * Gets the number of columns in the range.
	 */
	get columnSpan(): number {
		return Math.abs(this._col2 - this._col) + 1;
	}
	/**
	 * Gets the index of the top row in the range.
	 */
	get topRow(): number {
		return Math.min(this._row, this._row2);
	}
	/**
	 * Gets the index of the bottom row in the range.
	 */
	get bottomRow(): number {
		return Math.max(this._row, this._row2);
	}
	/**
	 * Gets the index of the leftmost column in the range.
	 */
	get leftCol(): number {
		return Math.min(this._col, this._col2);
	}
	/**
	 * Gets the index of the rightmost column in the range.
	 */
	get rightCol(): number {
		return Math.max(this._col, this._col2);
	}
	/**
	 * Checks whether the range contains valid row and column indices
	 * (row and column values are zero or greater).
	 */
	get isValid(): boolean {
		return this._row > -1 && this._col > -1 && this._row2 > -1 && this._col2 > -1;
	}
	/**
	 * Checks whether this range corresponds to a single cell (beginning and ending rows have
	 * the same index, and beginning and ending columns have the same index).
	 */
	get isSingleCell(): boolean {
		return this._row == this._row2 && this._col == this._col2;
	}
	/**
	 * Checks whether the range contains another range or a specific cell.
	 *
	 * @param r The CellRange object or row index to find.
	 * @param c The column index (required if the r parameter is not a CellRange object).
	 */
	contains(r: any, c?: number): boolean {

		// check other cell range
		const rng = <CellRange>tryCast(r, CellRange);
		if (rng) {
			return rng.topRow >= this.topRow && rng.bottomRow <= this.bottomRow &&
				rng.leftCol >= this.leftCol && rng.rightCol <= this.rightCol;
		}

		// check specific cell
		if (isInt(r) && isInt(c)) {
			return r >= this.topRow && r <= this.bottomRow &&
				c >= this.leftCol && c <= this.rightCol;
		}

		// anything else is an error
		throw 'contains expects a CellRange or row/column indices.';
	}
	/**
	 * Checks whether the range contains a given row.
	 *
	 * @param r The index of the row to find.
	 */
	containsRow(r: number): boolean {
		asInt(r);
		return r >= this.topRow && r <= this.bottomRow;
	}
	/**
	 * Checks whether the range contains a given column.
	 *
	 * @param c The index of the column to find.
	 */
	containsColumn(c: number): boolean {
		asInt(c);
		return c >= this.leftCol && c <= this.rightCol;
	}
	/**
	 * Checks whether the range intersects another range.
	 *
	 * @param rng The CellRange object to check.
	 */
	intersects(rng: CellRange): boolean {
		if (this.rightCol < rng.leftCol || this.leftCol > rng.rightCol ||
			this.bottomRow < rng.topRow || this.topRow > rng.bottomRow) {
			return false;
		}
		return true;
	}
	/**
	 * Gets the rendered size of this range.
	 *
	 * @param panel The @see:GridPanel object that contains the range.
	 * @return A @see:Size object that represents the sum of row heights and column widths in the range.
	 */
	getRenderSize(panel: GridPanel): Size {
		const sz = new Size(0, 0);
		for (let r = this.topRow; r <= this.bottomRow; r++) {
			sz.height += panel.rows[r].renderSize;
		}
		for (let c = this.leftCol; c <= this.rightCol; c++) {
			sz.width += panel.columns[c].renderSize;
		}
		return sz;
	}
	/**
	 * Checks whether the range equals another range.
	 * @param rng The CellRange object to compare to this range.
	 */
	equals(rng: CellRange): boolean {
		return (rng instanceof CellRange) &&
			this._row == rng._row && this._col == rng._col &&
			this._row2 == rng._row2 && this._col2 == rng._col2;
	}
}
