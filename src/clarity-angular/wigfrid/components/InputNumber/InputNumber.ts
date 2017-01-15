
import {Color} from '../../common/ui/Color'
import {Control} from '../../core/Control'
import {Globalize} from '../../globalization/Globalize'
import {setSelectionRange} from "../../common/Global";
import {clamp} from "../../util/math/clamp";
import {asString} from "../../util/asserts/asString";
import {asNumber} from "../../util/asserts/asNumber";
import {asBoolean} from "../../util/asserts/asBoolean";
import {EventArgs} from "../../eventArgs/EventArgs";
import {addClass} from "../../util/dom/addClass";
import {removeClass} from "../../util/dom/removeClass";
import {Key} from "../../enum/Key";
import {contains} from "../../util/dom/contains";
import {Event} from "../../event/Event";


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
export class InputNumber extends Control {

	// child elements
	_tbx: HTMLInputElement;
	_btnUp: HTMLElement;
	_btnDn: HTMLElement;

	// property storage
	_value: number;
	_min: number;
	_max: number;
	_format: string;
	_step: number;
	_showBtn = true;
	_required = true;
	_decChar = '.';

	// private stuff
	_oldText: string;
	_composing: boolean;

	/**
	 * Gets or sets the template used to instantiate @see:InputNumber controls.
	 */
	static controlTemplate = '<div class="wj-input">' +
		'<div class="wj-input-group">' +
		'<span wj-part="btn-dec" class="wj-input-group-btn" tabindex="-1">' +
		'<button class="wj-btn wj-btn-default" type="button" tabindex="-1">-</button>' +
		'</span>' +
		'<input type="tel" wj-part="input" class="wj-form-control wj-numeric"/>' +
		'<span wj-part="btn-inc" class="wj-input-group-btn" tabindex="-1">' +
		'<button class="wj-btn wj-btn-default" type="button" tabindex="-1">+</button>' +
		'</span>' +
		'</div>';
	'</div>';

