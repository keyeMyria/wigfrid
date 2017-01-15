import {Size, assert, getElement, addClass, contains, asBoolean, enable, copy} from "../core/index";
import {EventArgs} from "../eventArgs/EventArgs";
import {Event} from "../event/Event";
import {CollectionView} from "./../collections/CollectionView";
import {ElementRef, EventEmitter} from "@angular/core";


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
export class BaseControl {
    private static _DATA_KEY = 'wj-Control';    // key used to store control reference in host element
    private static _REFRESH_INTERVAL = 10;      // interval between invalidation and refresh
    private static _wme: HTMLElement;           // watermark element
    static _touching: boolean;                  // the current event is a touch event

    private _focus = false;                     // whether the control currently contains the focus
    private _updating = 0;                      // update count (no refreshes while > 0)
    private _fullUpdate = false;                // in case there are multiple calls to invalidate(x)
    private _toInv: number;                     // invalidation timeOut
    private _szCtl: Size;                       // current control size
    private _e: HTMLElement;                    // host element
    private _orgOuter: string;                  // host element's original outerHTML
    private _orgInner: string;                  // host element's original innerHTML
    private _listeners;                         // list of event listeners attached to this control
    _orgTag: string;                            // host element's original tag (if not DIV)
    _orgAtts: NamedNodeMap;                     // host element's original attributes

    /**
     * Initializes a new instance of a @see:Control and attaches it to a DOM element.
     *
     * @param elementRef The DOM element that will host the control, or a selector for the host element (e.g. '#theCtrl').
     * @param options JavaScript object containing initialization data for the control.
     * @param invalidateOnResize Whether the control should be invalidated when it is resized.
     */
    constructor(elementRef: ElementRef, options = null, invalidateOnResize = false) {
        let element = elementRef.nativeElement;
        // check that the element is not in use
        //todo ###remove me###
        //assert(BaseControl.getControl(element) == null, 'Element is already hosting a control.');

        // get the host element
        const host = getElement(element);
        assert(host != null, 'Cannot find the host element.');

        // save host and original content (to restore on dispose)
        this._orgOuter = host.outerHTML;
        this._orgInner = host.innerHTML;

        // replace <input> and <select> elements with <div> and save their attributes
        //todo ###remove me###
        //if (host.tagName == 'INPUT' || host.tagName == 'SELECT') {
        //    this._orgAtts = host.attributes;
        //    this._orgTag = host.tagName;
        //    host = this._replaceWithDiv(host);
        //}

        // save host element and store control instance in element
        this._e = host;

        // update layout when user resizes the browser
        if (invalidateOnResize == true) {
            this._szCtl = new Size(host.offsetWidth, host.offsetHeight);
            const hr = this._handleResize.bind(this);
            this.addEventListener(window, 'resize', hr);
        }

        // fire events for got/lost focus
        this.addEventListener(host, 'focus', () => {
            this._updateFocusState();
        }, true);
        this.addEventListener(host, 'blur', () => {
            this._updateFocusState();
        }, true);

        // handle disabled controls
        // (pointer-events requires IE11, doesn't prevent wheel at all)
        const hd = this._handleDisabled.bind(this);
        this.addEventListener(host, 'mousedown', hd, true);
        this.addEventListener(host, 'mouseup', hd, true);
        this.addEventListener(host, 'click', hd, true);
        this.addEventListener(host, 'dblclick', hd, true);
        this.addEventListener(host, 'keydown', hd, true);
        this.addEventListener(host, 'onmousewheel' in document ? 'mousewheel' : 'DOMMouseScroll', hd, true);

        // keep track of touch actions at the document level
        // (no need to add/remove event handlers to every Wijmo control)
        if (BaseControl._touching == null) {
            BaseControl._touching = false;
            if ('ontouchstart' in window || 'onpointerdown' in window) {
                const b  = document.body,
                      ts = this._handleTouchStart,
                      te = this._handleTouchEnd;
                if ('ontouchstart' in window) { // Chrome, FireFox, Safari
                    b.addEventListener('touchstart', ts);
                    b.addEventListener('touchend', te);
                    b.addEventListener('touchcancel', te);
                    b.addEventListener('touchleave', te);
                } else if ('onpointerdown' in window) { // IE
                    b.addEventListener('pointerdown', ts);
                    b.addEventListener('pointerup', te);
                    b.addEventListener('pointerout', te);
                    b.addEventListener('pointercancel', te);
                    b.addEventListener('pointerleave', te);
                }
            }
        }

    }

