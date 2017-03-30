import { Control } from "../../core/Control";
import { CancelEventArgs } from "../../eventArgs/CancelEventArgs";
import { EventArgs } from "../../eventArgs/EventArgs";
import { Event } from "../../event/Event";
/**
 * Specifies actions that trigger showing and hiding @see:Popup controls.
 */
export declare enum PopupTrigger {
    /** No triggers; popups must be shown and hidden using code. */
    None = 0,
    /** Show or hide when the owner element is clicked. */
    Click = 1,
    /** Hide the popup when it loses focus. */
    Blur = 2,
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
export declare class Popup extends Control {
    _owner: HTMLElement;
    _modal: boolean;
    _showTrigger: PopupTrigger;
    _hideTrigger: PopupTrigger;
    _fadeIn: boolean;
    _fadeOut: boolean;
    _click: any;
    _bkdrop: HTMLDivElement;
    /**
     * Initializes a new instance of a @see:Popup control.
     *
     * @param element The DOM element that will host the control, or a selector for the host element (e.g. '#theCtrl').
     * @param options JavaScript object containing initialization data for the control.
     */
    constructor(element: any, options?: any);
    /**
     * Gets or sets the element that owns this @see:Popup.
     *
     * If the @see:owner is null, the @see:Popup behaves like a dialog.
     * It is centered on the screen and must be shown using the
     * @see:show method.
     */
    owner: HTMLElement;
    /**
     * Gets or sets the HTML element contained in this @see:Popup.
     */
    content: HTMLElement;
    /**
     * Gets or sets the actions that show the @see:Popup.
     *
     * By default, the @see:showTrigger property is set to @see:PopupTrigger.Click,
     * which causes the popup to appear when the user clicks the owner element.
     *
     * If you set the @see:showTrigger property to @see:PopupTrigger.None, the popup
     * will be shown only when the @see:show method is called.
     */
    showTrigger: PopupTrigger;
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
    hideTrigger: PopupTrigger;
    /**
     * Gets or sets a value that determines whether popups should be shown using a
     * fade-in animation.
     */
    fadeIn: boolean;
    /**
     * Gets or sets a value that determines whether popups should be hidden using a
     * fade-out animation.
     */
    fadeOut: boolean;
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
    modal: boolean;
    /**
     * Gets a value that determines whether the @see:Popup is currently visible.
     */
    readonly isVisible: boolean;
    /**
     * Shows the @see:Popup.
     *
     * @param modal Whether to show the popup as a modal dialog. If provided, this
     * sets the value of the @see:modal property.
     */
    show(modal?: boolean): void;
    /**
     * Hides the @see:Popup.
     */
    hide(): void;
    /**
     * Occurs before the @see:Popup is shown.
     */
    showing: Event;
    /**
     * Raises the @see:showing event.
     */
    onShowing(e: CancelEventArgs): boolean;
    /**
     * Occurs after the @see:Popup has been shown.
     */
    shown: Event;
    /**
     * Raises the @see:shown event.
     */
    onShown(e?: EventArgs): void;
    /**
     * Occurs before the @see:Popup is hidden.
     */
    hiding: Event;
    /**
     * Raises the @see:hiding event.
     */
    onHiding(e: CancelEventArgs): boolean;
    /**
     * Occurs after the @see:Popup has been hidden.
     */
    hidden: Event;
    /**
     * Raises the @see:hidden event.
     */
    onHidden(e?: EventArgs): void;
    onLostFocus(e?: EventArgs): void;
    refresh(fullUpdate?: boolean): void;
    _handleResize(): void;
    _handleClick(e: any): void;
    _showBackdrop(): void;
}
