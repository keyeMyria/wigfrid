import {Color} from '../../common/ui/Color'
import {Control} from '../../core/Control'
import {showPopup, hidePopup} from '../../core/popup'
import {setSelectionRange} from "../../common/Global";
import {CancelEventArgs} from "../../eventArgs/CancelEventArgs";
import {asBoolean} from "../../util/asserts/asBoolean";
import {EventArgs} from "../../eventArgs/EventArgs";
import {contains} from "../../util/dom/contains";
import {Key} from "../../enum/Key";
import {Event} from "../../event/Event"


/**
 * DropDown control (abstract).
 *
 * Contains an input element and a button used to show or hide the drop-down.
 *
 * Derived classes must override the _createDropDown method to create whatever
 * editor they want to show in the drop down area (a list of items, a calendar,
 * a color editor, etc).
 */
export class DropDown extends Control {

    // child elements
    _tbx: HTMLInputElement;
    _elRef: HTMLElement;
    _btn: HTMLElement;
    _dropDown: HTMLElement;

    // property storage
    _showBtn    = true;
    _autoExpand = true;

    // private stuff
    _oldText: string;

    /**
     * Gets or sets the template used to instantiate @see:DropDown controls.
     */
    static controlTemplate = '<div style="position:relative" class="wj-template">' +
        '<div class="wj-input">' +
        '<div class="wj-input-group wj-input-btn-visible">' +
        '<input wj-part="input" type="text" class="wj-form-control" />' +
        '<span wj-part="btn" class="wj-input-group-btn" tabindex="-1">' +
        '<button class="wj-btn wj-btn-default" type="button" tabindex="-1">' +
        '<span class="wj-glyph-down"></span>' +
        '</button>' +
        '</span>' +
        '</div>' +
        '</div>' +
        '<div wj-part="dropdown" class="wj-content wj-dropdown-panel" ' +
        'style="display:none;position:absolute;z-index:100;width:auto">' +
        '</div>' +
        '</div>';

    /**
     * Initializes a new instance of a @see:DropDown control.
     *
     * @param element The DOM element that hosts the control, or a selector for the host element (e.g. '#theCtrl').
     * @param options The JavaScript object containing initialization data for the control.
     */
    constructor(element: any, options?) {
        super(element, null, true);

        // instantiate and apply template
        const tpl = this.getTemplate();
        this.applyTemplate(
            'wj-control wj-dropdown wj-content', tpl, {
                _tbx     : 'input',
                _btn     : 'btn',
                _dropDown: 'dropdown'
            }, 'input'
        );

        // set reference element (used for positioning the drop-down)
        this._elRef = this._tbx;

        // disable autocomplete (important for mobile browsers including Chrome/Android)
        this._tbx.autocomplete = 'off';

        // create drop-down element, update button display
        this._createDropDown();
        this._updateBtn();

        // update focus state when the drop-down loses focus
        this.addEventListener(
            this._dropDown, 'blur', () => {
                this._updateFocusState();
            }, true
        );

        // keyboard events (the same handlers are used for the control and for the drop-down)
        const kd = this._keydown.bind(this);
        this.addEventListener(this.hostElement, 'keydown', kd);
        this.addEventListener(this.dropDown, 'keydown', kd);

        // textbox events
        this.addEventListener(
            this._tbx, 'input', () => {
                this._setText(this.text, false);
            }
        );
        this.addEventListener(
            this._tbx, 'click', () => {
                if (this._autoExpand) {
                    this._expandSelection(); // expand the selection to the whole number/word that was clicked
                }
            }
        );

        // in case the drop-down is shown but the control is not (e.g. context menu)
        this.addEventListener(
            this.dropDown, 'focus', () => {
                this._updateFocusState();
            }
        );

        // IE 9 does not fire an input event when the user removes characters from input
        // filled by keyboard, cut, or drag operations.
        // https://developer.mozilla.org/en-US/docs/Web/Events/input
        // so subscribe to keyup and set the text just in case (TFS 111189)
        if (document.doctype && navigator.appVersion.indexOf('MSIE 9') > -1) {
            this.addEventListener(
                this._tbx, 'keyup', () => {
                    this._setText(this.text, false);
                }
            );
        }

        // handle clicks on the drop-down button
        this.addEventListener(this._btn, 'click', this._btnclick.bind(this));

        // stop propagation of clicks on the drop-down element
        // (since they are not children of the hostElement, which can confuse
        // elements such as Bootstrap menus)
        this.addEventListener(
            this._dropDown, 'click', (e) => {
                e.stopPropagation();
            }
        );

        // initializing from <input> tag
        if (this._orgTag == 'INPUT') {
            this._copyOriginalAttributes(this._tbx);
        }
    }

