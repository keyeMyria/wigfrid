import { ICollectionView } from "../../interface/collections/ICollectionView";
import { EventArgs } from "../../eventArgs/EventArgs";
import { CancelEventArgs } from "../../eventArgs/CancelEventArgs";
import { ElementRef } from "@angular/core";
import { AfterViewInit } from "@angular/core";
import { Injector } from "@angular/core";
import { ListboxComponent } from "../ListBox/ListboxComponent";
import { EventEmitter } from "@angular/core";
import { ComboBoxHelper } from "./ComboBoxHelper";
/**
 * The @see:ComboBox control allows users to pick strings from lists.
 *
 * The control automatically completes entries as the user types, and allows users
 * to show a drop-down list with the items available.
 *
 * Use the @see:selectedIndex or the @see:text properties to determine which
 * item is currently selected.
 *
 * The @see:isEditable property determines whether users can enter values that
 * are not present in the list.
 *
 * The example below creates a @see:ComboBox control and populates it with a list
 * of countries. The @see:ComboBox searches for the country as the user types.
 * The <b>isEditable</b> property is set to false, so the user is forced to
 * select one of the items in the list.
 *
 * The example also shows how to create and populate a @see:ComboBox using
 * an HTML <b>&lt;select;&gt</b> element with <b>&lt;option;&gt</b> child
 * elements.
 *
 * @fiddle:8HnLx
 */
export declare class ComboBoxComponent implements AfterViewInit {
    private _elementRef;
    private injector;
    private _comboboxHelper;
    _tbxRef: ElementRef;
    _btnRef: ElementRef;
    ListBox: ListboxComponent;
    private _isDroppedDown;
    private _tbx;
    private _btn;
    private _dropDown;
    private _lbx;
    _required: boolean;
    _editable: boolean;
    _composing: boolean;
    _deleting: boolean;
    _settingText: boolean;
    _cvt: HTMLElement;
    _hdrPath: string;
    private _maxDropDownHeight;
    private _maxDropDownWidth;
    private _composing;
    private _itemsSource;
    private _templateRef;
    private disabled;
    private _autoExpand;
    private _showBtn;
    private _autoExpand;
    private _oldText;
    /**
     * Gets or sets the text shown on the control.
     */
    text: string;
    /**
     * Initializes a new instance of a @see:ComboBox control.
     *
     * @param _elementRef The DOM element that hosts the control, or a selector for the host element (e.g. '#theCtrl').
     *
     * @internal @param options The JavaScript object containing initialization data for the control.
     */
    constructor(_elementRef: ElementRef, injector: Injector, _comboboxHelper: ComboBoxHelper);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    /**
     * 在当前组件里没有下拉出来时, 滚轮可以控制选中项
     * @param e
     */
    private onMouseWheel(e);
    /**
     * Gets or sets a value that indicates whether the drop down is currently visible.
     */
    isDroppedDown: boolean;
    /**
     * Gets or sets the array or @see:ICollectionView object that contains the items to select from.
     */
    itemsSource: any;
    /**
     * Gets the @see:ICollectionView object used as the item source.
     */
    readonly collectionView: ICollectionView;
    /**
     * Gets or sets the name of a property to use for getting the value displayed in the
     * control's input element.
     *
     * The default value for this property is null, which causes the control to display
     * the same content in the input element as in the selected item of the drop-down list.
     *
     * Use this property if you want to de-couple the value shown in the input element
     * from the values shown in the drop-down list. For example, the input element could
     * show an item's name and the drop-down list could show additional detail.
     */
    headerPath: string;
    /**
     * Gets or sets the name of the property used to get the @see:selectedValue from the @see:selectedItem.
     */
    selectedValuePath: string;
    /**
     * Gets or sets a value indicating whether the drop-down list displays items as plain text or as HTML.
     */
    isContentHtml: boolean;
    /**
     * Gets or sets the index of the currently selected item in the drop-down list.
     */
    selectedIndex: number;
    /**
     * Gets or sets the item that is currently selected in the drop-down list.
     */
    selectedItem: any;
    /**
     * Gets or sets the value of the @see:selectedItem, obtained using the @see:selectedValuePath.
     */
    selectedValue: any;
    /**
     * Gets or sets whether the control value must be set to a non-null value
     * or whether it can be set to null (by deleting the content of the control).
     */
    required: boolean;
    /**
     * Gets or sets a value that enables or disables editing of the text
     * in the input element of the @see:ComboBox (defaults to false).
     */
    isEditable: boolean;
    /**
     * Gets or sets the maximum height of the drop-down list.
     */
    maxDropDownHeight: number;
    /**
     * Gets or sets the maximum width of the drop-down list.
     *
     * The width of the drop-down list is also limited by the width of
     * the control itself (that value represents the drop-down's minimum width).
     */
    maxDropDownWidth: number;
    /**
     * Gets the string displayed in the input element for the item at a
     * given index (always plain text).
     *
     * @param index The index of the item to retrieve the text for.
     */
    getDisplayText(index?: number): string;
    /**
     * Occurs when the value of the @see:selectedIndex property changes.
     */
    selectedIndexChanged: EventEmitter<{}>;
    /**
     * Raises the @see:selectedIndexChanged event.
     */
    onSelectedIndexChanged(e?: EventArgs): void;
    /**
     * Gets the index of the first item that matches a given string.
     *
     * @param text The text to search for.
     * @param fullMatch A value indicating whether to look for a full match or just the start of the string.
     * @return The index of the item, or -1 if not found.
     */
    indexOf(text: string, fullMatch: boolean): number;
    /**
     * Gets the @see:ListBox control shown in the drop-down.
     */
    readonly listBox: ListboxComponent;
    onLostFocus(e?: EventArgs): void;
    /**
     * Occurs before the drop down is shown or hidden.
     */
    isDroppedDownChanging: EventEmitter<{}>;
    onIsDroppedDownChanging(e: CancelEventArgs): boolean;
    /**
     * Occurs after the drop down is shown or hidden.
     */
    isDroppedDownChanged: EventEmitter<{}>;
    onIsDroppedDownChanged(e?: EventArgs): void;
    _updateBtn(): void;
    _createDropDown(): void;
    _setText(text: string, fullMatch: boolean): void;
    private _findNext(text, step);
    _handleInputClick(): void;
    _expandSelection(): void;
    _getCharType(text: string, pos: number): 1 | -1 | 0;
    _keydown(e: KeyboardEvent): void;
    private _setSelectionRange(start, end);
    private _getSelStart();
    _updateDropDown(): void;
    /**
     * 全选文本
     * Sets the focus to the control and selects all its content.
     */
    selectAll(): void;
}
