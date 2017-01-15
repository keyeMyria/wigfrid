import {hasItems} from "../../common/Global";
import {setSelectionRange} from "../../common/Global";
import {clamp} from "../../util/math/clamp";
import {ICollectionView} from "../../interface/collections/ICollectionView";
import {asBoolean} from "../../util/asserts/asBoolean";
import {asFunction} from "../../util/asserts/asFunction";
import {EventArgs} from "../../eventArgs/EventArgs";
import {CancelEventArgs} from "../../eventArgs/CancelEventArgs";
import {Key} from "../../enum/Key";
import {asNumber} from "../../util/asserts/asNumber";
import {asString} from "../../util/asserts/asString";
import {Event} from "../../event/Event";
import {BaseDropDown} from "../DropDown/BaseDropDown";
import {ElementRef, Output} from "@angular/core";
import {Component} from "@angular/core";
import {Inject} from "@angular/core";
import {Optional} from "@angular/core";
import {AfterViewInit} from "@angular/core";
import {ContentChild} from "@angular/core";
import {ViewChild} from "@angular/core";
import {HostListener} from "@angular/core";
import {ChangeDetectionStrategy, ChangeDetectorRef} from "@angular/core";
import {Injector} from "@angular/core";
import {DropDownInputPart} from "../DropDown/DropDownInputPart";
import {ListboxComponent} from "../ListBox/ListboxComponent";
import {ViewEncapsulation} from "@angular/core";
import {EventEmitter} from "@angular/core";
import {Input} from "@angular/core";
import {TemplateRef} from "@angular/core";
import {assert} from "../../util/assert";

import {showPopup, hidePopup} from "../../core/popup";
import {PopupDirective} from "../Popup/PopupDirective";
import {containsFocus} from "../../util/dom/contains";
import {ComboBoxHelper} from "./ComboBoxHelper";

/**
 * The @see:ComboBox control allows users to pick strings from lists.
 *
 * The control automatically completes entries as the user types, and allows users
 * to show a drop-down list with the items available.
 *
 * Use the @see:selectedIndex or the @see:text properties to determine which
 * item is currently selected.
 *
 * The @see:isEditable property determines whether users can enter values that
 * are not present in the list.
 *
 * The example below creates a @see:ComboBox control and populates it with a list
 * of countries. The @see:ComboBox searches for the country as the user types.
 * The <b>isEditable</b> property is set to false, so the user is forced to
 * select one of the items in the list.
 *
 * The example also shows how to create and populate a @see:ComboBox using
 * an HTML <b>&lt;select;&gt</b> element with <b>&lt;option;&gt</b> child
 * elements.
 *
 * @fiddle:8HnLx
 */
@Component(
    {
        selector  : 'ar-combobox',
        providers: [ComboBoxHelper],
        directives: [DropDownInputPart, ListboxComponent, PopupDirective],
        inputs: ['maxDropDownHeight', 'maxDropDownWidth'],
        template  : `<div style="position:relative" class="wj-template">
            <div class="wj-input">
                <div class="wj-input-group wj-input-btn-visible">
                    <input
                        #partInput
                        (input)="_setText(text, false);"
                        (click)="_handleInputClick()"
                        (keyup)="_setText(this.text, false);"
                        (compositionstart)="_composing = true;"
                        (compositionend)="_composing = false;_setText(text, true);"
                        type="text"
                        class="wj-form-control"
                        wjPart="input"
                    />
                    <span
                        #partButton
                        (click)="isDroppedDown = !isDroppedDown"
                        class="wj-input-group-btn"
                        tabindex="-1"
                        wj-part="btn"
                    >
                        <button class="wj-btn wj-btn-default" type="button" tabindex="-1">
                            <span class="wj-glyph-down"></span>
                        </button>
                    </span>
                </div>
            </div>
            <ar-listbox
                popup
                [popupSource]="'popup-source'"
                
                arListBox
                #partDropDown
                [style.maxHeight]="maxDropDownHeight"
                [style.maxWidth]="maxDropDownWidth"
                [itemsSource]="itemsSource"
                [listBoxTemplate]="_templateRef"
                
                [style.width]="'200'"
                
                (click)="isDroppedDown = false;"
                (itemsChanged)="_updateBtn()"
                (selectedIndexChanged)="onSelectedIndexChanged($event);"
                class="wj-content wj-dropdown-panel"
                wj-part="dropdown"
            >
                <template let-item><div class="wj-listbox-item">{{item}}</div></template>
            </ar-listbox>
        </div>`,
    }
)
export class ComboBoxComponent implements AfterViewInit {