    /**
     * Gets the HTML template used to create instances of the control.
     *
     * This method traverses up the class hierarchy to find the nearest ancestor that
     * specifies a control template. For example, if you specify a prototype for the
     * @see:ComboBox control, it will override the template defined by the @see:DropDown
     * base class.
     */
    getTemplate(): string {
        for (let p = Object.getPrototypeOf(this); p; p = Object.getPrototypeOf(p)) {

            const tpl = reflector.annotations(p.constructor).reduce(
                (p, m) => {
                    if (m instanceof ViewMetadata && m.template) {
                        return m.template;
                    }
                    if (m instanceof ComponentMetadata && m.template) {
                        return m.template;
                    }
                    return p;
                }, p.constructor && p.constructor.controlTemplate
            );
            if (tpl) {
                return tpl;
            }

        }

        return null;
    }
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
    applyTemplate(classNames: string, template: HTMLElement, parts: Object, namePart?: string): HTMLElement {
        const host = this._e;

        // apply standard classes to host element
        if (classNames) {
            addClass(host, classNames);
        }

        // convert string into HTML template and append to host
        //fixme ###
        let tpl = template;
        //let tpl = createElement(template);
        //var tpl = null;
        //if (template) {
        //    tpl = createElement(template);
        //    tpl = host.appendChild(tpl);
        //}

        // make sure the control can get the focus
        // this is a little tricky:
        // - Chrome won't give divs the focus unless we set tabIndex to something > -1
        // - But if we do set it and the control contains input elements, the back-tab key won't work
        // so we set the tabIndex to -1 or zero depending on whether the control contains input elements.
        // http://wijmo.com/topic/shift-tab-not-working-for-input-controls-in-ff-and-chrome/, TFS 123457
        if (host && !host.getAttribute('tabindex')) {
            host.tabIndex = host.querySelector('input') ? -1 : 0;
        }

        // bind control variables to template parts
        if (parts) {
            for (let part in parts) {
                const wjPart = parts[part];
                this[part]   = tpl.querySelector('[wj-part="' + wjPart + '"]');

                // look in the root as well (querySelector doesn't...)
                if (this[part] == null && tpl.getAttribute('wj-part') == wjPart) {
                    this[part] = tpl;
                }

                // make sure we found the part
                if (this[part] == null) {
                    throw 'Missing template part: "' + wjPart + '"';
                }

                // copy/move attributes from host to input element
                if (wjPart == namePart) {

                    // copy parent element's name attribute to the namePart element
                    // (to send data when submitting forms).
                    let att = host.attributes['name'];
                    if (att && att.value) {
                        this[part].setAttribute('name', att.value);
                    }

                    // transfer access key
                    att = host.attributes['accesskey'];
                    if (att && att.value) {
                        this[part].setAttribute('accesskey', att.value);
                        host.removeAttribute('accesskey');
                    }
                }
            }
        }

        // return template
        return tpl;
    }
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
    dispose() {

        // dispose of any child controls
        //todo ###remove use angular destroy###
        //var cc = this._e.querySelectorAll('.wj-control');
        //for (var i = 0; i < cc.length; i++) {
        //    var ctl = BaseControl.getControl(cc[i]);
        //    if (ctl) {
        //        ctl.dispose();
        //    }
        //}

        // cancel any pending refreshes
        if (this._toInv) {
            clearTimeout(this._toInv);
        }

        // remove all HTML event listeners
        this.removeEventListener();

        // remove all Wijmo event listeners
        // (without getting the value for all properties)
        for (var prop in this) {
            if (prop.length > 2 && prop.indexOf('on') == 0) {
                var evt = <Event>this[prop[2].toLowerCase() + prop.substr(3)];
                if (evt instanceof Event) {
                    evt.removeAllHandlers();
                }
            }
        }

        // if the control has a collectionView property, remove handlers to stop receiving notifications
        // REVIEW: perhaps optimize by caching the CollectionView properties?
        const cv = <CollectionView>this['collectionView'];
        if (cv instanceof CollectionView) {
            for (var prop in cv) {
                var evt = <Event>cv[prop];
                if (evt instanceof Event) {
                    evt.removeHandler(null, this);
                }
            }
        }

        // restore original content
        if (this._e.parentNode) {
            this._e.outerHTML = this._orgOuter;
        }

        // done
        this._e = this._orgOuter = this._orgInner = this._orgAtts = this._orgTag = null;
    }
    /**
     * Gets the DOM element that is hosting the control.
     */
    get hostElement(): HTMLElement {
        return this._e;
    }
    /**
     * Sets the focus to this control.
     */
    focus() {
        this._e.focus();
    }
    /**
     * Checks whether this control contains the focused element.
     */
    containsFocus(): boolean {

        // test for disposed controls
        if (!this._e) {
            return false;
        }

        // scan child controls (they may have popups, TFS 112676)
        //fixme
        //var c = this._e.getElementsByClassName('wj-control');
        //for (var i = 0; i < c.length; i++) {
        //    var ctl = BaseControl.getControl(c[i]);
        //    if (ctl && ctl != this && ctl.containsFocus()) {
        //        return true;
        //    }
        //}

        // check for actual HTML containment
        return contains(this._e, <HTMLElement>document.activeElement);
    }
    /**
     * Invalidates the control causing an asynchronous refresh.
     *
     * @param fullUpdate Whether to update the control layout as well as the content.
     * @deprecated
     */
    invalidate(fullUpdate = true) {
        this._fullUpdate = this._fullUpdate || fullUpdate;
        if (this._toInv) {
            clearTimeout(this._toInv);
            this._toInv = null;
        }
        if (!this.isUpdating) {
            this._toInv = setTimeout(() => {
                this.refresh(this._fullUpdate);
            }, BaseControl._REFRESH_INTERVAL);
        }
    }
    /**
     * Refreshes the control.
     *
     * @param fullUpdate Whether to update the control layout as well as the content.
     */
    refresh(fullUpdate = true) {
        if (!this.isUpdating && this._toInv) {
            clearTimeout(this._toInv);
            this._toInv = null;
            this._fullUpdate = false;
        }
        // derived classes should override this...
    }
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
    static invalidateAll(e? : HTMLElement) {
        if (!e) e = document.body;
        const ctl = BaseControl.getControl(e);
        if (ctl) {
            ctl.invalidate();
        }
        if (e.children) {
            for (let i = 0; i < e.children.length; i++) {
                BaseControl.invalidateAll(<HTMLElement>e.children[i]);
            }
        }
    }
    /**
     * Refreshes all Wijmo controls contained in an HTML element.
     *
     * This method is similar to @see:invalidateAll, except the controls
     * are updated immediately rather than after an interval.
     *
     * @param e Container element. If set to null, all Wijmo controls
     * on the page will be invalidated.
     */
    static refreshAll(e?: HTMLElement) {
        if (!e) e = document.body;
        const ctl = BaseControl.getControl(e);
        if (ctl) {
            ctl.refresh();
        }
        if (e.children) {
            for (let i = 0; i < e.children.length; i++) {
                BaseControl.refreshAll(<HTMLElement>e.children[i]);
            }
        }
    }
    /**
     * Disposes of all Wijmo controls contained in an HTML element.
     *
     * @param e Container element.
     */
    static disposeAll(e?: HTMLElement) {
        const ctl = BaseControl.getControl(e);
        if (ctl) {
            ctl.dispose();
        } else if (e.children) {
            for (let i = 0; i < e.children.length; i++) {
                BaseControl.disposeAll(<HTMLElement>e.children[i]);
            }
        }
    }
    /**
     * Suspends notifications until the next call to @see:endUpdate.
     */
    beginUpdate() {
        this._updating++;
    }
    /**
     * Resumes notifications suspended by calls to @see:beginUpdate.
     */
    endUpdate() {
        this._updating--;
        if (this._updating <= 0) {
            this.invalidate();
        }
    }
    /**
     * Gets a value that indicates whether the control is currently being updated.
     */
    get isUpdating(): boolean {
        return this._updating > 0;
    }
    /**
     * Executes a function within a @see:beginUpdate/@see:endUpdate block.
     *
     * The control will not be updated until the function has been executed.
     * This method ensures @see:endUpdate is called even if the function throws.
     *
     * @param fn Function to be executed.
     */
    deferUpdate(fn: Function) {
        try {
            this.beginUpdate();
            fn();
        } finally {
            this.endUpdate();
        }
    }
    /**
     * Gets a value that indicates whether the control is currently handling a touch event.
     */
    get isTouching(): boolean {
        return BaseControl._touching;
    }
    /**
     * Gets or sets whether the control is disabled.
     *
     * Disabled controls cannot get mouse or keyboard events.
     */
    get disabled(): boolean {
        return this._e && this._e.getAttribute('disabled') != null;
    }
    set disabled(value: boolean) {
        value = asBoolean(value, true);
        if (value != this.disabled) {
            enable(this._e, !value);
        }
    }
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
    initialize(options: any) {
        if (options) {
            this.beginUpdate();
            copy(this, options);
            this.endUpdate();
        }
    }
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
    addEventListener(target: EventTarget, type: string, fn: any, capture = false) {
            if (target) {
                target.addEventListener(type, fn, capture);
                if (this._listeners == null) {
                    this._listeners = [];
                }
                this._listeners.push({ target: target, type: type, fn: fn, capture: capture });
            }
        }
    /**
     * Removes one or more event listeners attached to elements owned by this @see:Control.
     *
     * @param target Target element for the event. If null, removes listeners attached to all targets.
     * @param type String that specifies the event. If null, removes listeners attached to all events.
     * @param capture Whether the listener is capturing. If null, removes capturing and non-capturing listeners.
     */
    removeEventListener(target?: EventTarget, type?: string, capture?: boolean) {
        if (this._listeners) {
            for (let i = 0; i < this._listeners.length; i++) {
                const l = this._listeners[i];
                if (target == null || target == l.target) {
                    if (type == null || type == l.type) {
                        if (capture == null || capture == l.capture) {
                            l.target.removeEventListener(l.type, l.fn, l.capture);
                            this._listeners.splice(i, 1);
                            i--;
                        }
                    }
                }
            }
        }
    }

