import { Control } from '../../core/Control';
import { EventArgs } from "../../eventArgs/EventArgs";
import { Event } from "../../event/Event";
/**
 * The @see:InputNumber control allows users to enter numbers.
 *
 * The control prevents users from accidentally entering invalid data and
 * formats the number as it is edited.
 *
 * Pressing the minus key reverses the sign of the value being edited,
 * regardless of cursor position.
 *
 * You may use the @see:min and @see:max properties to limit the range of
 * acceptable values, and the @see:step property to provide spinner buttons
 * that increase or decrease the value with a click.
 *
 * Use the @see:value property to get or set the currently selected number.
 *
 * The example below creates several @see:InputNumber controls and shows
 * the effect of using different formats, ranges, and step values.
 *
 * @fiddle:Cf9L9
 */
export declare class InputNumber extends Control {
    _tbx: HTMLInputElement;
    _btnUp: HTMLElement;
    _btnDn: HTMLElement;
    _value: number;
    _min: number;
    _max: number;
    _format: string;
    _step: number;
    _showBtn: boolean;
    _required: boolean;
    _decChar: string;
    _oldText: string;
    _composing: boolean;
    /**
     * Gets or sets the template used to instantiate @see:InputNumber controls.
     */
    static controlTemplate: string;
    '</div>': any;
    /**
     * Initializes a new instance of an @see:InputNumber control.
     *
     * @param element The DOM element that hosts the control, or a selector for the host element (e.g. '#theCtrl').
     * @param options The JavaScript object containing initialization data for the control.
     */
    constructor(element: any, options?: any);
    /**
     * Gets the HTML input element hosted by the control.
     *
     * Use this property in situations where you want to customize the
     * attributes of the input element.
     */
    readonly inputElement: HTMLInputElement;
    /**
     * Gets or sets the "type" attribute of the HTML input element hosted by the control.
     *
     * By default, this property is set to "tel", a value that causes mobile devices to
     * show a numeric keypad that includes a negative sign and a decimal separator.
     *
     * Use this property to change the default setting if the default does not work well
     * for the current culture, device, or application. In those cases, try changing
     * the value to "number" or "text."
     *
     * Note that input elements with type "number" prevent selection in Chrome and therefore
     * is not recommended. For more details, see this link:
     * http://stackoverflow.com/questions/21177489/selectionstart-selectionend-on-input-type-number-no-longer-allowed-in-chrome
     */
    inputType: string;
    /**
     * Gets or sets the current value of the control.
     */
    value: number;
    /**
     * Gets or sets a value indicating whether the control value must be a number or whether it
     * can be set to null (by deleting the content of the control).
     */
    required: boolean;
    /**
     * Gets or sets the smallest number that the user can enter.
     */
    min: number;
    /**
     * Gets or sets the largest number that the user can enter.
     */
    max: number;
    /**
     * Gets or sets the amount to add or subtract to the @see:value property
     * when the user clicks the spinner buttons.
     */
    step: number;
    /**
     * Gets or sets the format used to display the number being edited (see @see:Globalize).
     *
     * The format string is expressed as a .NET-style
     * <a href="http://msdn.microsoft.com/en-us/library/dwhawy9k(v=vs.110).aspx" target="_blank">
     * standard numeric format string</a>.
     */
    format: string;
    /**
     * Gets or sets the text shown in the control.
     */
    text: string;
    /**
     * Gets or sets the string shown as a hint when the control is empty.
     */
    placeholder: string;
    /**
     * Gets or sets a value indicating whether the control displays spinner buttons to increment
     * or decrement the value (the step property must be set to a non-zero value).
     */
    showSpinner: boolean;
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
     * Occurs when the value of the @see:value property changes.
     */
    valueChanged: Event;
    /**
     * Raises the @see:valueChanged event.
     */
    onValueChanged(e?: EventArgs): void;
    onGotFocus(e: EventArgs): void;
    onLostFocus(e?: EventArgs): void;
    refresh(fullUpdate?: boolean): void;
    private _clamp(value);
    private _isNumeric(chr, digitsOnly?);
    private _getInputRange(digitsOnly?);
    private _moveToDigit();
    private _updateBtn();
    private _setText(text);
    private _keypress(e);
    private _keydown(e);
    private _input(e);
    private _clickSpinner(e);
    private _getSelStart();
}