    // child Ref elements
    @ViewChild('partInput')
    _tbxRef: ElementRef;

    @ViewChild('partButton')
    _btnRef: ElementRef;

    @ViewChild('partDropDown')
    public ListBox: ListboxComponent;

    private _isDroppedDown;

    // child elements
    private _tbx;
    private _btn;
    private _dropDown;

    private _lbx: ListboxComponent;

    // property storage
    _required = true;
    _editable = false;

    // private stuff
    _composing   = false;
    _deleting    = false;
    _settingText = false;
    _cvt: HTMLElement;
    _hdrPath: string;
    private _maxDropDownHeight;
    private _maxDropDownWidth;

    private _composing: boolean;
    private _itemsSource;

    @ContentChild(TemplateRef)
    private _templateRef: TemplateRef;
  private disabled;
  private _autoExpand;
  private _showBtn    = true;
  private _autoExpand = true;
  private _oldText;
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
     * Initializes a new instance of a @see:ComboBox control.
     *
     * @param _elementRef The DOM element that hosts the control, or a selector for the host element (e.g. '#theCtrl').
     *
     * @internal @param options The JavaScript object containing initialization data for the control.
     */
    constructor(@Inject(ElementRef) private _elementRef: ElementRef,
                private injector: Injector,
                private _comboboxHelper: ComboBoxHelper,
                // @Inject('options') private options?: Object
    ) {
        // super(_elementRef);
      _comboboxHelper.register(injector);
    }

    ngOnInit() {
      this._comboboxHelper.run();
    }

    ngAfterViewInit() {
      this._comboboxHelper.run();
        this._tbx      = this._tbxRef.nativeElement;
        this._btn      = this._btnRef.nativeElement;
        this._dropDown = this.ListBox._elementRef.nativeElement;

        // super.ngAfterViewInit();

        // create drop-down element, update button display
        this._createDropDown();
        this._updateBtn();


      // disable auto-expand by default
        this.autoExpandSelection = false;
    }

    /**
     * 在当前组件里没有下拉出来时, 滚轮可以控制选中项
     * @param e
     */
    // @HostListener('DOMMouseScroll', ['$event'])
    @HostListener('mousewheel', ['$event'])
    private onMouseWheel(e: MouseWheelEvent|any) {
        let host = this._elementRef.nativeElement;
        if (containsFocus(host) && !this.isDroppedDown && !e.defaultPrevented) {
            if (this.selectedIndex > -1) {
                const step         = clamp(e.wheelDelta || -e.detail, -1, +1);
                this.selectedIndex = clamp(this.selectedIndex - step, 0, this.collectionView.items.length - 1);
                e.preventDefault();
            }
        }
    }

    //--------------------------------------------------------------------------
    //#region ** object model

    /**
     * Gets or sets a value that indicates whether the drop down is currently visible.
     */
    get isDroppedDown(): boolean {
      return this._dropDown.style.display != 'none';
    }

    set isDroppedDown(value: boolean) {
      let host = this._elementRef.nativeElement;
      value = asBoolean(value) && !this.disabled;
      if (value != this.isDroppedDown && this.onIsDroppedDownChanging(new CancelEventArgs())) {
        const dd = this._dropDown;
        if (value) {
          if (!dd.style.minWidth) {
            dd.style.minWidth = host.getBoundingClientRect().width + 'px';
          }
          dd.style.display = 'block';
          this._updateDropDown();
        } else {
          // if (this.containsFocus()) {
          //   if (!this.isTouching || !this.showDropDownButton) {
          //     this.selectAll();
          //   }
          // }
          hidePopup(dd);
        }
        // this._updateFocusState();
        this.onIsDroppedDownChanged();
      }
    }

    /**
     * Gets or sets the array or @see:ICollectionView object that contains the items to select from.
     */
    @Input()
    get itemsSource(): any {
        return this._itemsSource;
    }

    set itemsSource(value: any) {
        this._itemsSource = value;
        // this._updateBtn();
    }

    /**
     * Gets the @see:ICollectionView object used as the item source.
     */
    get collectionView(): ICollectionView {
        return this._lbx.collectionView;
    }