    /**
     * Occurs when the control gets the focus.
     */
    gotFocus = new EventEmitter();
    /**
     * Raises the @see:gotFocus event.
     */
    onGotFocus(e?: EventArgs) {
        this.gotFocus.emit(e);
    }
    /**
     * Occurs when the control loses the focus.
     */
    lostFocus = new EventEmitter();
    /**
     * Raises the @see:lostFocus event.
     */
    onLostFocus(e?: EventArgs) {
        this.lostFocus.emit(e);
    }

    // ** implementation

    // invalidates the control when its size changes
    _handleResize() {
        if (this._e.parentElement) {
            const sz = new Size(this._e.offsetWidth, this._e.offsetHeight);
            if (!sz.equals(this._szCtl)) {
                this._szCtl = sz;
                this.invalidate();
            }
        }
    }

    // update focus state and raise got/lost focus events
    _updateFocusState() {

        // use a timeOut since Chrome and FF sometimes move the focus to the body
        // before moving it to the new focused element
        // todo ###remove me###
        //setTimeout(() => {
        //
        //    // update state for this control
        //    var focus = this.containsFocus();
        //    if (focus != this._focus) {
        //        this._focus = focus;
        //        if (focus) {
        //            this.onGotFocus();
        //        } else {
        //            this.onLostFocus();
        //        }
        //        toggleClass(this._e, 'wj-state-focused', focus);
        //    }
        //
        //    // update state for any parent controls as well
        //    if (this._e) {
        //        for (var e = this._e.parentElement; e; e = e.parentElement) {
        //            var ctl = BaseControl.getControl(e);
        //            if (ctl) {
        //                ctl._updateFocusState();
        //                break;
        //            }
        //        }
        //    }
        //});
    }

