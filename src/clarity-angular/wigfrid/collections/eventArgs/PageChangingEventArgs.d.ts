import { CancelEventArgs } from "../../eventArgs/CancelEventArgs";
/**
 * Provides data for the @see:IPagedCollectionView.pageChanging event
 */
export declare class PageChangingEventArgs extends CancelEventArgs {
    /**
     * Gets the index of the page that is about to become current.
     */
    newPageIndex: number;
    /**
     * Initializes a new instance of a @see:PageChangingEventArgs.
     *
     * @param newIndex Index of the page that is about to become current.
     */
    constructor(newIndex: number);
}