    /**
     * Gets or sets the name of a property to use for getting the value displayed in the
     * control's input element.
     *
     * The default value for this property is null, which causes the control to display
     * the same content in the input element as in the selected item of the drop-down list.
     *
     * Use this property if you want to de-couple the value shown in the input element
     * from the values shown in the drop-down list. For example, the input element could
     * show an item's name and the drop-down list could show additional detail.
     */
    get headerPath(): string {
        return this._hdrPath;
    }

    set headerPath(value: string) {
        this._hdrPath = asString(value);
        const text = this.getDisplayText();
        if (this.text != text) {
            this._setText(text, true);
        }
    }

    /**
     * Gets or sets the name of the property used to get the @see:selectedValue from the @see:selectedItem.
     */
    get selectedValuePath(): string {
        return this._lbx.selectedValuePath;
    }

    set selectedValuePath(value: string) {
        this._lbx.selectedValuePath = value;
    }

    /**
     * Gets or sets a value indicating whether the drop-down list displays items as plain text or as HTML.
     */
    get isContentHtml(): boolean {
        return this._lbx.isContentHtml;
    }

    set isContentHtml(value: boolean) {
        if (value != this.isContentHtml) {
            this._lbx.isContentHtml = asBoolean(value);
            const text = this.getDisplayText();
            if (this.text != text) {
                this._setText(text, true);
            }
        }
    }

    /**
     * Gets or sets the index of the currently selected item in the drop-down list.
     */
    get selectedIndex(): number {
        return this._lbx.selectedIndex;
    }

    set selectedIndex(value: number) {
        if (value != this.selectedIndex) {
            this._lbx.selectedIndex = value;
        }
        const text = this.getDisplayText(value);
        if (this.text != text) {
            this._setText(text, true);
        }
    }

    /**
     * Gets or sets the item that is currently selected in the drop-down list.
     */
    get selectedItem(): any {
        return this._lbx.selectedItem;
    }

    set selectedItem(value: any) {
        this._lbx.selectedItem = value;
    }

    /**
     * Gets or sets the value of the @see:selectedItem, obtained using the @see:selectedValuePath.
     */
    get selectedValue(): any {
        return this._lbx.selectedValue;
    }

    set selectedValue(value: any) {
        this._lbx.selectedValue = value;
    }

    /**
     * Gets or sets whether the control value must be set to a non-null value
     * or whether it can be set to null (by deleting the content of the control).
     */
    get required(): boolean {
        return this._required;
    }

    set required(value: boolean) {
        this._required = asBoolean(value);
    }

    /**
     * Gets or sets a value that enables or disables editing of the text
     * in the input element of the @see:ComboBox (defaults to false).
     */
    get isEditable(): boolean {
        return this._editable;
    }

    set isEditable(value: boolean) {
        this._editable = asBoolean(value);
    }

    /**
     * Gets or sets the maximum height of the drop-down list.
     */
    get maxDropDownHeight(): number {
        return this._maxDropDownHeight;
    }

    set maxDropDownHeight(value: number) {
      this._maxDropDownHeight = asNumber(value);
    }

    /**
     * Gets or sets the maximum width of the drop-down list.
     *
     * The width of the drop-down list is also limited by the width of
     * the control itself (that value represents the drop-down's minimum width).
     */
    get maxDropDownWidth(): number {
        return this._maxDropDownWidth;
    }

    set maxDropDownWidth(value: number) {
        this._maxDropDownWidth = asNumber(value);
    }

    /**
     * Gets the string displayed in the input element for the item at a
     * given index (always plain text).
     *
     * @param index The index of the item to retrieve the text for.
     */
    getDisplayText(index = this.selectedIndex): string {

        // get display text directly from the headerPath if that was specified
        if (this.headerPath && index > -1 && hasItems(this.collectionView)) {
            const item = this.collectionView.items[index][this.headerPath];
            let text   = item != null ? item.toString() : '';
            if (this.isContentHtml) {
                if (!this._cvt) {
                    this._cvt = document.createElement('div');
                }
                this._cvt.innerHTML = text;
                text                = this._cvt.textContent;
            }
            return text;
        }

        // headerPath not specified, get text straight from the ListBox
        return this._lbx.getDisplayText(index);
    }