    // keep track of touch events
    private _handleTouchStart(e) {
        if (e.pointerType == null || e.pointerType == 'touch') {
            BaseControl._touching = true;
            console.log('touching = true');
        }
    }
    private _handleTouchEnd(e) {
        if (e.pointerType == null || e.pointerType == 'touch') {
            setTimeout(function () {
                BaseControl._touching = false;
                console.log('touching = false');
            }, 400); // 300ms click event delay on IOS, plus some safety
        }
    }

    // suppress mouse and keyboard events if the control is disabled
    private _handleDisabled(e: any) {
        if (this.disabled) {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
        }
    }

    //todo ###remove me###
    //// replaces an element with a div element, copying the child elements
    //// and the 'id' and 'style' attributes from the original element
    //private _replaceWithDiv(element: HTMLElement) {
    //
    //    // replace the element
    //    var p = element.parentElement,
    //        div = document.createElement('div');
    //    p.replaceChild(div, element);
    //
    //    // copy children
    //    div.innerHTML = element.innerHTML;
    //
    //    // copy id and style, or all attributes
    //    var atts = element.attributes;
    //    for (var i = 0; i < atts.length; i++) {
    //        var name = atts[i].name;
    //        if (name == 'id' || name == 'style') {
    //            div.setAttribute(name, atts[i].value);
    //        }
    //    }
    //
    //    // return new div
    //    return div;
    //}

    // copy attributes (except id and style) in
    // the original element to the replacement element
    _copyOriginalAttributes(e: HTMLElement) {
        const atts = this._orgAtts;
        if (atts) {
            for (let i = 0; i < atts.length; i++) {
                const name = atts[i].name.toLowerCase();
                if (name != 'id' && name != 'style' && name != 'type') {
                    e.setAttribute(name, atts[i].value);
                }
            }
        }
    }
}
