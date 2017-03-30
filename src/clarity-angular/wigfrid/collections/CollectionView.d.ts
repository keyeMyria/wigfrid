import { Event } from "../event/Event";
import { EventArgs } from "../eventArgs/EventArgs";
import { CancelEventArgs } from "../eventArgs/CancelEventArgs";
import { ObservableArray } from "./ObservableArray";
import { IEditableCollectionView } from "../collections/interface/IEditableCollectionView";
import { IPagedCollectionView } from "../collections/interface/IPagedCollectionView";
import { INotifyCollectionChanged } from "../collections/interface/INotifyCollectionChanged";
import { IPredicate } from "../collections/interface/IPredicate";
import { NotifyCollectionChangedEventArgs } from "./eventArgs/NotifyCollectionChangedEventArgs";
import { PageChangingEventArgs } from "./eventArgs/PageChangingEventArgs";
import { CollectionViewGroup } from "./CollectionViewGroup";
import { EventEmitter } from "@angular/core";
import { Observable, Subscriber } from "rxjs/Rx";
/**
 * Class that implements the @see:ICollectionView interface to expose data in
 * regular JavaScript arrays.
 *
 * The @see:CollectionView class implements the following interfaces:
 * <ul>
 *   <li>@see:ICollectionView: provides current record management,
 *       custom sorting, filtering, and grouping.</li>
 *   <li>@see:IEditableCollectionView: provides methods for editing,
 *       adding, and removing items.</li>
 *   <li>@see:IPagedCollectionView: provides paging.</li>
 * </ul>
 *
 * To use the @see:CollectionView class, start by declaring it and passing a
 * regular array as a data source. Then configure the view using the
 * @see:filter, @see:sortDescriptions, @see:groupDescriptions, and
 * @see:pageSize properties. Finally, access the view using the @see:items
 * property. For example:
 *
 * <pre>
 *   // create a new CollectionView
 *   var cv = new wijmo.collections.CollectionView(myArray);
 *   // sort items by amount in descending order
 *   var sd = new wijmo.collections.SortDescription('amount', false);
 *   cv.sortDescriptions.push(sd);
 *   // show only items with amounts greater than 100
 *   cv.filter = function(item) { return item.amount > 100 };
 *   // show the sorted, filtered result on the console
 *   for (var i = 0; i &lt; cv.items.length; i++) {
     *     var item = cv.items[i];
     *     console.log(i + ': ' + item.name + ' ' + item.amount);
     *   }
 * </pre>
 * @deprecated
 */
