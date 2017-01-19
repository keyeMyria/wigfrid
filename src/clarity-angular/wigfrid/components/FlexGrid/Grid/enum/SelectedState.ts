/**
 * Specifies the selected state of a cell.
 */
export enum SelectedState {
    /** The cell is not selected. */
    None,
    /** The cell is selected but is not the active cell. */
    Selected,
    /** The cell is selected and is the active cell. */
    Cursor,
}
