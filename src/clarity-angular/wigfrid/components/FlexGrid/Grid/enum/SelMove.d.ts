/**
 * Specifies a type of movement for the selection.
 */
export declare enum SelMove {
    /** Do not change the selection. */
    None = 0,
    /** Select the next visible cell. */
    Next = 1,
    /** Select the previous visible cell. */
    Prev = 2,
    /** Select the first visible cell in the next page. */
    NextPage = 3,
    /** Select the first visible cell in the previous page. */
    PrevPage = 4,
    /** Select the first visible cell. */
    Home = 5,
    /** Select the last visible cell. */
    End = 6,
    /** Select the next visible cell skipping rows if necessary. */
    NextCell = 7,
    /** Select the previous visible cell skipping rows if necessary. */
    PrevCell = 8,
}