    /**
     * Occurs when the value of the @see:selectedIndex property changes.
     */
    @Output()
    selectedIndexChanged = new EventEmitter();

    /**
     * Raises the @see:selectedIndexChanged event.
     */
    onSelectedIndexChanged(e?: EventArgs) {
        this._updateBtn();
        this.selectedIndex = this._lbx.selectedIndex;
        this.selectedIndexChanged.emit(this);
    }

    /**
     * Gets the index of the first item that matches a given string.
     *
     * @param text The text to search for.
     * @param fullMatch A value indicating whether to look for a full match or just the start of the string.
     * @return The index of the item, or -1 if not found.
     */
    indexOf(text: string, fullMatch: boolean): number {
        const cv = this.collectionView;
        if (hasItems(cv) && text) {
            text = text.toString().toLowerCase();
            for (let i = 0; i < cv.items.length; i++) {
                const t = this.getDisplayText(i).toLowerCase();
                if (fullMatch) {
                    if (t == text) {
                        return i;
                    }
                } else {
                    if (t.indexOf(text) == 0) {
                        return i;
                    }
                }
            }
        }
        return -1;
    }

    /**
     * Gets the @see:ListBox control shown in the drop-down.
     */
    get listBox(): ListboxComponent {
        return this._lbx;
    }

    //#endregion ** object model

    //--------------------------------------------------------------------------
    //#region ** overrides

    // prevent empty values if editable and required (TFS 138025)
    onLostFocus(e?: EventArgs) {
        if (this.isEditable && this.required && !this.text) {
            if (hasItems(this.collectionView)) {
                this.selectedIndex = 0;
            }
        }
        // super.onLostFocus(e);
    }

    /**
     * Occurs before the drop down is shown or hidden.
     */
    isDroppedDownChanging = new EventEmitter();

    // prevent dropping down with no items
    onIsDroppedDownChanging(e: CancelEventArgs): boolean {
        if( hasItems(this.collectionView)){
            this.isDroppedDownChanging.emit(e);
            return !e.cancel;
        }else{
          return false;
        }
    }

    /**
     * Occurs after the drop down is shown or hidden.
     */
    isDroppedDownChanged = new EventEmitter();

    // show current selection when dropping down
    onIsDroppedDownChanged(e?: EventArgs) {
        this.isDroppedDownChanged.emit(e);
        if (this.isDroppedDown) {
            this._lbx.showSelection();
            if (!this.isTouching) {
                this.selectAll();
            }
        }
    }

    // update button visibility and value list
    _updateBtn() {
        const cv                = this.collectionView;
        this._btn.style.display = this._showBtn && hasItems(cv) ? '' : 'none';
    }

    // create the drop-down element
    _createDropDown() {

        // create the drop-down element
        //fixme ListBoxDirective
        this._lbx = this.ListBox;

        // limit the size of the drop-down
        // this._lbx.maxHeight = 200;

        // update our selection when user picks an item from the ListBox
        // or when the selected index changes because the list changed
        // this._lbx.selectedIndexChanged.subscribe(
        //     () => {
        //         this._updateBtn();
        //         this.selectedIndex = this._lbx.selectedIndex;
        //         this.onSelectedIndexChanged();
        //     }
        // );

        // update button display when item list changes
        // this._lbx.itemsChanged.subscribe(
        //     () => {
        //         this._updateBtn();
        //     }
        // );

        // close the drop-down when the user clicks to select an item
        // this.addEventListener(
        //     this._dropDown, 'click', (e: MouseEvent) => {
        //         if (e.target != this._dropDown) { // an item, not the list itself...
        //             this.isDroppedDown = false;
        //         }
        //     }
        // );
    }

    //#endregion ** overrides

    //--------------------------------------------------------------------------
    //#region ** implementation

