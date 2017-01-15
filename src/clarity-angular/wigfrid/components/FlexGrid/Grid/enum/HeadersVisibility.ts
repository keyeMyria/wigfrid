/**
 * Specifies constants that specify the visibility of row and column headers.
 */
export enum HeadersVisibility {
    /** No header cells are displayed. */
    None    = 0x0,
    /** Only column header cells are displayed. */
    Column  = 0x1,
    /** Only row header cells are displayed. */
    Row     = 0x2,
    /** Both column and row header cells are displayed. */
    All     = 0x3,
}