	/**
	 * Initializes a new instance of an @see:InputNumber control.
	 *
	 * @param element The DOM element that hosts the control, or a selector for the host element (e.g. '#theCtrl').
	 * @param options The JavaScript object containing initialization data for the control.
	 */
	constructor(element: any, options?) {
		super(element);

		// instantiate and apply template
		const tpl = this.getTemplate();
		this.applyTemplate('wj-control wj-inputnumber wj-content', tpl, {
			_tbx: 'input',
			_btnUp: 'btn-inc',
			_btnDn: 'btn-dec'
		}, 'input');

		// initializing from <input> tag
		if (this._orgTag == 'INPUT') {
			this._copyOriginalAttributes(this._tbx);
			const value = this._tbx.getAttribute('value');
			if (value) {
				this.value = Globalize.parseFloat(value);
			}
		}

		// disable autocomplete/spellcheck (important for mobile browsers including Chrome/Android)
		const tb = this._tbx;
		tb.autocomplete = 'off';
		tb.spellcheck = false;

		// get localized decimal symbol
		this._decChar = Globalize.getNumberDecimalSeparator();

		// update button display
		this._updateBtn();

		// handle IME
		this.addEventListener(this._tbx, 'compositionstart', () => {
			this._composing = true;
		});
		this.addEventListener(this._tbx, 'compositionend', () => {
			this._composing = false;
			this._setText(this.text);
		});

		// textbox events
		this.addEventListener(tb, 'keypress', this._keypress.bind(this));
		this.addEventListener(tb, 'keydown', this._keydown.bind(this));
		this.addEventListener(tb, 'input', this._input.bind(this));

		// inc/dec buttons: change value
		// if this was a tap, keep focus on button; OW transfer to textbox
		this.addEventListener(this._btnUp, 'click', this._clickSpinner.bind(this));
		this.addEventListener(this._btnDn, 'click', this._clickSpinner.bind(this));

		// use wheel to increase/decrease the value
		const evt = 'onmousewheel' in document ? 'mousewheel' : 'DOMMouseScroll';
		this.addEventListener(this.hostElement, evt, (e: MouseWheelEvent) => {
			if (this.containsFocus() && !e.defaultPrevented) {
				if (this.value != null) {
					const step = clamp(e.wheelDelta || -e.detail, -1, +1);
					this.value += (this.step || 1) * step;
					setTimeout(() => this.selectAll());
					e.preventDefault();
				}
			}
		});

		// initialize value
		this.value = 0;

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
	 * Gets or sets the current value of the control.
	 */
	get value(): number {
		return this._value;
	}
	set value(value: number) {
		if (value != this._value) {
			value = asNumber(value, !this.required || (value == null && this._value == null));
			if (value == null) {
				this._setText('');
			} else if (!isNaN(value)) {
				value = this._clamp(value);
				const text = Globalize.format(value, this.format, false, true);
				this._setText(text);
			}
		}
	}
	/**
	 * Gets or sets a value indicating whether the control value must be a number or whether it
	 * can be set to null (by deleting the content of the control).
	 */
	get required(): boolean {
		return this._required;
	}
	set required(value: boolean) {
		this._required = asBoolean(value);
	}
	/**
	 * Gets or sets the smallest number that the user can enter.
	 */
	get min(): number {
		return this._min;
	}
	set min(value: number) {
		this._min = asNumber(value, true);
	}
	/**
	 * Gets or sets the largest number that the user can enter.
	 */
	get max(): number {
		return this._max;
	}
	set max(value: number) {
		this._max = asNumber(value, true);
	}
	/**
	 * Gets or sets the amount to add or subtract to the @see:value property
	 * when the user clicks the spinner buttons.
	 */
	get step(): number {
		return this._step;
	}
	set step(value: number) {
		this._step = asNumber(value, true);
		this._updateBtn();
	}
	/**
	 * Gets or sets the format used to display the number being edited (see @see:Globalize).
	 *
	 * The format string is expressed as a .NET-style
	 * <a href="http://msdn.microsoft.com/en-us/library/dwhawy9k(v=vs.110).aspx" target="_blank">
	 * standard numeric format string</a>.
	 */
	get format(): string {
		return this._format;
	}
	set format(value: string) {
		if (value != this.format) {
			this._format = asString(value);
			this.refresh();
		}
	}
	/**
	 * Gets or sets the text shown in the control.
	 */
	get text(): string {
		return this._tbx.value;
	}
	set text(value: string) {
		if (value != this.text) {
			this._oldText = null;
			this._setText(value);
		}
	}
	/**
	 * Gets or sets the string shown as a hint when the control is empty.
	 */
	get placeholder(): string {
		return this._tbx.placeholder;
	}
	set placeholder(value: string) {
		this._tbx.placeholder = value;
	}
	/**
	 * Gets or sets a value indicating whether the control displays spinner buttons to increment
	 * or decrement the value (the step property must be set to a non-zero value).
	 */
	get showSpinner(): boolean {
		return this._showBtn;
	}
	set showSpinner(value: boolean) {
		this._showBtn = asBoolean(value);
		this._updateBtn();
	}
	/**
	 * Sets the focus to the control and selects all its content.
	 */
	selectAll() {
		setSelectionRange(this._tbx, 0, this._tbx.value.length);
	}
	/**
	 * Occurs when the value of the @see:text property changes.
	 */
	textChanged = new Event();
	/**
	 * Raises the @see:textChanged event.
	 */
	onTextChanged(e?: EventArgs) {
		this.textChanged.raise(this, e);
	}
	/**
	 * Occurs when the value of the @see:value property changes.
	 */
	valueChanged = new Event();
	/**
	 * Raises the @see:valueChanged event.
	 */
	onValueChanged(e?: EventArgs) {
		this.valueChanged.raise(this, e);
	}

	//#endregion

	//--------------------------------------------------------------------------
	//#region ** overrides

	// give focus to textbox unless touching
	onGotFocus(e: EventArgs) {
		if (!this.isTouching) {
			this._tbx.focus();
			this.selectAll();
		}
		super.onGotFocus(e);
	}

	// commit text when losing focus
	onLostFocus(e?: EventArgs) {
		const text = Globalize.format(this.value, this.format);
		this._setText(text);
		super.onLostFocus(e);
	}

	// update Globalization when refreshing
	refresh(fullUpdate?: boolean) {
		this._decChar = Globalize.getNumberDecimalSeparator();
		this._setText(Globalize.format(this.value, this.format, false, true));
	}

	//#endregion

	//--------------------------------------------------------------------------
	//#region ** implementation

	// make sure a value is > min and < max
	private _clamp(value: number): number {
		return clamp(value, this.min, this.max);
	}

	// checks whether a character is a digit, sign, or decimal point
	private _isNumeric(chr: string, digitsOnly = false) {
		let isNum = (chr == this._decChar) || (chr >= '0' && chr <= '9');
		if (!isNum && !digitsOnly) {
			isNum = '+-()'.indexOf(chr) > -1;
		}
		return isNum;
	}

	// get the range of numeric characters within the current text
	private _getInputRange(digitsOnly = false): number[] {
		const rng    = [0, 0],
              text = this.text;
        let hasStart = false;
		for (let i = 0; i < text.length; i++) {
			if (this._isNumeric(text[i], digitsOnly)) {
				if (!hasStart) {
					rng[0] = i;
					hasStart = true;
				}
				rng[1] = i + 1;
			}
		}
		return rng;
	}

	// move the cursor to the left of the first digit
	private _moveToDigit() {
		const rng = this._getInputRange(true);
		setSelectionRange(this._tbx, rng[0], rng[1]);
	}

	// update button visibility
	private _updateBtn() {
		if (this._showBtn && this._step) {
			// show buttons and add class
			this._btnUp.style.display = this._btnDn.style.display = '';
			addClass(this.hostElement, 'wj-input-show-spinner');
		} else {
			// hide buttons and remove class
			this._btnUp.style.display = this._btnDn.style.display = 'none';
			removeClass(this.hostElement, 'wj-input-show-spinner');
		}
	}

	// update text in textbox
	private _setText(text: string) {

		// not while composing IME text...
		if (this._composing) return;

		// handle nulls
		if (!text) {

			// if not required, allow setting to null
			if (!this._required) {
				this._tbx.value = '';
				if (this._value != null) {
					this._value = null;
					this.onValueChanged();
				}
				if (this._oldText) {
					this._oldText = text;
					this.onTextChanged();
				}
				return;
			}

			// required, change text to zero
			text = '0';
		}

		// let user start typing negative numbers
		if (text == '-' || text == '(') {
			this._tbx.value = text;
			setSelectionRange(this._tbx, 1);
			return;
		}

		// handle case when user deletes the opening parenthesis...
		if (text.length > 1 && text[text.length - 1] == ')' && text[0] != '(') {
			text = text.substr(0, text.length - 1);
		}

		// parse input
		let value = Globalize.parseFloat(text, this.format);
		if (isNaN(value)) {
			this._tbx.value = this._oldText;
			return;
		}

		// handle percentages
		if (this._oldText && this._oldText.indexOf('%') > -1 && text.indexOf('%') < 0) {
			value /= 100;
		}

		// get formatted value (allow trailing decimals if no format was specified)
		let fval = Globalize.format(value, this.format, false, true);
		if (!this.format || this.format == 'n' || this.format[0].toLowerCase() == 'g') {
			if (text == fval + this._decChar) {
				fval = text;
			}
		}

		// update text with formatted value
		if (this._tbx.value != fval) {
			this._tbx.value = fval;
			value = Globalize.parseFloat(fval, this.format); // TFS 139400
		}

		// update value, raise valueChanged
		value = this._clamp(value);
		if (value != this._value) {
			this._value = value;
			this.onValueChanged();
		}

		// raise textChanged
		text = this._tbx.value;
		if (text != this._oldText) {
			this.onTextChanged();
			this._oldText = text;
		}
	}

	// handle the keypress events
	private _keypress(e: KeyboardEvent) {

		// honor defaultPrevented
		if (e.defaultPrevented) return;

		// not while composing IME text...
		if (this._composing) return;

		if (e.charCode) {

			// prevent invalid chars/validate cursor position (TFS 80733)
			const chr = String.fromCharCode(e.charCode);
			if (!this._isNumeric(chr)) {
				e.preventDefault();
			} else {
				const rng = this._getInputRange(true);
				if (this._tbx.selectionStart < rng[0]) {
					setSelectionRange(this._tbx, rng[0], rng[1]);
				}
			}

			// handle special characters
			switch (chr) {
				case '-': // flip sign
					if (this.value) {
						this.value *= -1;
						this._moveToDigit();
					} else {
						this._setText('-');
					}
					e.preventDefault();
					break;
				case '+': // make positive
					this.value = Math.abs(this.value);
					this._moveToDigit();
					e.preventDefault();
					break;
				case this._decChar: // prevent more than one decimal point
                    let dec = this._tbx.value.indexOf(chr);
					if (dec > -1) {
						if (this._getSelStart() <= dec) {
							dec++;
						}
						setSelectionRange(this._tbx, dec);
						e.preventDefault();
					}
					break;
			}
		}
	}

	// handle the keydown event
	private _keydown(e: KeyboardEvent) {

		// honor defaultPrevented
		if (e.defaultPrevented) return;

		// not while composing IME text...
		if (this._composing) return;

		switch (e.keyCode) {

			// apply increment when user presses up/down
			case Key.Up:
			case Key.Down:
				if (this.step) {
					this.value = this._clamp(this.value + this.step * (e.keyCode == Key.Up ? +1 : -1));
					setTimeout(() => { // use timeouts for selection changes in this event handler!
						this.selectAll();
					});
					e.preventDefault();
				}
				break;

			// skip over decimal point when pressing backspace (TFS 80472)
			case Key.Back:
				if (this._tbx && this._tbx.selectionStart == this._tbx.selectionEnd) {
					var sel = this._tbx.selectionStart;
					if (sel > 0 && this.text[sel - 1] == this._decChar) {
						setTimeout(() => { // TFS 135585 (use timeouts for selection changes in this event handler!)
							setSelectionRange(this._tbx, sel - 1);
						});
						e.preventDefault();
					}
				}
				break;

			// skip over decimal point when pressing delete (TFS 80472)
			case Key.Delete:
				if (this._tbx && this._tbx.selectionStart == this._tbx.selectionEnd) {
					var sel = this._tbx.selectionStart;
					if (sel > 0 && this.text[sel] == this._decChar) {
						setTimeout(() => { // use timeouts for selection changes in this event handler!
							setSelectionRange(this._tbx, sel + 1);
						});
						e.preventDefault();
					}
				}
				break;
		}
	}

	// handle user input
	private _input(e) {

		// not while composing IME text...
		if (this._composing) return;

		// this timeOut is **important** for Windows Phone/Android/Safari
		setTimeout(() => {

			// remember cursor position
			const tbx = this._tbx;
            let text  = tbx.value,
                  sel = this._getSelStart();
            const dec = text ? text.indexOf(this._decChar) : -1;

			// set the text
			this._setText(text);

			// update cursor position if we have the focus (TFS 136134)
			if (this.containsFocus()) {

				// get updated values
				const newText = tbx.value,
                      newDec  = newText.indexOf(this._decChar);

				// handle cases where user types "-*" and the control switches to parenthesized values
				if (text && text[0] == '-' && newText && newText[0] != '-') {
					text = null;
				}

				// try to keep cursor offset from the right (TFS 136392)
				if (text) {
					if (sel <= dec || (dec < 0 && newDec < 0)) { // cursor was on the left of the decimal
						sel += newText.length - text.length;
					} else if (sel == text.length && dec < 0 && newDec > -1) { // there was no decimal, but now there is
						sel = newDec;
					}
				} else { // position at decimal or at last digit
					sel = newDec > -1 ? newDec : (<any>newText.match(/[^\d]*$/)).index;
				}

				// make sure it's within the valid range
				const rng = this._getInputRange();
				if (sel < rng[0]) sel = rng[0];
				if (sel > rng[1]) sel = rng[1];

				// set cursor position
				setSelectionRange(tbx, sel);
			}
		});
	}

	// handle clicks on the spinner buttons
	private _clickSpinner(e: MouseEvent) {
		if (this.value != null && this.step != null) {
			this.value += this.step * (contains(this._btnUp, e.target) ? +1 : -1);
			if (!this.isTouching) {
				setTimeout(() => this.selectAll());
			}
		}
	}

	// get selection start
	private _getSelStart(): number {
		return this._tbx && this._tbx.value
			? this._tbx.selectionStart
			: 0;
	}
}
