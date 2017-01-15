
import {ComboBox} from '../ComboBox/ComboBox'
import {Control} from "../../core/Control";
import {hidePopup} from "../../core/popup";
import {showPopup} from "../../core/popup";
import {addClass} from "../../util/dom/addClass";
import {Key} from "../../enum/Key";
import {hasClass} from "../../util/dom/hasClass";
import {asBoolean} from "../../util/asserts/asBoolean";
import {asEnum} from "../../util/asserts/asEnum";
import {CancelEventArgs} from "../../eventArgs/CancelEventArgs";
import {EventArgs} from "../../eventArgs/EventArgs";
import {closest} from "../../util/dom/closest";
import {getElement} from "../../util/dom/getElement";
import {Event} from "../../event/Event";


/**
 * Specifies actions that trigger showing and hiding @see:Popup controls.
 */
export enum PopupTrigger {
    /** No triggers; popups must be shown and hidden using code. */
    None = 0,
    /** Show or hide when the owner element is clicked. */
    Click = 1,
    /** Hide the popup when it loses focus. */
    Blur = 2
}

/**
 * Class that shows an element as a popup.
 *
 * Popups may be have @see:owner elements, in which case they behave
 * as rich tooltips that may be shown or hidden based on actions
 * specified by the @see:showTrigger and @see:hideTrigger properties.
 *
 * Popups with no owner elements behave like dialogs. They are centered
 * on the screen and displayed using the @see:show method.
 *
 * To close a @see:Popup, call the @see:hide method. Alternatively,
 * any clickable elements within a @see:Popup that have the 'wj-hide'
 * class will hide the @see:Popup when clicked. For example, the
 * @see:Popup below will be hidden when the user presses the
 * OK or Cancel buttons:
 *
 * <pre>&lt;button id="btnPopup"&gt;Show Popup&lt;/button&gt;
 * &lt;wj-popup owner="#btnPopup" style="padding:12px"&gt;
 *   &lt;p&gt;Press one of the buttons below to hide the Popup.&lt;/p&gt;
 *   &lt;hr/&gt;
 *   &lt;button class="wj-hide" ng-click="handleOK()"&gt;OK&lt;/button&gt;
 *   &lt;button class="wj-hide"&gt;Cancel&lt;/button&gt;
 * &lt;/wj-popup&gt;</pre>
 */
export class Popup extends Control {
    _owner: HTMLElement;
    _modal: boolean;
    _showTrigger = PopupTrigger.Click;
    _hideTrigger = PopupTrigger.Blur;
    _fadeIn = true;
    _fadeOut = true;
    _click = this._handleClick.bind(this);
    _bkdrop: HTMLDivElement;

    /**
     * Initializes a new instance of a @see:Popup control.
     *
     * @param element The DOM element that will host the control, or a selector for the host element (e.g. '#theCtrl').
     * @param options JavaScript object containing initialization data for the control.
     */
    constructor(element: any, options?: any) {
        super(element, null, true);
        const host = this.hostElement;

        // add classes
        addClass(host, 'wj-control wj-content wj-popup');

        // start hidden
        hidePopup(host, false);

        // hide Popup when user presses Escape key
        this.addEventListener(host, 'keydown', (e: KeyboardEvent) => {
            if (!e.defaultPrevented && e.keyCode == Key.Escape) {
                this.hide();
            }
        });

        // hide Popup when user clicks an element with the 'wj-hide' class
        this.addEventListener(host, 'click', (e: MouseEvent) => {
            if (hasClass(<HTMLElement>e.target, 'wj-hide')) {
                e.preventDefault(); // cancel any navigation
                this.hide();
            }
        });

        // limit wheel propagation while modals are open
        this.addEventListener(document, 'onmousewheel' in document ? 'mousewheel' : 'DOMMouseScroll', (e: MouseWheelEvent) => {
            if (this.isVisible && this._modal) {
                for (let t = <HTMLElement>e.target; t && t != document.body; t = t.parentElement) {
                    if (t.scrollHeight > t.clientHeight) {
                        return;
                    }
                }
                e.preventDefault();
                e.stopPropagation();
            }
        });

        // apply options after control is fully initialized
        this.initialize(options);
    }

    // ** object model