export declare class CollectionView extends Observable implements IEditableCollectionView, IPagedCollectionView {
    _src: any[];
    _ncc: INotifyCollectionChanged;
    _view: any[];
    _pgView: any[];
    _groups: CollectionViewGroup[];
    _fullGroups: CollectionViewGroup[];
    _digest: string;
    _idx: number;
    _filter: IPredicate;
    _srtDsc: ObservableArray;
    _grpDesc: ObservableArray;
    _newItem: any;
    _edtItem: any;
    _edtClone: any;
    _pgSz: number;
    _pgIdx: number;
    _updating: number;
    _itemCreator: Function;
    _canFilter: boolean;
    _canGroup: boolean;
    _canSort: boolean;
    _canAddNew: boolean;
    _canCancelEdit: boolean;
    _canRemove: boolean;
    _canChangePage: boolean;
    _trackChanges: boolean;
    _chgAdded: ObservableArray;
    _chgRemoved: ObservableArray;
    _chgEdited: ObservableArray;
    _srtCvt: Function;
    /**
     * Initializes a new instance of a @see:CollectionView.
     *
     * @param sourceCollection Array that serves as a source for this
     * @see:CollectionView.
     */
    constructor(sourceCollection?: any);
    /**
     * Gets or sets a function that creates new items for the collection.
     *
     * If the creator function is not supplied, the @see:CollectionView
     * will try to create an uninitilized item of the appropriate type.
     *
     * If the creator function is supplied, it should be a function that
     * takes no parameters and returns an initialized object of the proper
     * type for the collection.
     */
    newItemCreator: Function;
    /**
     * Gets or sets a function used to convert values when sorting.
     *
     * If provided, the function should take as parameters a
     * @see:SortDescription, a data item, and a value to convert,
     * and should return the converted value.
     *
     * This property provides a way to customize sorting. For example,
     * the @see:FlexGrid control uses it to sort mapped columns by
     * display value instead of by raw value.
     *
     * For example, the code below causes a @see:CollectionView to
     * sort the 'country' property, which contains country code integers,
     * using the corresponding country names:
     *
     * <pre>var countries = 'US,Germany,UK,Japan,Italy,Greece'.split(',');
     * collectionView.sortConverter = function (sd, item, value) {
         *   if (sd.property == 'countryMapped') {
         *     value = countries[value]; // convert country id into name
         *   }
         *   return value;
         * }</pre>
     */
    sortConverter: Function;
    /**
     * Returns true if the caller queries for a supported interface.
     *
     * @param interfaceName Name of the interface to look for.
     */
    implementsInterface(interfaceName: string): boolean;
    /**
     * Gets or sets a value that determines whether the control should
     * track changes to the data.
     *
     * If @see:trackChanges is set to true, the @see:CollectionView keeps
     * track of changes to the data and exposes them through the
     * @see:itemsAdded, @see:itemsRemoved, and @see:itemsEdited collections.
     *
     * Tracking changes is useful in situations where you need to to update
     * the server after the user has confirmed that the modifications are
     * valid.
     *
     * After committing or cancelling changes, use the @see:clearChanges method
     * to clear the @see:itemsAdded, @see:itemsRemoved, and @see:itemsEdited
     * collections.
     *
     * The @see:CollectionView only tracks changes made when the proper
     * @see:CollectionView methods are used (@see:editItem/@see:commitEdit,
     * @see:addNew/@see:commitNew, and @see:remove).
     * Changes made directly to the data are not tracked.
     */
    trackChanges: boolean;
    /**
     * Gets an @see:ObservableArray containing the records that were added to
     * the collection since @see:changeTracking was enabled.
     */
    readonly itemsAdded: ObservableArray;
    /**
     * Gets an @see:ObservableArray containing the records that were removed from
     * the collection since @see:changeTracking was enabled.
     */
    readonly itemsRemoved: ObservableArray;
    /**
     * Gets an @see:ObservableArray containing the records that were edited in
     * the collection since @see:changeTracking was enabled.
     */
    readonly itemsEdited: ObservableArray;
    /**
     * Clears all changes by removing all items in the @see:itemsAdded,
     * @see:itemsRemoved, and @see:itemsEdited collections.
     *
     * Call this method after committing changes to the server or
     * after refreshing the data from the server.
     */
    clearChanges(): void;
    /**
     * Occurs when the collection changes.
     */
    collectionChanged: EventEmitter<{}>;
    /**
     * Raises the @see:collectionChanged event.
     *
     * @param e Contains a description of the change.
     */
    onCollectionChanged(e?: NotifyCollectionChangedEventArgs): void;
    private _raiseCollectionChanged(action?, item?, index?);
    /**
     * Gets a value that indicates whether this view supports filtering via the
     * @see:filter property.
     */
    canFilter: boolean;
    /**
     * Gets a value that indicates whether this view supports grouping via the
     * @see:groupDescriptions property.
     */
    canGroup: boolean;
    /**
     * Gets a value that indicates whether this view supports sorting via the
     * @see:sortDescriptions property.
     */
    canSort: boolean;
    /**
     * Gets or sets the current item in the view.
     */
    currentItem: any;
    /**
     * Gets the ordinal position of the current item in the view.
     */
    readonly currentPosition: number;
    /**
     * Gets or sets a callback used to determine if an item is suitable for
     * inclusion in the view.
     *
     * The callback function should return true if the item passed in as a
     * parameter should be included in the view.
     *
     * NOTE: If the filter function needs a scope (i.e. a meaningful 'this'
     * value) remember to set the filter using the 'bind' function to  specify
     * the 'this' object. For example:
     * <pre>
     *   collectionView.filter = this._filter.bind(this);
     * </pre>
     */
    filter: IPredicate;
    /**
     * Gets a collection of @see:GroupDescription objects that describe how the
     * items in the collection are grouped in the view.
     */
    readonly groupDescriptions: ObservableArray;
    /**
     * Gets an array of @see:CollectionViewGroup objects that represents the
     * top-level groups.
     */
    readonly groups: CollectionViewGroup[];
    /**
     * Gets a value that indicates whether this view contains no items.
     */
    readonly isEmpty: boolean;
    /**
     * Gets a collection of @see:SortDescription objects that describe how the items
     * in the collection are sorted in the view.
     */
    readonly sortDescriptions: ObservableArray;
    /**
     * Gets or sets the underlying (unfiltered and unsorted) collection.
     */
    sourceCollection: any;
    private _sourceChanged(s, e);
    /**
     * Returns a value indicating whether a given item belongs to this view.
     *
     * @param item Item to seek.
     */
    contains(item: any): boolean;
    /**
     * Sets the specified item to be the current item in the view.
     *
     * @param item Item that will become current.
     */
    moveCurrentTo(item: any): boolean;
    /**
     * Sets the first item in the view as the current item.
     */
    moveCurrentToFirst(): boolean;
    /**
     * Sets the last item in the view as the current item.
     */
    moveCurrentToLast(): boolean;
    /**
     * Sets the item after the current item in the view as the current item.
     */
    moveCurrentToNext(): boolean;
    /**
     * Sets the item at the specified index in the view as the current item.
     *
     * @param index Index of the item that will become current.
     */
    moveCurrentToPosition(index: number): boolean;
    /**
     * Sets the item before the current item in the view as the current item.
     */
    moveCurrentToPrevious(): boolean;
    /**
     * Re-creates the view using the current sort, filter, and group parameters.
     */
    refresh(): void;
    _performRefresh(): void;
    _performSort(items: any[]): void;
    _compareItems(): (a: any, b: any) => number;
    _performFilter(items: any[]): any[];
    /**
     * Occurs after the current item changes.
     */
    currentChanged: EventEmitter<{}>;
    /**
     * Raises the @see:currentChanged event.
     */
    onCurrentChanged(e?: EventArgs): void;
    /**
     * Occurs before the current item changes.
     */
    currentChanging: EventEmitter<{}>;
    /**
     * Raises the @see:currentChanging event.
     *
     * @param e @see:CancelEventArgs that contains the event data.
     */
    onCurrentChanging(e: CancelEventArgs): boolean;
    /**
     * Gets items in the view.
     */
    readonly items: any[];
    /**
     * Suspend refreshes until the next call to @see:endUpdate.
     */
    beginUpdate(): void;
    /**
     * Resume refreshes suspended by a call to @see:beginUpdate.
     */
    endUpdate(): void;
    /**
     * Gets a value that indicates whether notifications are currently suspended
     * (see @see:beginUpdate and @see:endUpdate).
     */
    readonly isUpdating: boolean;
    /**
     * Executes a function within a @see:beginUpdate/@see:endUpdate block.
     *
     * The collection will not be refreshed until the function finishes.
     * This method ensures @see:endUpdate is called even if the function throws.
     *
     * @param fn Function to be executed without updates.
     */
    deferUpdate(fn: Function): void;
    /**
     * Gets a value that indicates whether a new item can be added to the collection.
     */
    canAddNew: boolean;
    /**
     * Gets a value that indicates whether the collection view can discard pending changes
     * and restore the original values of an edited object.
     */
    canCancelEdit: boolean;
    /**
     * Gets a value that indicates whether items can be removed from the collection.
     */
    canRemove: boolean;
    /**
     * Gets the item that is being added during the current add transaction.
     */
    readonly currentAddItem: any;
    /**
     * Gets the item that is being edited during the current edit transaction.
     */
    readonly currentEditItem: any;
    /**
     * Gets a value that indicates whether an add transaction is in progress.
     */
    readonly isAddingNew: boolean;
    /**
     * Gets a value that indicates whether an edit transaction is in progress.
     */
    readonly isEditingItem: boolean;
    /**
     * Creates a new item and adds it to the collection.
     *
     * This method takes no parameters. It creates a new item, adds it to the
     * collection, and prevents refresh operations until the new item is
     * committed using the @see:commitNew method or canceled using the
     * @see:cancelNew method.
     *
     * The code below shows how the @see:addNew method is typically used:
     *
     * <pre>
     * // create the new item, add it to the collection
     * var newItem = view.addNew();
     * // initialize the new item
     * newItem.id = getFreshId();
     * newItem.name = 'New Customer';
     * // commit the new item so the view can be refreshed
     * view.commitNew();
     * </pre>
     *
     * You can also add new items by pushing them into the @see:sourceCollection
     * and then calling the @see:refresh method. The main advantage of @see:addNew
     * is in user-interactive scenarios (like adding new items in a data grid),
     * because it gives users the ability to cancel the add operation. It also
     * prevents the new item from being sorted or filtered out of view until the
     * add operation is committed.
     *
     * @return The item that was added to the collection.
     */
    addNew(): any;
    /**
     * Ends the current edit transaction and, if possible,
     * restores the original value to the item.
     */
    cancelEdit(): void;
    /**
     * Ends the current add transaction and discards the pending new item.
     */
    cancelNew(): void;
    /**
     * Ends the current edit transaction and saves the pending changes.
     */
    commitEdit(): void;
    /**
     * Track changes applied to an item (not necessarily the current edit item).
     *
     * @param item Item that has been changed.
     */
    _trackItemChanged(item: any): void;
    /**
     * Ends the current add transaction and saves the pending new item.
     */
    commitNew(): void;
    /**
     * Begins an edit transaction of the specified item.
     *
     * @param item Item to be edited.
     */
    editItem(item: any): void;
    /**
     * Removes the specified item from the collection.
     *
     * @param item Item to be removed from the collection.
     */
    remove(item: any): void;
    /**
     * Removes the item at the specified index from the collection.
     *
     * @param index Index of the item to be removed from the collection.
     * The index is relative to the view, not to the source collection.
     */
    removeAt(index: number): void;
    _extend(dst: any, src: any): void;
    _sameContent(dst: any, src: any): boolean;
    _sameValue(v1: any, v2: any): boolean;
    /**
     * Gets a value that indicates whether the @see:pageIndex value can change.
     */
    canChangePage: boolean;
    /**
     * Gets a value that indicates whether the page index is changing.
     */
    readonly isPageChanging: boolean;
    /**
     * Gets the total number of items in the view taking paging into account.
     */
    readonly itemCount: number;
    /**
     * Gets the zero-based index of the current page.
     */
    readonly pageIndex: number;
    /**
     * Gets or sets the number of items to display on a page.
     */
    pageSize: number;
    /**
     * Gets the total number of items in the view before paging is applied.
     */
    readonly totalItemCount: number;
    /**
     * Gets the total number of pages.
     */
    readonly pageCount: number;
    /**
     * Sets the first page as the current page.
     *
     * @return True if the page index was changed successfully.
     */
    moveToFirstPage(): boolean;
    /**
     * Sets the last page as the current page.
     *
     * @return True if the page index was changed successfully.
     */
    moveToLastPage(): boolean;
    /**
     * Moves to the page after the current page.
     *
     * @return True if the page index was changed successfully.
     */
    moveToNextPage(): boolean;
    /**
     * Moves to the page at the specified index.
     *
     * @param index Index of the page to move to.
     * @return True if the page index was changed successfully.
     */
    moveToPage(index: number): boolean;
    /**
     * Moves to the page before the current page.
     *
     * @return True if the page index was changed successfully.
     */
    moveToPreviousPage(): boolean;
    /**
     * Occurs after the page index changes.
     */
    pageChanged: Event;
    /**
     * Raises the @see:pageChanged event.
     */
    onPageChanged(e?: EventArgs): void;
    /**
     * Occurs before the page index changes.
     */
    pageChanging: Event;
    /**
     * Raises the @see:pageChanging event.
     *
     * @param e @see:PageChangingEventArgs that contains the event data.
     */
    onPageChanging(e: PageChangingEventArgs): boolean;
    _getFullGroup(g: CollectionViewGroup): CollectionViewGroup;
    _getGroupByPath(groups: CollectionViewGroup[], level: number, path: string): CollectionViewGroup;
    _getPageView(): any[];
    _createGroups(items: any[]): CollectionViewGroup[];
    private _getGroupsDigest(groups);
    private _mergeGroupItems(groups);
    private _getGroup(gd, groups, map, name, level, isBottomLevel);
    completeAllStream(): void;
    _subscribe(subscriber: Subscriber): void;
}
