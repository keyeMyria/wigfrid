
import {Color} from '../../common/ui/Color'
import {DropDown} from './../DropDown/DropDown'
import {Calendar} from './../Calendar/Calendar'
import {_MaskProvider} from '../../core/mask'
import {Globalize} from '../../globalization/Globalize'
import {DateTime} from "../../common/datetime/DateTime";
import {clamp} from "../../util/math/clamp";
import {asString} from "../../util/asserts/asString";
import {asDate} from "../../util/asserts/asDate";
import {asBoolean} from "../../util/asserts/asBoolean";
import {asFunction} from "../../util/asserts/asFunction";
import {EventArgs} from "../../eventArgs/EventArgs";
import {Key} from "../../enum/Key";
import {Event} from "../../event/Event";


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
export class InputDate extends DropDown {

	// child control
	_calendar: Calendar;

	// property storage
	_value = new Date();
	_min: Date;
	_max: Date;
	_format = 'd';
	_required = true;
	_maskProvider: _MaskProvider;

	// private stuff

	/**
	 * Initializes a new instance of an @see:InputDate control.
	 *
	 * @param element The DOM element that hosts the control, or a selector for the host element (e.g. '#theCtrl').
	 * @param options The JavaScript object containing initialization data for the control.
	 */
	constructor(element: any, options?) {
		super(element);

		// initialize mask provider
		this._maskProvider = new _MaskProvider(this._tbx);

		// default to numeric keyboard (like NumberInput)
		this._tbx.type = 'tel';

		// use wheel to increase/decrease the date
		const evt = 'onmousewheel' in document ? 'mousewheel' : 'DOMMouseScroll';
		this.addEventListener(this.hostElement, evt, (e: MouseWheelEvent) => {
			if (this.containsFocus() && !this.isDroppedDown && !e.defaultPrevented) {
				if (this.value != null) {
					const step = clamp(e.wheelDelta || -e.detail, -1, +1);
					this.value = DateTime.addDays(this.value, step);
					this.selectAll();
					e.preventDefault();
				}
			}
		});

		// initializing from <input> tag
		if (this._orgTag == 'INPUT') {
			this._copyOriginalAttributes(this._tbx);
			const value = this._tbx.getAttribute('value');
			if (value) {
				this.value = Globalize.parseDate(value, 'yyyy-MM-dd');
			}
		}

		// initialize control options
		this.initialize(options);
	}

	//--------------------------------------------------------------------------
	//#region ** object model

	/**
	 * Gets the HTML input element hosted by the control.
	 *
	 * Use this property in situations where you want to customize the
	 * attributes of the input element.
	 */
	get inputElement(): HTMLInputElement {
		return this._tbx;
	}
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
	get inputType(): string {
		return this._tbx.type;
	}
	set inputType(value: string) {
		this._tbx.type = asString(value);
	}
	/**
	 * Gets or sets the current date.
	 */
	get value(): Date {
		return this._value;
	}
	set value(value: Date) {
		if (DateTime.equals(this._value, value)) {
			this._tbx.value = Globalize.format(value, this.format);
		} else {

			// check type
			value = asDate(value, !this.required || (value == null && this._value == null));

			// honor min/max range
			value = this._clamp(value);

			// update control
			if (this._isValidDate(value)) {
				this._tbx.value = value ? Globalize.format(value, this.format) : '';
				if (!DateTime.equals(this._value, value)) {
					this._value = value;
					this.onValueChanged();
				}
			} else {
				this._tbx.value = value ? Globalize.format(this.value, this.format) : '';
			}
		}
	}
	/**
	 * Gets or sets the text shown on the control.
	 */
	get text(): string {
		return this._tbx.value;
	}
	set text(value: string) {
		if (value != this.text) {
			this._setText(value, true);
			this._commitText();
		}
	}
	/**
	 * Gets or sets a value indicating whether the control value must be a Date or whether it
	 * can be set to null (by deleting the content of the control).
	 */
	get required(): boolean {
		return this._required;
	}
	set required(value: boolean) {
		this._required = asBoolean(value);
	}
	/**
	 * Gets or sets the earliest date that the user can enter.
	 */
	get min(): Date {
		return this._min;
	}
	set min(value: Date) {
		this._min = asDate(value, true);
	}
	/**
	 * Gets or sets the latest date that the user can enter.
	 */
	get max(): Date {
		return this._max;
	}
	set max(value: Date) {
		this._max = asDate(value, true);
	}
	/**
	 * Gets or sets the format used to display the selected date.
	 *
	 * The format string is expressed as a .NET-style
	 * <a href="http://msdn.microsoft.com/en-us/library/8kb3ddd4(v=vs.110).aspx" target="_blank">
	 * Date format string</a>.
	 */
	get format(): string {
		return this._format;
	}
	set format(value: string) {
		if (value != this.format) {
			this._format = asString(value);
			this._tbx.value = Globalize.format(this.value, this.format);
		}
	}
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
	get mask(): string {
		return this._maskProvider.mask;
	}
	set mask(value: string) {
		this._maskProvider.mask = asString(value);
	}
	/**
	 * Gets a reference to the @see:Calendar control shown in the drop-down box.
	 */
	get calendar() : Calendar {
		return this._calendar;
	}
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
	get itemValidator(): Function {
		return this._calendar.itemValidator;
	}
	set itemValidator(value: Function) {
		if (value != this.itemValidator) {
			this._calendar.itemValidator = asFunction(value);
			this.invalidate();
		}
	}
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
	get itemFormatter(): Function {
		return this.calendar.itemFormatter;
	}
	set itemFormatter(value: Function) {
		if (value != this.itemFormatter) {
			this.calendar.itemFormatter = asFunction(value);
		}
	}
	/**
	 * Occurs after a new date is selected.
	 */
	valueChanged = new Event();
	/**
	 * Raises the @see:valueChanged event.
	 */
	onValueChanged(e?: EventArgs) {
		this.valueChanged.raise(this, e);
	}

