import { Control } from '../../core/Control';
import { CancelEventArgs } from "../../eventArgs/CancelEventArgs";
import { EventArgs } from "../../eventArgs/EventArgs";
import { Event } from "../../event/Event";
/**
 * DropDown control (abstract).
 *
 * Contains an input element and a button used to show or hide the drop-down.
 *
 * Derived classes must override the _createDropDown method to create whatever
 * editor they want to show in the drop down area (a list of items, a calendar,
 * a color editor, etc).
 */
export declare class DropDown extends Control {
    _tbx: HTMLInputElement;
    _elRef: HTMLElement;
    _btn: HTMLElement;
    _dropDown: HTMLElement;
    _showBtn: boolean;
    _autoExpand: boolean;
    _oldText: string;
    /**
     * Gets or sets the template used to instantiate @see:DropDown controls.
     */
    static controlTemplate: string;
    /**
     * Initializes a new instance of a @see:DropDown control.
     *
     * @param element The DOM element that hosts the control, or a selector for the host element (e.g. '#theCtrl').
     * @param options The JavaScript object containing initialization data for the control.
     */
    constructor(element: any, options?: any);
    /**
     * Gets or sets the text shown on the control.
     */
    text: string;
    /**
     * Gets the HTML input element hosted by the control.
     *
     * Use this property in situations where you want to customize the
     * attributes of the input element.
     */
    readonly inputElement: HTMLInputElement;
    /**
     * Gets or sets the string shown as a hint when the control is empty.
     */
    placeholder: string;
    /**
     * Gets or sets a value that indicates whether the drop down is currently visible.
     */
    isDroppedDown: boolean;
    /**
     * Gets the drop down element shown when the @see:isDroppedDown
     * property is set to true.
     */
    readonly dropDown: HTMLElement;
    /**
     * Gets or sets a value that indicates whether the control should display a drop-down button.
     */
    showDropDownButton: boolean;
    /**
     * Gets or sets a value that indicates whether the control should automatically expand the
     * selection to whole words/numbers when the control is clicked.
     */
    autoExpandSelection: boolean;
    /**
     * Sets the focus to the control and selects all its content.
     */
    selectAll(): void;
    /**
     * Occurs when the value of the @see:text property changes.
     */
    textChanged: Event;
    /**
     * Raises the @see:textChanged event.
     */
    onTextChanged(e?: EventArgs): void;
    /**
     * Occurs before the drop down is shown or hidden.
     */
    isDroppedDownChanging: Event;
    /**
     * Raises the @see:isDroppedDownChanging event.
     */
    onIsDroppedDownChanging(e: CancelEventArgs): boolean;
    /**
     * Occurs after the drop down is shown or hidden.
     */
    isDroppedDownChanged: Event;
    /**
     * Raises the @see:isDroppedDownChanged event.
     */
    onIsDroppedDownChanged(e?: EventArgs): void;
    onGotFocus(e?: EventArgs): void;
    onLostFocus(e?: EventArgs): void;
    containsFocus(): boolean;
    dispose(): void;
    refresh(fullUpdate?: boolean): void;
    _handleResize(): void;
    _expandSelection(): void;
    _getCharType(text: string, pos: number): 1 | -1 | 0;
    _keydown(e: KeyboardEvent): void;
    _btnclick(e: MouseEvent): void;
    _setText(text: string, fullMatch: boolean): void;
    _updateBtn(): void;
    _createDropDown(): void;
    _commitText(): void;
    _updateDropDown(): void;
}
