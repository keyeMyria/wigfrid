/**
 * Identifies the type of cell in a @see:GridPanel.
 */
export enum CellType {
    /** Unknown or invalid cell type. */
    None,
    /** Regular data cell. */
    Cell,
    /** Column header cell. */
    ColumnHeader,
    /** Row header cell. */
    RowHeader,
    /** Top-left cell. */
    TopLeft
}