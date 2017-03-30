import { EventArgs } from "../eventArgs/EventArgs";
import { Event } from "../event/Event";
/**
 * Base class for all Wijmo controls.
 *
 * The @see:Control class handles the association between DOM elements and the
 * actual control. Use the @see:hostElement property to get the DOM element
 * that is hosting a control, or the @see:getControl method to get the control
 * hosted in a given DOM element.
 *
 * The @see:Control class also provides a common pattern for invalidating and
 * refreshing controls, for updating the control layout when its size changes,
 * and for handling the HTML templates that define the control structure.
 */
export declare class Control {
    private static _DATA_KEY;
    private static _REFRESH_INTERVAL;
    private static _wme;
    static _touching: boolean;
    private _focus;
    private _updating;
    private _fullUpdate;
    private _toInv;
    private _szCtl;
    private _e;
    private _orgOuter;
    private _orgInner;
    private _listeners;
    _orgTag: string;
    _orgAtts: NamedNodeMap;
    /**
     * Initializes a new instance of a @see:Control and attaches it to a DOM element.
     *
     * @param element The DOM element that will host the control, or a selector for the host element (e.g. '#theCtrl').
     * @param options JavaScript object containing initialization data for the control.
     * @param invalidateOnResize Whether the control should be invalidated when it is resized.
     */
    constructor(element: any, options?: any, invalidateOnResize?: boolean);
    /**
     * Gets the HTML template used to create instances of the control.
     *
     * This method traverses up the class hierarchy to find the nearest ancestor that
     * specifies a control template. For example, if you specify a prototype for the
     * @see:ComboBox control, it will override the template defined by the @see:DropDown
     * base class.
     */
    getTemplate(): string;
    /**
     * Applies the template to a new instance of a control, and returns the root element.
     *
     * This method should be called by constructors of templated controls.
     * It is responsible for binding the template parts to the
     * corresponding control members.
     *
     * For example, the code below applies a template to an instance
     * of an @see:InputNumber control. The template must contain elements
     * with the 'wj-part' attribute set to 'input', 'btn-inc', and 'btn-dec'.
     * The control members '_tbx', '_btnUp', and '_btnDn' will be assigned
     * references to these elements.
     *
     * <pre>this.applyTemplate('wj-control wj-inputnumber', template, {
         *   _tbx: 'input',
         *   _btnUp: 'btn-inc',
         *   _btnDn: 'btn-dec'
         * }, 'input');</pre>
     *
     * @param classNames Names of classes to add to the control's host element.
     * @param template An HTML string that defines the control template.
     * @param parts A dictionary of part variables and their names.
     * @param namePart Name of the part to be named after the host element. This
     * determines how the control submits data when used in forms.
     */
    applyTemplate(classNames: string, template: string, parts: Object, namePart?: string): HTMLElement;
    /**
     * Disposes of the control by removing its association with the host element.
     *
     * The @see:dispose method automatically removes any event listeners added
     * with the @see:addEventListener method.
     *
     * Calling the @see:dispose method is important in applications that create
     * and remove controls dynamically. Failing to dispose of the controls may
     * cause memory leaks.
     */
    dispose(): void;
    /**
     * Gets the control that is hosted in a given DOM element.
     *
     * @param element The DOM element that is hosting the control, or a selector for the host element (e.g. '#theCtrl').
     */
    static getControl(element: any): Control;
    /**
     * Gets the DOM element that is hosting the control.
     */
    readonly hostElement: HTMLElement;
    /**
     * Sets the focus to this control.
     */
    focus(): void;
    /**
     * Checks whether this control contains the focused element.
     */
    containsFocus(): boolean;
    /**
     * Invalidates the control causing an asynchronous refresh.
     *
     * @param fullUpdate Whether to update the control layout as well as the content.
     */
    invalidate(fullUpdate?: boolean): void;
    /**
     * Refreshes the control.
     *
     * @param fullUpdate Whether to update the control layout as well as the content.
     */
    refresh(fullUpdate?: boolean): void;
    /**
     * Invalidates all Wijmo controls contained in an HTML element.
     *
     * Use this method when your application has dynamic panels that change
     * the control's visibility or dimensions. For example, splitters, accordions,
     * and tab controls usually change the visibility of its content elements.
     * In this case, failing to notify the controls contained in the element
     * may cause them to stop working properly.
     *
     * If this happens, you must handle the appropriate event in the dynamic
     * container and call the @see:Control.invalidateAll method so the contained
     * Wijmo controls will update their layout information properly.
     *
     * @param e Container element. If set to null, all Wijmo controls
     * on the page will be invalidated.
     */
    static invalidateAll(e?: HTMLElement): void;
    /**
     * Refreshes all Wijmo controls contained in an HTML element.
     *
     * This method is similar to @see:invalidateAll, except the controls
     * are updated immediately rather than after an interval.
     *
     * @param e Container element. If set to null, all Wijmo controls
     * on the page will be invalidated.
     */
    static refreshAll(e?: HTMLElement): void;
    /**
     * Disposes of all Wijmo controls contained in an HTML element.
     *
     * @param e Container element.
     */
    static disposeAll(e?: HTMLElement): void;
    /**
     * Suspends notifications until the next call to @see:endUpdate.
     */
    beginUpdate(): void;
    /**
     * Resumes notifications suspended by calls to @see:beginUpdate.
     */
    endUpdate(): void;
    /**
     * Gets a value that indicates whether the control is currently being updated.
     */
    readonly isUpdating: boolean;
    /**
     * Executes a function within a @see:beginUpdate/@see:endUpdate block.
     *
     * The control will not be updated until the function has been executed.
     * This method ensures @see:endUpdate is called even if the function throws.
     *
     * @param fn Function to be executed.
     */
    deferUpdate(fn: Function): void;
    /**
     * Gets a value that indicates whether the control is currently handling a touch event.
     */
    readonly isTouching: boolean;
    /**
     * Gets or sets whether the control is disabled.
     *
     * Disabled controls cannot get mouse or keyboard events.
     */
    disabled: boolean;
    /**
     * Initializes the control by copying the properties from a given object.
     *
     * This method allows you to initialize controls using plain data objects
     * instead of setting the value of each property in code.
     *
     * For example:
     * <pre>
     * grid.initialize({
         *   itemsSource: myList,
         *   autoGenerateColumns: false,
         *   columns: [
         *     { binding: 'id', header: 'Code', width: 130 },
         *     { binding: 'name', header: 'Name', width: 60 }
         *   ]
         * });
     * // is equivalent to
     * grid.itemsSource = myList;
     * grid.autoGenerateColumns = false;
     * // etc.
     * </pre>
     *
     * The initialization data is type-checked as it is applied. If the
     * initialization object contains unknown property names or invalid
     * data types, this method will throw.
     *
     * @param options Object that contains the initialization data.
     */
    initialize(options: any): void;
    /**
     * Adds an event listener to an element owned by this @see:Control.
     *
     * The control keeps a list of attached listeners and their handlers,
     * making it easier to remove them when the control is disposed (see the
     * @see:dispose and @see:removeEventListener method).
     *
     * Failing to remove event listeners may cause memory leaks.
     *
     * @param target Target element for the event.
     * @param type String that specifies the event.
     * @param fn Function to execute when the event occurs.
     * @param capture Whether the listener is capturing.
     */
    addEventListener(target: EventTarget, type: string, fn: any, capture?: boolean): void;
    /**
     * Removes one or more event listeners attached to elements owned by this @see:Control.
     *
     * @param target Target element for the event. If null, removes listeners attached to all targets.
     * @param type String that specifies the event. If null, removes listeners attached to all events.
     * @param capture Whether the listener is capturing. If null, removes capturing and non-capturing listeners.
     */
    removeEventListener(target?: EventTarget, type?: string, capture?: boolean): void;
    /**
     * Occurs when the control gets the focus.
     */
    gotFocus: Event;
    /**
     * Raises the @see:gotFocus event.
     */
    onGotFocus(e?: EventArgs): void;
    /**
     * Occurs when the control loses the focus.
     */
    lostFocus: Event;
    /**
     * Raises the @see:lostFocus event.
     */
    onLostFocus(e?: EventArgs): void;
    _handleResize(): void;
    _updateFocusState(): void;
    private _handleTouchStart(e);
    private _handleTouchEnd(e);
    private _handleDisabled(e);
    private _replaceWithDiv(element);
    _copyOriginalAttributes(e: HTMLElement): void;
}
