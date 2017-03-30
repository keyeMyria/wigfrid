import { DropDown } from './../DropDown/DropDown';
import { Calendar } from './../Calendar/Calendar';
import { _MaskProvider } from '../../core/mask';
import { EventArgs } from "../../eventArgs/EventArgs";
import { Event } from "../../event/Event";
/**
 * The @see:InputDate control allows users to type in dates using any format
 * supported by the @see:Globalize class, or to pick dates from a drop-down box
 * that shows a @see:Calendar control.
 *
 * Use the @see:min and @see:max properties to restrict the range of
 * values that the user can enter.
 *
 * Use the @see:value property to gets or set the currently selected date.
 *
 * The example below shows a <b>Date</b> value (that includes date and time information)
 * using an @see:InputDate and an an @see:InputTime control. Notice how both controls
 * are bound to the same controller variable, and each edits the appropriate information
 * (either date or time). The example also shows a @see:Calendar control that you can
 * use to select the date with a single click.
 *
 * @fiddle:vgc3Y
 */
export declare class InputDate extends DropDown {
    _calendar: Calendar;
    _value: Date;
    _min: Date;
    _max: Date;
    _format: string;
    _required: boolean;
    _maskProvider: _MaskProvider;
    /**
     * Initializes a new instance of an @see:InputDate control.
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
     * Gets or sets the current date.
     */
    value: Date;
    /**
     * Gets or sets the text shown on the control.
     */
    text: string;
    /**
     * Gets or sets a value indicating whether the control value must be a Date or whether it
     * can be set to null (by deleting the content of the control).
     */
    required: boolean;
    /**
     * Gets or sets the earliest date that the user can enter.
     */
    min: Date;
    /**
     * Gets or sets the latest date that the user can enter.
     */
    max: Date;
    /**
     * Gets or sets the format used to display the selected date.
     *
     * The format string is expressed as a .NET-style
     * <a href="http://msdn.microsoft.com/en-us/library/8kb3ddd4(v=vs.110).aspx" target="_blank">
     * Date format string</a>.
     */
    format: string;
    /**
     * Gets or sets a mask to use while editing.
     *
     * The mask format is the same one that the @see:wijmo.input.InputMask
     * control uses.
     *
     * If specified, the mask must be compatible with the value of
     * the @see:format property. For example, the mask '99/99/9999' can
     * be used for entering dates formatted as 'MM/dd/yyyy'.
     */
    mask: string;
    /**
     * Gets a reference to the @see:Calendar control shown in the drop-down box.
     */
    readonly calendar: Calendar;
    /**
     * Gets or sets a validator function to determine whether dates are valid for selection.
     *
     * If specified, the validator function should take one parameter representing the
     * date to be tested, and should return false if the date is invalid and should not
     * be selectable.
     *
     * For example, the code below prevents users from selecting dates that fall on
     * weekends:
     * <pre>
     * inputDate.itemValidator = function(date) {
         *   var weekday = date.getDay();
         *   return weekday != 0 && weekday != 6;
         * }
     * </pre>
     */
    itemValidator: Function;
    /**
     * Gets or sets a formatter function to customize dates in the drop-down calendar.
     *
     * The formatter function can add any content to any date. It allows
     * complete customization of the appearance and behavior of the calendar.
     *
     * If specified, the function takes two parameters:
     * <ul>
     *     <li>the date being formatted </li>
     *     <li>the HTML element that represents the date</li>
     * </ul>
     *
     * For example, the code below shows weekends with a yellow background:
     * <pre>
     * inputDate.itemFormatter = function(date, element) {
         *   var day = date.getDay();
         *   element.style.backgroundColor = day == 0 || day == 6 ? 'yellow' : '';
         * }
     * </pre>
     */
    itemFormatter: Function;
    /**
     * Occurs after a new date is selected.
     */
    valueChanged: Event;
    /**
     * Raises the @see:valueChanged event.
     */
    onValueChanged(e?: EventArgs): void;
    refresh(): void;
    onIsDroppedDownChanged(e?: EventArgs): void;
    _createDropDown(): void;
    _updateDropDown(): void;
    _keydown(e: KeyboardEvent): void;
    _clamp(value: Date): Date;
    _commitText(): void;
    private _setDate(value, time);
    private _isValidDate(value);
}
