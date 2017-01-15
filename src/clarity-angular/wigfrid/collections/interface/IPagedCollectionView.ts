
import {ICollectionView} from "./ICollectionView";
import {Event} from '../../event/Event';


/**
 * Defines methods and properties that extend @see:ICollectionView to provide
 * paging capabilities.
 */
export interface IPagedCollectionView extends ICollectionView {
    /**
     `        * Gets a value that indicates whether the @see:pageIndex value can change.
     */
    canChangePage: boolean;
    /**
     `        * Gets a value that indicates whether the index is changing.
     */
    isPageChanging: boolean;
    /**
     `        * Gets the number of items in the view taking paging into account.
     *
     * To get the total number of items, use the @see:totalItemCount property.
     *
     * Notice that this is different from the .NET <b>IPagedCollectionView</b>,
     * where <b>itemCount</b> and <b>totalItemCount</b> both return the count
     * before paging is applied.
     */
    itemCount: number;
    /**
     `        * Gets the zero-based index of the current page.
     */
    pageIndex: number;
    /**
     `        * Gets or sets the number of items to display on a page.
     */
    pageSize: number;
    /**
     `        * Gets the total number of items in the view before paging is applied.
     *
     * To get the number of items in the current view not taking paging into
     * account, use the @see:itemCount property.
     *
     * Notice that this is different from the .NET <b>IPagedCollectionView</b>,
     * where <b>itemCount</b> and <b>totalItemCount</b> both return the count
     * before paging is applied.
     */
    totalItemCount: number;
    /**
     * Sets the first page as the current page.
     */
    moveToFirstPage(): boolean;
    /**
     * Sets the last page as the current page.
     */
    moveToLastPage(): boolean;
    /**
     * Moves to the page after the current page.
     */
    moveToNextPage(): boolean;
    /**
     * Moves to the page at the specified index.
     *
     * @param index Index of the page to move to.
     */
    moveToPage(index: number): boolean;
    /**
     * Moves to the page before the current page.
     */
    moveToPreviousPage(): boolean;
    /**
     * Occurs after the page index changes.
     */
    pageChanged: Event;
    /**
     * Occurs before the page index changes.
     */
    pageChanging: Event;
}