	//#endregion ** object model

	//--------------------------------------------------------------------------
	//#region ** overrides

	// update value display in case culture changed
	refresh() {
		this.isDroppedDown = false;
		if (this._maskProvider) {
			this._maskProvider.refresh();
		}
		if (this._calendar) {
			this._calendar.refresh();
		}
		this._tbx.value = Globalize.format(this.value, this.format);
	}

	// override to send focus to drop-down when dropping down
	onIsDroppedDownChanged(e?: EventArgs) {
		super.onIsDroppedDownChanged(e);
		if (this.isDroppedDown) {
			this.dropDown.focus();
		}
	}

	// create the drop-down element
	_createDropDown() {

		// create the drop-down element
		this._calendar = new Calendar(this._dropDown);
		this._dropDown.tabIndex = -1;

		// update our value to match calendar's
		this._calendar.valueChanged.addHandler(() => {
			this.value = DateTime.fromDateTime(this._calendar.value, this.value);
		});

		// close the drop-down when the user changes the date with the mouse
		const dtDown = this.value;
		this.addEventListener(this._dropDown, 'mousedown', () => {
			dtDown = this.value;
		});

		// the 'click' event may not be triggered on iOS Safari if focus change
		// happens during previous tap, so use 'mouseup' instead.
		//this.addEventListener(this._dropDown, 'click', () => {
		this.addEventListener(this._dropDown, 'mouseup', () => {
			const value = this._calendar.value;
			if (value && !DateTime.sameDate(dtDown, value)) {
				this.isDroppedDown = false;
			}
		});
	}

	// update drop down content and position before showing it
	_updateDropDown() {

		// update value
		this._commitText();

		// update selected date, range
		this._calendar.value = this.value;
		this._calendar.min = this.min;
		this._calendar.max = this.max;

		// update size
		const cs = getComputedStyle(this.hostElement);
		this._dropDown.style.minWidth = parseFloat(cs.fontSize) * 18 + 'px';
		this._calendar.refresh(); // update layout/size now

		// let base class update position
		super._updateDropDown();
	}

	// override to commit text on Enter and cancel on Escape
	_keydown(e: KeyboardEvent) {
		if (!e.defaultPrevented) {
			switch (e.keyCode) {
				case Key.Enter:
					this._commitText();
					this.selectAll();
					break;
				case Key.Escape:
					this.text = Globalize.format(this.value, this.format);
					this.selectAll();
					break;
			}
		}
		super._keydown(e);
	}

	//#endregion ** overrides

	//--------------------------------------------------------------------------
	//#region ** implementation

	// honor min/max range (keeping the time)
	_clamp(value: Date): Date {
		if (value) {
			if (this.min) {
				const min = DateTime.fromDateTime(this.min, value);
				if (value < min) {
					value = min;
				}
			}
			if (this.max) {
				const max = DateTime.fromDateTime(this.max, value);
				if (value > max) {
					value = max;
				}
			}
		}
		return value;
	}

	// parse date, commit date part (no time) if successful or revert
	_commitText() {
		let txt = this._tbx.value;
		if (!txt && !this.required) {
			this.value = null;
		} else {
			const dt = Globalize.parseDate(txt, this.format);
			if (dt) {
				this.value = DateTime.fromDateTime(dt, this.value);
			} else {
				this._tbx.value = Globalize.format(this.value, this.format);
			}
		}
	}

	// merge date and time information from two Date objects into a new Date object
	private _setDate(value: Date, time: Date): Date {
		return new Date(
			value.getFullYear(), value.getMonth(), value.getDate(),
			time.getHours(), time.getMinutes(), time.getSeconds());
	}

	// check whether a date should be selectable by the user
	private _isValidDate(value: Date) : boolean {
		return this.itemValidator && value
			? this.itemValidator(value)
			: true;
	}

	//#endregion ** implementation
}