    /**
     * Gets or sets the element that owns this @see:Popup.
     *
     * If the @see:owner is null, the @see:Popup behaves like a dialog.
     * It is centered on the screen and must be shown using the
     * @see:show method.
     */
    get owner(): HTMLElement {
        return this._owner;
    }
    set owner(value: HTMLElement) {

        // disconnect previous owner
        if (this._owner) {
            this.removeEventListener(this._owner, 'click');
        }

        // set new owner
        this._owner = value != null ? getElement(value) : null;

        // connect new owner
        if (this._owner) {
            this.addEventListener(this._owner, 'click', this._click, true);
        }
    }
    /**
     * Gets or sets the HTML element contained in this @see:Popup.
     */
    get content(): HTMLElement {
        return <HTMLElement>this.hostElement.firstElementChild;
    }
    set content(value: HTMLElement) {
        if (value != this.content) {
            this.hostElement.innerHTML = '';
            if (value instanceof HTMLElement) {
                this.hostElement.appendChild(value);
            }
        }
    }
    /**
     * Gets or sets the actions that show the @see:Popup.
     *
     * By default, the @see:showTrigger property is set to @see:PopupTrigger.Click,
     * which causes the popup to appear when the user clicks the owner element.
     *
     * If you set the @see:showTrigger property to @see:PopupTrigger.None, the popup
     * will be shown only when the @see:show method is called.
     */
    get showTrigger(): PopupTrigger {
        return this._showTrigger;
    }
    set showTrigger(value: PopupTrigger) {
        this._showTrigger = asEnum(value, PopupTrigger);
    }
    /**
     * Gets or sets the actions that hide the @see:Popup.
     *
     * By default, the @see:hideTrigger property is set to @see:PopupTrigger.Blur,
     * which hides the popup when it loses focus.
     *
     * If you set the @see:hideTrigger property to @see:PopupTrigger.Click, the popup
     * will be hidden only when the owner element is clicked.
     *
     * If you set the @see:hideTrigger property to @see:PopupTrigger.None, the popup
     * will be hidden only when the @see:hide method is called.
     */
    get hideTrigger(): PopupTrigger {
        return this._hideTrigger;
    }
    set hideTrigger(value: PopupTrigger) {
        this._hideTrigger = asEnum(value, PopupTrigger);
    }
    /**
     * Gets or sets a value that determines whether popups should be shown using a
     * fade-in animation.
     */
    get fadeIn(): boolean {
        return this._fadeIn;
    }
    set fadeIn(value: boolean) {
        this._fadeIn = asBoolean(value);
    }
    /**
     * Gets or sets a value that determines whether popups should be hidden using a
     * fade-out animation.
     */
    get fadeOut(): boolean {
        return this._fadeOut;
    }
    set fadeOut(value: boolean) {
        this._fadeOut = asBoolean(value);
    }
    /**
     * Gets or sets a value that determines whether the @see:Popup should
     * be displayed as a modal dialog.
     *
     * Modal dialogs show a dark backdrop that makes the Popup stand out from
     * other content on the page.
     *
     * If you want to make a dialog truly modal, also set the @see:hideTrigger
     * property to @see:PopupTrigger.None, so users won't be able to click the
     * backdrop to dismiss the dialog. In this case, the dialog will close only
     * if the @see:close method is called or if the user presses the Escape key.
     */
    get modal(): boolean {
        return this._modal;
    }
    set modal(value: boolean) {
        this._modal = asBoolean(value);
    }
    /**
     * Gets a value that determines whether the @see:Popup is currently visible.
     */
    get isVisible(): boolean {
        const host = this.hostElement;
        return host && host.style.display != 'none';
    }
    /**
     * Shows the @see:Popup.
     *
     * @param modal Whether to show the popup as a modal dialog. If provided, this
     * sets the value of the @see:modal property.
     */
    show(modal?: boolean) {
        if (!this.isVisible) {

            // raise event
            const e = new CancelEventArgs();
            if (this.onShowing(e)) {

                // honor modal parameter
                if (modal != null) {
                    this.modal = asBoolean(modal);
                }

                // show modal backdrop
                if (this._modal) {
                    this._showBackdrop();
                }

                // show the popup using a rectangle as reference (to avoid copying styles)
                const ref = this._owner ? this._owner.getBoundingClientRect() : null;
                showPopup(this.hostElement, ref, false, this._fadeIn);

                // raise shown event
                this.onShown(e);

                // set the focus to the first input element on the popup (unless this is a touch event)
                if (!this.isTouching) {
                    setTimeout(() => {
                        const inputs = this.hostElement.querySelectorAll('input');
                        for (let i = 0; i < inputs.length; i++) {
                            const el = <HTMLInputElement>inputs[i];
                            if (!el.disabled && el.tabIndex > -1 && !closest(el, '[disabled],.wj-state-disabled')) {
                                try {
                                    if (document.activeElement != el) {
                                        el.focus();
                                    }
                                    break;
                                } catch (x) { }
                            }
                        }
                        if (!this.containsFocus()) {
                            this.hostElement.tabIndex = 0;
                            this.hostElement.focus();
                        }
                    }, 200);
                }
            }
        }
    }
    /**
     * Hides the @see:Popup.
     */
    hide() {
        if (this.isVisible) {
            const e = new CancelEventArgs();
            if (this.onHiding(e)) {
                if (this.containsFocus && document.body) {
                    document.body.focus();
                }
                if (this._modal) {
                    hidePopup(this._bkdrop, true, this.fadeOut);
                }
                hidePopup(this.hostElement, true, this.fadeOut);
                this.onHidden(e);
            }
        }
    }
    /**
     * Occurs before the @see:Popup is shown.
     */
    showing = new Event();
    /**
     * Raises the @see:showing event.
     */
    onShowing(e: CancelEventArgs): boolean {
        this.showing.raise(this, e);
        return !e.cancel;
    }
    /**
     * Occurs after the @see:Popup has been shown.
     */
    shown = new Event();
    /**
     * Raises the @see:shown event.
     */
    onShown(e?: EventArgs) {
        this.shown.raise(this, e);
    }
    /**
     * Occurs before the @see:Popup is hidden.
     */
    hiding = new Event();
    /**
     * Raises the @see:hiding event.
     */
    onHiding(e: CancelEventArgs): boolean {
        this.hiding.raise(this, e);
        return !e.cancel;
    }
    /**
     * Occurs after the @see:Popup has been hidden.
     */
    hidden = new Event();
    /**
     * Raises the @see:hidden event.
     */
    onHidden(e?: EventArgs) {
        this.hidden.raise(this, e);
    }

