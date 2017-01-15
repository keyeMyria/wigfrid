/**
 * Specifies a type of movement for the selection.
 */
export enum SelMove {
    /** Do not change the selection. */
    None,
    /** Select the next visible cell. */
    Next,
    /** Select the previous visible cell. */
    Prev,
    /** Select the first visible cell in the next page. */
    NextPage,
    /** Select the first visible cell in the previous page. */
    PrevPage,
    /** Select the first visible cell. */
    Home,
    /** Select the last visible cell. */
    End,
    /** Select the next visible cell skipping rows if necessary. */
    NextCell,
    /** Select the previous visible cell skipping rows if necessary. */
    PrevCell
}