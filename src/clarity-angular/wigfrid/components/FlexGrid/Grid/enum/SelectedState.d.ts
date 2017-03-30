/**
 * Specifies the selected state of a cell.
 */
export declare enum SelectedState {
    /** The cell is not selected. */
    None = 0,
    /** The cell is selected but is not the active cell. */
    Selected = 1,
    /** The cell is selected and is the active cell. */
    Cursor = 2,
}