    // ** overrides

    // hide popup when owner element and popup lose focus
    onLostFocus(e?: EventArgs) {
        setTimeout(() => { // needed in Chrome
            if (!this.containsFocus()) {
                if (this.isVisible && (this._hideTrigger & PopupTrigger.Blur)) {
                    this.hide();
                }
            }
        }, 100);
        super.onLostFocus(e);
    }

    // reposition Popup when refreshing
    refresh(fullUpdate = true) {
        super.refresh(fullUpdate);
        if (this.isVisible) {
            const ae  = <HTMLElement>document.activeElement,
                  ref = this._owner ? this._owner.getBoundingClientRect() : null;
            showPopup(this.hostElement, ref);
            if (this._modal && ae instanceof HTMLElement && ae != document.activeElement) {
                ae.focus();
            }
        }
    }

    // reposition Popup when window size changes
    _handleResize() {
        if (this.isVisible) {
            this.refresh();
        }
    }

    // ** implementation

    // toggle Popup when user clicks the owner element
    _handleClick(e) {
        if (this.isVisible && (this._hideTrigger & PopupTrigger.Click)) {
            this.hide();
        } else if (!this.isVisible && (this._showTrigger & PopupTrigger.Click)) {
            this.show();
        }
    }

    // show/hide modal popup backdrop
    _showBackdrop() {
        if (!this._bkdrop) {

            // create backdrop element
            this._bkdrop = document.createElement('div');
            this._bkdrop.tabIndex = -1;
            addClass(this._bkdrop, 'wj-popup-backdrop');

            // make it consume the mouse when hideTrigger is None
            this.addEventListener(this._bkdrop, 'mousedown', (e: MouseEvent) => {
                if (this.hideTrigger == 0) {
                    e.preventDefault();
                    e.stopPropagation();
                }
            });
        }
        this._bkdrop.style.display = '';
        document.body.appendChild(this._bkdrop);
    }
}
