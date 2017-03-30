import { GridPanel } from "./GridPanel";
import { Size } from "../../../core/index";
/**
 * Represents a rectangular group of cells defined by two row indices and
 * two column indices.
 */
export declare class CellRange {
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
    constructor(r?: number, c?: number, r2?: number, c2?: number);
    /**
     * Gets or sets the index of the first row in the range.
     */
    row: number;
    /**
     * Gets or sets the index of the first column in the range.
     */
    col: number;
    /**
     * Gets or sets the index of the second row in the range.
     */
    row2: number;
    /**
     * Gets or sets the index of the second column in the range.
     */
    col2: number;
    /**
     * Creates a copy of the range.
     */
    clone(): CellRange;
    /**
     * Gets the number of rows in the range.
     */
    readonly rowSpan: number;
    /**
     * Gets the number of columns in the range.
     */
    readonly columnSpan: number;
    /**
     * Gets the index of the top row in the range.
     */
    readonly topRow: number;
    /**
     * Gets the index of the bottom row in the range.
     */
    readonly bottomRow: number;
    /**
     * Gets the index of the leftmost column in the range.
     */
    readonly leftCol: number;
    /**
     * Gets the index of the rightmost column in the range.
     */
    readonly rightCol: number;
    /**
     * Checks whether the range contains valid row and column indices
     * (row and column values are zero or greater).
     */
    readonly isValid: boolean;
    /**
     * Checks whether this range corresponds to a single cell (beginning and ending rows have
     * the same index, and beginning and ending columns have the same index).
     */
    readonly isSingleCell: boolean;
    /**
     * Checks whether the range contains another range or a specific cell.
     *
     * @param r The CellRange object or row index to find.
     * @param c The column index (required if the r parameter is not a CellRange object).
     */
    contains(r: any, c?: number): boolean;
    /**
     * Checks whether the range contains a given row.
     *
     * @param r The index of the row to find.
     */
    containsRow(r: number): boolean;
    /**
     * Checks whether the range contains a given column.
     *
     * @param c The index of the column to find.
     */
    containsColumn(c: number): boolean;
    /**
     * Checks whether the range intersects another range.
     *
     * @param rng The CellRange object to check.
     */
    intersects(rng: CellRange): boolean;
    /**
     * Gets the rendered size of this range.
     *
     * @param panel The @see:GridPanel object that contains the range.
     * @return A @see:Size object that represents the sum of row heights and column widths in the range.
     */
    getRenderSize(panel: GridPanel): Size;
    /**
     * Checks whether the range equals another range.
     * @param rng The CellRange object to compare to this range.
     */
    equals(rng: CellRange): boolean;
}
