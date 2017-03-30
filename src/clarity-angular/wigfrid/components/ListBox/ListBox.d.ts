import { Control } from '../../core/Control';
import { FormatItemEventArgs } from './../FormatItemEventArgs';
import { EventArgs } from "../../eventArgs/EventArgs";
import { Event } from "../../event/Event";
import { ICollectionView } from "../../interface/collections/ICollectionView";
/**
 * The @see:ListBox control displays a list of items which may contain
 * plain text or HTML, and allows users to select items with the mouse or
 * the keyboard.
 *
 * Use the @see:selectedIndex property to determine which item is currently
 * selected.
 *
 * You can populate a @see:ListBox using an array of strings or you can use
 * an array of objects, in which case the @see:displayPath property determines
 * which object property is displayed on the list.
 *
 * To display HTML rather than plain text, set the @see:isContentHtml property
 * to true.
 *
 * The example below creates a @see:ListBox control and populates it using
 * a 'countries' array. The control updates its @see:selectedIndex and
 * @see:selectedItem properties as the user moves the selection.
 *
 * @fiddle:8HnLx
 */
export declare class ListBox extends Control {
    _items: any;
    _cv: ICollectionView;
    _itemFormatter: Function;
    _pathDisplay: string;
    _pathValue: string;
    _pathChecked: string;
    _html: boolean;
    _checking: boolean;
    _search: string;
    _toSearch: number;
    /**
     * Initializes a new instance of a @see:ListBox.
     *
     * @param element The DOM element that hosts the control, or a selector for the host element (e.g. '#theCtrl').
     * @param options The JavaScript object containing initialization data for the control.
     */
    constructor(element: any, options?: any);
    /**
     * Refreshes the list.
     */
    refresh(): void;
    /**
     * Gets or sets the array or @see:ICollectionView object that contains the list items.
     */
    itemsSource: any;
    /**
     * Gets the @see:ICollectionView object used as the item source.
     */
    readonly collectionView: ICollectionView;
    /**
     * Gets or sets a value indicating whether items contain plain text or HTML.
     */
    isContentHtml: boolean;
    /**
     * Gets or sets a function used to customize the values shown on the list.
     * The function takes two arguments, the item index and the default text or html, and
     * returns the new text or html to display.
     *
     * If the formatting function needs a scope (i.e. a meaningful 'this'
     * value), then remember to set the filter using the 'bind' function to
     * specify the 'this' object. For example:
     *
     * <pre>
     *   listBox.itemFormatter = customItemFormatter.bind(this);
     *   function customItemFormatter(index, content) {
         *     if (this.makeItemBold(index)) {
         *       content = '&lt;b&gt;' + content + '&lt;/b&gt;';
         *     }
         *     return content;
         *   }
     * </pre>
     */
    itemFormatter: Function;
    /**
     * Gets or sets the name of the property to use as the visual representation of the items.
     */
    displayMemberPath: string;
    /**
     * Gets or sets the name of the property used to get the @see:selectedValue
     * from the @see:selectedItem.
     */
    selectedValuePath: string;
    /**
     * Gets or sets the name of the property used to control the checkboxes
     * placed next to each item.
     *
     * Use this property to create multi-select lisboxes.
     * When an item is checked or unchecked, the control raises the @see:itemChecked event.
     * Use the @see:selectedItem property to retrieve the item that was checked or unchecked,
     * or use the @see:checkedItems property to retrieve the list of items that are currently
     * checked.
     */
    checkedMemberPath: string;
    /**
     * Gets the string displayed for the item at a given index.
     *
     * The string may be plain text or HTML, depending on the setting
     * of the @see:isContentHtml property.
     *
     * @param index The index of the item.
     */
    getDisplayValue(index: number): string;
    /**
     * Gets the text displayed for the item at a given index (as plain text).
     *
     * @param index The index of the item.
     */
    getDisplayText(index: number): string;
    /**
     * Gets or sets the index of the currently selected item.
     */
    selectedIndex: number;
    /**
     * Gets or sets the item that is currently selected.
     */
    selectedItem: any;
    /**
     * Gets or sets the value of the @see:selectedItem obtained using the @see:selectedValuePath.
     */
    selectedValue: any;
    /**
     * Gets or sets the maximum height of the list.
     */
    maxHeight: number;
    /**
     * Highlights the selected item and scrolls it into view.
     */
    showSelection(): void;
    /**
     * Gets the checked state of an item on the list.
     *
     * This method is applicable only on multi-select listboxes
     * (see the @see:checkedMemberPath property).
     *
     * @param index Item index.
     */
    getItemChecked(index: number): boolean;
    /**
     * Sets the checked state of an item on the list.
     *
     * This method is applicable only on multi-select listboxes
     * (see the @see:checkedMemberPath property).
     *
     * @param index Item index.
     * @param checked Item's new checked state.
     */
    setItemChecked(index: number, checked: boolean): void;
    /**
     * Toggles the checked state of an item on the list.
     * This method is applicable only to multi-select listboxes
     * (see the @see:checkedMemberPath property).
     *
     * @param index Item index.
     */
    toggleItemChecked(index: number): void;
    /**
     * Gets or sets an array containing the items that are currently checked.
     */
    checkedItems: any[];
    /**
     * Occurs when the value of the @see:selectedIndex property changes.
     */
    selectedIndexChanged: Event;
    /**
     * Raises the @see:selectedIndexChanged event.
     */
    onSelectedIndexChanged(e?: EventArgs): void;
    /**
     * Occurs when the list of items changes.
     */
    itemsChanged: Event;
    /**
     * Raises the @see:itemsChanged event.
     */
    onItemsChanged(e?: EventArgs): void;
    /**
     * Occurs before the list items are generated.
     */
    loadingItems: Event;
    /**
     * Raises the @see:loadingItems event.
     */
    onLoadingItems(e?: EventArgs): void;
    /**
     * Occurs after the list items are generated.
     */
    loadedItems: Event;
    /**
     * Raises the @see:loadedItems event.
     */
    onLoadedItems(e?: EventArgs): void;
    /**
     * Occurs when the current item is checked or unchecked by the user.
     *
     * This event is raised when the @see:checkedMemberPath is set to the name of a
     * property to add checkboxes to each item in the control.
     *
     * Use the @see:selectedItem property to retrieve the item that was checked or
     * unchecked.
     */
    itemChecked: Event;
    /**
     * Raises the @see:itemCheched event.
     */
    onItemChecked(e?: EventArgs): void;
    /**
     * Occurs when the value of the @see:checkedItems property changes.
     */
    checkedItemsChanged: Event;
    /**
     * Raises the @see:checkedItemsChanged event.
     */
    onCheckedItemsChanged(e?: EventArgs): void;
    /**
     * Occurs when an element representing a list item has been created.
     *
     * This event can be used to format list items for display. It is similar
     * in purpose to the @see:itemFormatter property, but has the advantage
     * of allowing multiple independent handlers.
     */
    formatItem: Event;
    /**
     * Raises the @see:formatItem event.
     *
     * @param e @see:FormatItemEventArgs that contains the event data.
     */
    onFormatItem(e: FormatItemEventArgs): void;
    _setItemChecked(index: number, checked: boolean, notify?: boolean): void;
    private _cvCollectionChanged(sender, e);
    private _cvCurrentChanged(sender, e);
    private _populateList();
    private _click(e);
    private _keydown(e);
    private _keypress(e);
    private _getCheckbox(index);
    _populateSelectElement(hostElement: HTMLElement): void;
}
