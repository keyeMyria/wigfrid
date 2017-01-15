/**
 * Specifies constants that define the row/column sizing behavior.
 */
export enum AllowResizing {
    /** The user may not resize rows or columns. */
    None    = 0x0,
    /** The user may resize columns. */
    Columns = 0x1,
    /** The user may resize rows. */
    Rows    = 0x2,
    /** The user may resize rows and columns. */
    Both    = Rows | Columns
}
