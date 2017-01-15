
/**
 * Specifies constants that define the row/column dragging behavior.
 */
export enum AllowDragging {
    /** The user may not drag rows or columns. */
    None    = 0x0,
    /** The user may drag columns. */
    Columns = 0x1,
    /** The user may drag rows. */
    Rows    = 0x2,
    /** The user may drag rows and columns. */
    Both    = Rows | Columns
}
