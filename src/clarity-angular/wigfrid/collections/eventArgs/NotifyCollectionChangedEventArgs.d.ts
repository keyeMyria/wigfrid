import { EventArgs } from "../../eventArgs/EventArgs";
import { NotifyCollectionChangedAction } from "../../enum/collections/NotifyCollectionChangedAction";
/**
 * Provides data for the @see:collectionChanged event.
 */
export declare class NotifyCollectionChangedEventArgs extends EventArgs {
    action: NotifyCollectionChangedAction;
    index: number;
    removed: any[];
    added: any[];
    /**
     * Provides a reset notification.
     */
    static reset: NotifyCollectionChangedEventArgs;
    /**
     * Initializes a new instance of an {@link NotifyCollectionChangedEventArgs}.
     *
     * @param action Type of action that caused the event to fire.
     * @param index Index of the item.
     * @param removed Item that was removed.
     * @param added Item that was added.
     */
    constructor(action: NotifyCollectionChangedAction, index?: number, removed?: any[], added?: any[]);
}