    // update text in textbox
    _setText(text: string, fullMatch: boolean) {
      let host = this._elementRef.nativeElement;

        // not while composing IME text...
        if (this._composing) return;

        // prevent reentrant calls while moving CollectionView cursor
        if (this._settingText) return;
        this._settingText = true;

        // make sure we have a string
        if (text == null) text = '';
        text = text.toString();

        // get variables we need
        let index = this.selectedIndex;
        const cv = this.collectionView;
        let start = this._getSelStart(),
            len  = -1;

        // require full match if deleting (to avoid auto-completion)
        if (this._deleting) {
            fullMatch = true;
        }

        // try autocompletion
        if (this._deleting) {
            index = this.indexOf(text, true);
        } else {
            index = this.indexOf(text, fullMatch);
            if (index < 0 && fullMatch) { // not found, try partial match
                index = this.indexOf(text, false);
            }
            if (index < 0 && start > 0) { // not found, try up to cursor
                index = this.indexOf(text.substr(0, start), false);
            }
        }

        // not found and not editable? restore old text and move cursor to matching part
        if (index < 0 && !this.isEditable && hasItems(cv) && this._oldText) {
            if (this.required || text) { // allow removing the value if not required
                index = Math.max(0, this.indexOf(this._oldText, false));
                for (let i = 0; i < text.length && i < this._oldText.length; i++) {
                    if (text[i] != this._oldText[i]) {
                        start = i;
                        break;
                    }
                }
            }
        }
        if (index > -1) {
            len  = start;
            text = this.getDisplayText(index);
        }

        // update collectionView
        if (cv) {
            cv.moveCurrentToPosition(index);
        }

        // update element
        if (text != this._tbx.value) {
            this._tbx.value = text;
        }

        // update text selection
        if (len > -1 && this.containsFocus() && !this.isTouching) {
            this._setSelectionRange(len, text.length);
        }

        // call base class to fire textChanged event
        // super._setText(text, fullMatch);

        // clear flags
        this._deleting    = false;
        this._settingText = false;
    }

    // skip to the next/previous item that starts with a given string, wrapping
    private _findNext(text: string, step: number): number {
        if (this.collectionView) {
            text    = text.toLowerCase();
            const len = this.collectionView.items.length;
            let index: number,
                  t: string;
            for (let i = 1; i <= len; i++) {
                index = (this.selectedIndex + i * step + len) % len;
                t     = this.getDisplayText(index).toLowerCase();
                if (t.indexOf(text) == 0) {
                    return index;
                }
            }
        }
        return this.selectedIndex;
    }

  // expand the current selection to the entire number/string that was clicked
  _handleInputClick(){
    if (this._autoExpand) {
      this._expandSelection(); // expand the selection to the whole number/word that was clicked
    }
  }

  _expandSelection() {
    const tbx   = this._tbx,
          val   = tbx.value;
      let start = tbx.selectionStart,
          end   = tbx.selectionEnd;
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

    // override to select items with the keyboard
    _keydown(e: KeyboardEvent) {

        // allow base class
        // super._keydown(e);

        // if the base class handled this, we're done
        if (e.defaultPrevented) {
            return;
        }

        // if the input element is not visible, we're done (e.g. menu)
        if (this._elRef != this._tbx) {
            return;
        }

        // remember we pressed a key when handling the TextChanged event
        if (e.keyCode == Key.Back || e.keyCode == Key.Delete) {
            this._deleting = true;
        }

        // not if we have no items
        let cv = this.collectionView;
        if (!cv || !cv.items) {
            return;
        }

        // handle key
        let start = -1;
        switch (e.keyCode) {

            // select previous item (or wrap back to the last)
            case Key.Up:
                start              = this._getSelStart();
                this.selectedIndex = this._findNext(this.text.substr(0, start), -1);
                this._setSelectionRange(start, this.text.length);
                e.preventDefault();
                break;

            // select next item (or wrap back to the first, or show dropdown)
            case Key.Down:
                start              = this._getSelStart();
                this.selectedIndex = this._findNext(this.text.substr(0, start), +1);
                this._setSelectionRange(start, this.text.length);
                e.preventDefault();
                break;
        }
    }

    // set selection range in input element (if it is visible)
    private _setSelectionRange(start: number, end: number) {
        if (this._elRef == this._tbx) {
            setSelectionRange(this._tbx, start, end);
        }
    }

    // get selection start in an extra-safe way (TFS 82372)
    private _getSelStart(): number {
        return this._tbx && this._tbx.value
            ? this._tbx.selectionStart
            : 0;
    }

    //#endregion ** implementation


  // update drop down content before showing it
  _updateDropDown() {
    if (this.isDroppedDown) {
      // this._commitText();
      showPopup(this._dropDown, this._elementRef.nativeElement);
    }
  }

  /**
   * 全选文本
   * Sets the focus to the control and selects all its content.
   */
  selectAll() {
    setSelectionRange(this._tbx, 0, this.text.length);
  }
}
