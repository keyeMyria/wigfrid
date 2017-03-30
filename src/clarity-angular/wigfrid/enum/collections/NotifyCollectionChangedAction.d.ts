/**
 * Describes the action that caused the @see:collectionChanged event.
 */
export declare enum NotifyCollectionChangedAction {
    /** items was added to the collection. */
    Add = 0,
    /** items was removed from the collection. */
    Remove = 1,
    /** items was changed or replaced. */
    Change = 2,
    /**
     * Several items changed simultaneously, just index change
     * (for example, the collection was sorted, reverse, filtered, or grouped).
     */
    Reset = 3,
    Splice = 4,
}
