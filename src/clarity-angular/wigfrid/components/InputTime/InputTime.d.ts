import { ComboBox } from '../ComboBox/ComboBox';
import { _MaskProvider } from '../../core/mask';
import { EventArgs } from "../../eventArgs/EventArgs";
import { Event } from "../../event/Event";
/**
 * The @see:InputTime control allows users to enter times using any format
 * supported by the @see:Globalize class, or to pick times from a drop-down
 * list.
 *
 * The @see:min, @see:max, and @see:step properties determine the values shown
 * in the list.
 *
 * The @see:value property gets or sets a Date object that represents the time
 * selected by the user.
 *
 * The example below shows a <b>Date</b> value (that includes date and time information)
 * using an @see:InputDate and an @see:InputTime control. Notice how both controls
 * are bound to the same controller variable, and each edits the appropriate information
 * (either date or time). The example also shows a @see:Calendar control that can be
 * used to select the date with a single click.
 *
 * @fiddle:vgc3Y
 */
export declare class InputTime extends ComboBox {
    _value: Date;
    _min: Date;
    _max: Date;
    _step: number;
    _format: string;
    _maskProvider: _MaskProvider;
    /**
     * Initializes a new instance of an @see:InputTime control.
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
     * Gets or sets the current input time.
     */
    value: Date;
    /**
     * Gets or sets the text shown in the control.
     */
    text: string;
    /**
     * Gets or sets the earliest time that the user can enter.
     */
    min: Date;
    /**
     * Gets or sets the latest time that the user can enter.
     */
    max: Date;
    /**
     * Gets or sets the number of minutes between entries in the drop-down list.
     *
     * The default value for this property is 15 minutes.
     * Setting it to null, zero, or any negative value disables the drop-down.
     */
    step: number;
    /**
     * Gets or sets the format used to display the selected time (see @see:Globalize).
     *
     * The format string is expressed as a .NET-style
     * <a href="http://msdn.microsoft.com/en-us/library/8kb3ddd4(v=vs.110).aspx" target="_blank">
     * time format string</a>.
     */
    format: string;
    /**
     * Gets or sets a mask to use while the user is editing.
     *
     * The mask format is the same used by the @see:wijmo.input.InputMask
     * control.
     *
     * If specified, the mask must be compatible with the value of
     * the @see:format property. For example, you can use the mask '99:99 >LL'
     * for entering short times (format 't').
     */
    mask: string;
    /**
     * Occurs after a new time is selected.
     */
    valueChanged: Event;
    /**
     * Raises the @see:valueChanged event.
     */
    onValueChanged(e?: EventArgs): void;
    refresh(): void;
    onSelectedIndexChanged(e?: EventArgs): void;
    _updateItems(): void;
    _keydown(e: KeyboardEvent): void;
    _commitText(): void;
    private _getTime(value);
}
