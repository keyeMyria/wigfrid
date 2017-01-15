/**
 * Specifies constants that define the selection behavior.
 */
export enum SelectionMode {
    /** The user cannot select cells with the mouse or keyboard. */
    None,
    /** The user can select only a single cell at a time. */
    Cell,
    /** The user can select contiguous blocks of cells. */
    CellRange,
    /** The user can select a single row at a time. */
    Row,
    /** The user can select contiguous rows. */
    RowRange,
    /** The user can select non-contiguous rows. */
    ListBox
}