    //--------------------------------------------------------------------------
    //#region ** object model

    /**
     * Gets or sets the text shown on the control.
     */
    get text(): string {
        return this._tbx.value;
    }

    set text(value: string) {
        if (value != this.text) {
            this._setText(value, true);
        }
    }

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
     * Gets or sets the string shown as a hint when the control is empty.
     */
    get placeholder(): string {
        return this._tbx.placeholder;
    }

    set placeholder(value: string) {
        this._tbx.placeholder = value;
    }

    /**
     * Gets or sets a value that indicates whether the drop down is currently visible.
     */
    get isDroppedDown(): boolean {
        return this._dropDown.style.display != 'none';
    }

    set isDroppedDown(value: boolean) {
        value = asBoolean(value) && !this.disabled;
        if (value != this.isDroppedDown && this.onIsDroppedDownChanging(new CancelEventArgs())) {
            const dd = this._dropDown;
            if (value) {
                if (!dd.style.minWidth) {
                    dd.style.minWidth = this.hostElement.getBoundingClientRect().width + 'px';
                }
                dd.style.display = 'block';
                this._updateDropDown();
            } else {
                if (this.containsFocus()) {
                    if (!this.isTouching || !this.showDropDownButton) {
                        this.selectAll();
                    }
                }
                hidePopup(dd);
            }
            this._updateFocusState();
            this.onIsDroppedDownChanged();
        }
    }

    /**
     * Gets the drop down element shown when the @see:isDroppedDown
     * property is set to true.
     */
    get dropDown(): HTMLElement {
        return this._dropDown;
    }

    /**
     * Gets or sets a value that indicates whether the control should display a drop-down button.
     */
    get showDropDownButton(): boolean {
        return this._showBtn;
    }

    set showDropDownButton(value: boolean) {
        this._showBtn = asBoolean(value);
        this._updateBtn();
    }

    /**
     * Gets or sets a value that indicates whether the control should automatically expand the
     * selection to whole words/numbers when the control is clicked.
     */
    get autoExpandSelection(): boolean {
        return this._autoExpand;
    }

    set autoExpandSelection(value: boolean) {
        this._autoExpand = asBoolean(value);
    }

