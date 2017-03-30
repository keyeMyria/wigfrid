import { ElementRef } from "@angular/core";
import { EventEmitter } from "@angular/core";
import { EventArgs } from "../../eventArgs/EventArgs";
import { ICollectionView } from "../../interface/collections/ICollectionView";
import { TemplateRef } from "@angular/core";
/**
 * angular ahri ListBox
 *
 * can use ListBoxTemplate or set a template in content
 */
export declare class ListboxComponent {
    private _elementRef;
    itemsChanged: EventEmitter<{}>;
    itemChecked: EventEmitter<{}>;
    _items: any;
    _cv: ICollectionView;
    _pathDisplay: string;
    _pathValue: string;
    _pathChecked: string;
    _html: boolean;
    _checking: boolean;
    _search: string;
    _toSearch: number;
    private _templateRef;
    private _notContentTemplate;
    private _contentTemplateRef;
    listBoxTemplate: TemplateRef;
    /**
     * Initializes a new instance of a @see:ListBox.
     *
     * @param _elementRef The DOM element that hosts the control, or a selector for the host element (e.g. '#theCtrl').
     * @param _templateRef
     *
     * @internal @param options The JavaScript object containing initialization data for the control.
     */
    constructor(_elementRef: ElementRef);
    onMouseWheel(e: WheelEvent): void;
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
    selectedIndexChanged: EventEmitter<{}>;
    /**
     * Raises the @see:selectedIndexChanged event.
     */
    onSelectedIndexChanged(e?: EventArgs): void;
    /**
     * Occurs when the list of items changes.
     */
    itemsChanged: EventEmitter<{}>;
    /**
     * Raises the @see:itemsChanged event.
     */
    onItemsChanged(e?: EventArgs): void;
    /**
     * Occurs before the list items are generated.
     */
    loadingItems: EventEmitter<{}>;
    /**
     * Raises the @see:loadingItems event.
     */
    onLoadingItems(e?: EventArgs): void;
    /**
     * Occurs after the list items are generated.
     */
    loadedItems: EventEmitter<{}>;
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
    itemChecked: EventEmitter<{}>;
    /**
     * Raises the @see:itemCheched event.
     */
    onItemChecked(e?: EventArgs): void;
    /**
     * Occurs when the value of the @see:checkedItems property changes.
     */
    checkedItemsChanged: EventEmitter<{}>;
    /**
     * Raises the @see:checkedItemsChanged event.
     */
    onCheckedItemsChanged(e?: EventArgs): void;
    _setItemChecked(index: number, checked: boolean, notify?: boolean): void;
    private _cvCollectionChanged(sender, e);
    private _cvCurrentChanged(sender, e);
    private _click(e);
    private _keydown(e);
    private _keypress(e);
    private _getCheckbox(index);
}
