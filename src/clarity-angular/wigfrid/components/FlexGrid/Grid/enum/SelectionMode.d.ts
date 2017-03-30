/**
 * Specifies constants that define the selection behavior.
 */
export declare enum SelectionMode {
    /** The user cannot select cells with the mouse or keyboard. */
    None = 0,
    /** The user can select only a single cell at a time. */
    Cell = 1,
    /** The user can select contiguous blocks of cells. */
    CellRange = 2,
    /** The user can select a single row at a time. */
    Row = 3,
    /** The user can select contiguous rows. */
    RowRange = 4,
    /** The user can select non-contiguous rows. */
    ListBox = 5,
}
