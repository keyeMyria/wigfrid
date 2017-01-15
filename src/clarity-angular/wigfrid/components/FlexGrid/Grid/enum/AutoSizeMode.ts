/**
 * Specifies constants that define the row/column auto-sizing behavior.
 */
export enum AutoSizeMode {
    /** Autosizing is disabled. */
    None        = 0x0,
    /** Autosizing accounts for header cells. */
    Headers     = 0x1,
    /** Autosizing accounts for data cells. */
    Cells       = 0x2,
    /** Autosizing accounts for header and data cells. */
    Both        = Headers | Cells
}