    /**
     * Sets the focus to the control and selects all its content.
     */
    selectAll() {
        if (this._elRef == this._tbx) {
            setSelectionRange(this._tbx, 0, this.text.length);
        }
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
     * Occurs before the drop down is shown or hidden.
     */
    isDroppedDownChanging = new Event();

    /**
     * Raises the @see:isDroppedDownChanging event.
     */
    onIsDroppedDownChanging(e: CancelEventArgs): boolean {
        this.isDroppedDownChanging.raise(this, e);
        return !e.cancel;
    }

    /**
     * Occurs after the drop down is shown or hidden.
     */
    isDroppedDownChanged = new Event();

    /**
     * Raises the @see:isDroppedDownChanged event.
     */
    onIsDroppedDownChanged(e?: EventArgs) {
        this.isDroppedDownChanged.raise(this, e);
    }

    //#endregion

    //--------------------------------------------------------------------------
    //#region ** overrides

    // transfer focus from control to textbox
    // (but don't show the soft keyboard when the user touches the drop-down button)
    onGotFocus(e?: EventArgs) {
        if (!this.isTouching) {
            this.selectAll();
        }
        super.onGotFocus(e);
    }

    // close the drop-down when losing focus
    onLostFocus(e?: EventArgs) {
        this._commitText();
        if (!this.containsFocus()) {
            this.isDroppedDown = false;
        }
        super.onLostFocus(e);
    }

    // check whether this control or its drop-down contain the focused element.
    containsFocus(): boolean {
        return super.containsFocus() || contains(this._dropDown, document.activeElement);
    }

    // close drop-down when disposing
    dispose() {
        this.isDroppedDown = false;
        super.dispose();
    }

    // reposition dropdown when refreshing
    refresh(fullUpdate = true) {
        super.refresh(fullUpdate);

        // update popup/focus
        if (this.isDroppedDown) {
            if (getComputedStyle(this.hostElement).display != 'none') {
                const ae = <HTMLElement>document.activeElement;
                showPopup(this._dropDown, this.hostElement);
                if (ae instanceof HTMLElement && ae != document.activeElement) {
                    ae.focus();
                }
            }
        }
    }

    // reposition dropdown when window size changes
    _handleResize() {
        if (this.isDroppedDown) {
            this.refresh();
        }
    }

    //#endregion

    //--------------------------------------------------------------------------
    //#region ** implementation

    // expand the current selection to the entire number/string that was clicked
    _expandSelection() {
        const tbx = this._tbx,
              val = tbx.value;
        let start = tbx.selectionStart,
              end = tbx.selectionEnd;
        if (val && start == end) {
            const ct = this._getCharType(val, start);
            if (ct > -1) {
                for (; end < val.length; end++) {
                    if (this._getCharType(val, end) != ct) {
                        break;
                    }
                }
                for (; start > 0; start--) {
                    if (this._getCharType(val, start - 1) != ct) {
                        break;
                    }
                }
                if (start != end) {
                    tbx.setSelectionRange(start, end);
                }
            }
        }
    }

    // get the type of character (digit, letter, other) at a given position
    _getCharType(text: string, pos: number) {
        const chr = text[pos];
        if (chr >= '0' && chr <= '9') return 0;
        if ((chr >= 'a' && chr <= 'z') || (chr >= 'A' && chr <= 'Z')) return 1;
        return -1;
    }

    // handle keyboard events
    _keydown(e: KeyboardEvent) {

        // honor defaultPrevented
        if (e.defaultPrevented) return;

        // handle key
        switch (e.keyCode) {

            // close dropdown on tab, escape, enter
            case Key.Tab:
            case Key.Escape:
            case Key.Enter:
                this.isDroppedDown = false;
                break;

            // toggle drop-down on F4, alt up/down
            case Key.F4:
            case Key.Down:
            case Key.Up:
                if (e.keyCode == Key.F4 || e.altKey) {
                    this.isDroppedDown = !this.isDroppedDown;
                    if (!this.isDroppedDown) {
                        this._tbx.focus();
                    }
                    e.preventDefault();
                }
                break;
        }
    }

    // handle clicks on the drop-down button
    _btnclick(e: MouseEvent) {
        this.isDroppedDown = !this.isDroppedDown;
    }

    // update text in textbox
    _setText(text: string, fullMatch: boolean) {

        // make sure we have a string
        if (text == null) text = '';
        text = text.toString();

        // update element
        if (text != this._tbx.value) {
            this._tbx.value = text;
        }

        // fire change event
        if (text != this._oldText) {
            this._oldText = text;
            this.onTextChanged();
        }
    }

    // update drop-down button visibility
    _updateBtn() {
        this._btn.tabIndex      = -1;
        this._btn.style.display = this._showBtn ? '' : 'none';
    }

    // create the drop-down element
    _createDropDown() {
        // override in derived classes
    }

    // commit the text in the value element
    _commitText() {
        // override in derived classes
    }

    // update drop down content before showing it
    _updateDropDown() {
        if (this.isDroppedDown) {
            this._commitText();
            showPopup(this._dropDown, this.hostElement);
        }
    }
}
