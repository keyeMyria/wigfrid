import {Component, Injectable} from "@angular/core";
import {Inject} from "@angular/core";
import {ElementRef} from "@angular/core";
import {EventEmitter} from "@angular/core";
import {ViewEncapsulation} from "@angular/core";
import {asCollectionView} from "../../util/asserts/asCollectionView";
import {asString} from "../../util/asserts/asString";
import {asNumber} from "../../util/asserts/asNumber";
import {toggleClass} from "../../util/dom/toggleClass";
import {contains} from "../../util/dom/contains";
import {isObject} from "../../util/isObject";
import {asArray} from "../../util/asserts/asArray";
import {EventArgs} from "../../eventArgs/EventArgs";
import {Key} from "../../enum/Key";
import {tryCast} from "../../common/Global";
import {asBoolean} from "../../util/asserts/asBoolean";

import {ICollectionView} from "../../interface/collections/ICollectionView";
import {IEditableCollectionView} from "../../interface/collections/IEditableCollectionView";
import {NotifyCollectionChangedEventArgs} from "../../core/collections/eventArgs/NotifyCollectionChangedEventArgs";
import {HostListener} from "@angular/core";
import {CORE_DIRECTIVES} from "@angular/common";
import {ListBoxItemDirective} from "./ListBoxItemDirective";
import {TemplateRef} from "@angular/core";
import {ContentChild} from "@angular/core";
import {Input} from "@angular/core";

import style from "./ListBox.css"


/**
 * angular ahri ListBox
 *
 * can use ListBoxTemplate or set a template in content
 */
@Component(
  {
    selector  : 'ar-listbox',
    template  :
`<template ngFor let-item [ngForOf]="_cv.items" [ngForTemplate]="_templateRef">
</template>`,
    directives: [CORE_DIRECTIVES, ListBoxItemDirective],
    host: {
      'class': `wj-control wj-listbox wj-content`,
      '[style.max-height.px]': 'maxHeight',
      '[style.max-width.px]': 'maxWidth',
      'tabindex': -1
    },
    encapsulation: ViewEncapsulation.None,
    styles: [ style ],
    inputs    : [
      'itemsSource',
      'isContentHtml',
      'selectedValuePath',
      'checkedMemberPath',
      'selectedIndex',
      'selectedItem',
      'selectedValue',
    ],
    outputs   : [
      "itemsChanged",
      "itemChecked",
    ]
  }
)
@Injectable()
export class ListboxComponent {
  itemsChanged = new EventEmitter(false);
  itemChecked = new EventEmitter(false);

  // property storage
  _items: any; // any[] or ICollectionView
  _cv: ICollectionView;
  _pathDisplay: string;
  _pathValue: string;
  _pathChecked: string;
  _html = false;

  // work variables
  _checking: boolean;
  _search = '';
  _toSearch: number;

  //template block listBoxTemplate > content template > self template
  private _templateRef: TemplateRef;
  private _notContentTemplate: boolean;

  @ContentChild(TemplateRef)
  private set _contentTemplateRef(value: TemplateRef){
    if( value && !this._notContentTemplate){
      this._templateRef = value;
    }
  }

  @Input()
  set listBoxTemplate(value: TemplateRef) {
    if (value) {
      this._notContentTemplate = true;
      this._templateRef = value;
    }
  }

  /**
   * Initializes a new instance of a @see:ListBox.
   *
   * @param _elementRef The DOM element that hosts the control, or a selector for the host element (e.g. '#theCtrl').
   * @param _templateRef
   *
   * @internal @param options The JavaScript object containing initialization data for the control.
   */
  constructor(@Inject(ElementRef) private _elementRef: ElementRef
              // @Inject('options') private options?: Object
  ) {
    this._cv = asCollectionView([])
  }

  // @HostListener('DOMMouseScroll', ['$event'])
  @HostListener('mousewheel', ['$event'])
  public onMouseWheel(e: WheelEvent) {
    let host = this._elementRef.nativeElement;

    if (host.scrollHeight > host.clientHeight) {
      if (((<MouseWheelEvent>e).wheelDelta > 0 && host.scrollTop == 0) ||
        ((<MouseWheelEvent>e).wheelDelta < 0 && host.scrollTop + host.clientHeight >= host.scrollHeight)) {
        e.preventDefault();
        e.stopPropagation();
      }
    }
  }

  /**
   * Gets or sets the array or @see:ICollectionView object that contains the list items.
   */
  get itemsSource(): any {
    return this._items;
  }

  set itemsSource(value: any) {
    if (this._items != value) {

      // unbind current collection view
      if (this._cv) {
        this._cv.completeAllStream();
        this._cv = null;
      }

      // save new data source and collection view
      this._items = value;
      this._cv = asCollectionView(value);

      // bind new collection view
      if (this._cv != null) {
        this._cv.currentChanged.subscribe(this._cvCurrentChanged.bind(this));
        this._cv.collectionChanged.subscribe(this._cvCollectionChanged.bind(this));
      }

      // update the list
      this.showSelection();

      // fire event so user can hook up to items
      this.onLoadedItems();
      this.onItemsChanged();
      this.onSelectedIndexChanged();
    }
  }

  /**
   * Gets the @see:ICollectionView object used as the item source.
   */
  get collectionView(): ICollectionView {
    return this._cv;
  }

  /**
   * Gets or sets a value indicating whether items contain plain text or HTML.
   */
  get isContentHtml(): boolean {
    return this._html;
  }

  set isContentHtml(value: boolean) {
    if (value != this._html) {
      this._html = asBoolean(value);
    }
  }

  /**
   * Gets or sets the name of the property used to get the @see:selectedValue
   * from the @see:selectedItem.
   */
  get selectedValuePath(): string {
    return this._pathValue;
  }

  set selectedValuePath(value: string) {
    this._pathValue = asString(value);
  }

  /**
   * Gets or sets the name of the property used to control the checkboxes
   * placed next to each item.
   *
   * Use this property to create multi-select lisboxes.
   * When an item is checked or unchecked, the control raises the @see:itemChecked event.
   * Use the @see:selectedItem property to retrieve the item that was checked or unchecked,
   * or use the @see:checkedItems property to retrieve the list of items that are currently
   * checked.
   */
  get checkedMemberPath() {
    return this._pathChecked;
  }

  set checkedMemberPath(value: string) {
    if (value != this._pathChecked) {
      this._pathChecked = asString(value);
    }
  }


  /**
   * Gets the text displayed for the item at a given index (as plain text).
   *
   * @param index The index of the item.
   */
  getDisplayText(index: number): string {
    let host = this._elementRef.nativeElement;

    const children = host.children,
          item = index > -1 && index < children.length
              ? <HTMLElement>children[index]
              : null;
    return item != null ? item.textContent : '';
  }

  /**
   * Gets or sets the index of the currently selected item.
   */
  get selectedIndex(): number {
    return this._cv ? this._cv.currentPosition : -1;
  }

  set selectedIndex(value: number) {
    if (this._cv) {
      this._cv.moveCurrentToPosition(asNumber(value));
    }
  }

  /**
   * Gets or sets the item that is currently selected.
   */
  get selectedItem(): any {
    return this._cv ? this._cv.currentItem : null;
  }

  set selectedItem(value: any) {
    if (this._cv) {
      this._cv.moveCurrentTo(value);
    }
  }

  /**
   * Gets or sets the value of the @see:selectedItem obtained using the @see:selectedValuePath.
   */
  get selectedValue(): any {
    let item = this.selectedItem;
    if (item && this.selectedValuePath) {
      item = item[this.selectedValuePath];
    }
    return item;
  }

  set selectedValue(value: any) {
    let path  = this.selectedValuePath,
        index = -1;
    if (this._cv) {
      for (let i = 0; i < this._cv.items.length; i++) {
        const item = this._cv.items[i];
        if ((path && item[path] == value) || (!path && item == value)) {
          index = i;
          break;
        }
      }
      this.selectedIndex = index;
    }
  }

  /**
   * Highlights the selected item and scrolls it into view.
   */
  showSelection() {
    const index    = this.selectedIndex,
          host     = this._elementRef.nativeElement,
          children = host.children;
      let e: HTMLElement;

    // highlight
    for (let i = 0; i < children.length; i++) {
      e = <HTMLElement>children[i];
      toggleClass(e, 'wj-state-selected', i == index);
    }

    // scroll into view
    if (index > -1 && index < children.length) {
      e = <HTMLElement>children[index];
      const rco = e.getBoundingClientRect();
      const rcc = host.getBoundingClientRect();
      if (rco.bottom > rcc.bottom) {
        host.scrollTop += rco.bottom - rcc.bottom;
      } else if (rco.top < rcc.top) {
        host.scrollTop -= rcc.top - rco.top;
      }
    }
  }

  /**
   * Gets the checked state of an item on the list.
   *
   * This method is applicable only on multi-select listboxes
   * (see the @see:checkedMemberPath property).
   *
   * @param index Item index.
   */
  getItemChecked(index: number): boolean {
    const item = this._cv.items[index];
    if (isObject(item) && this.checkedMemberPath) {
      return item[this.checkedMemberPath];
    }
    const cb = this._getCheckbox(index);
    return cb ? cb.checked : false;
  }

  /**
   * Sets the checked state of an item on the list.
   *
   * This method is applicable only on multi-select listboxes
   * (see the @see:checkedMemberPath property).
   *
   * @param index Item index.
   * @param checked Item's new checked state.
   */
  setItemChecked(index: number, checked: boolean) {
    this._setItemChecked(index, checked, true);
  }

  /**
   * Toggles the checked state of an item on the list.
   * This method is applicable only to multi-select listboxes
   * (see the @see:checkedMemberPath property).
   *
   * @param index Item index.
   */
  toggleItemChecked(index: number) {
    this.setItemChecked(index, !this.getItemChecked(index));
  }

  /**
   * Gets or sets an array containing the items that are currently checked.
   */
  get checkedItems(): any[] {
    const arr = [];
    if (this._cv) {
      for (let i = 0; i < this._cv.items.length; i++) {
        if (this.getItemChecked(i)) {
          arr.push(this._cv.items[i]);
        }
      }
    }
    return arr;
  }

  set checkedItems(value: any[]) {
    const cv  = this._cv,
          arr = asArray(value, false);
    if (cv && arr) {
      const pos = cv.currentPosition;
      for (let i = 0; i < cv.items.length; i++) {
        const item = cv.items[i];
        this._setItemChecked(i, arr.indexOf(item) > -1, false);
      }
      cv.moveCurrentToPosition(pos);
      this.onCheckedItemsChanged();
    }
  }

  /**
   * Occurs when the value of the @see:selectedIndex property changes.
   */
  selectedIndexChanged = new EventEmitter();

  /**
   * Raises the @see:selectedIndexChanged event.
   */
  onSelectedIndexChanged(e?: EventArgs) {
    this.selectedIndexChanged.emit(e);
  }

  /**
   * Occurs when the list of items changes.
   */
  itemsChanged = new EventEmitter();

  /**
   * Raises the @see:itemsChanged event.
   */
  onItemsChanged(e?: EventArgs) {
    this.itemsChanged.emit(e);
  }

  /**
   * Occurs before the list items are generated.
   */
  loadingItems = new EventEmitter();

  /**
   * Raises the @see:loadingItems event.
   */
  onLoadingItems(e?: EventArgs) {
    this.loadingItems.emit(e);
  }

  /**
   * Occurs after the list items are generated.
   */
  loadedItems = new EventEmitter();

  /**
   * Raises the @see:loadedItems event.
   */
  onLoadedItems(e?: EventArgs) {
    this.loadedItems.emit(e);
  }

  /**
   * Occurs when the current item is checked or unchecked by the user.
   *
   * This event is raised when the @see:checkedMemberPath is set to the name of a
   * property to add checkboxes to each item in the control.
   *
   * Use the @see:selectedItem property to retrieve the item that was checked or
   * unchecked.
   */
  itemChecked = new EventEmitter();

  /**
   * Raises the @see:itemCheched event.
   */
  onItemChecked(e?: EventArgs) {
    this.itemChecked.emit(e);
  }

  /**
   * Occurs when the value of the @see:checkedItems property changes.
   */
  checkedItemsChanged = new EventEmitter();

  /**
   * Raises the @see:checkedItemsChanged event.
   */
  onCheckedItemsChanged(e?: EventArgs) {
    this.checkedItemsChanged.emit(e);
  }

  //#endregion

  //--------------------------------------------------------------------------
  //#region ** implementation

  // sets the checked state of an item on the list
  _setItemChecked(index: number, checked: boolean, notify = true) {

    // update data item
    const item = this._cv.items[index];
    if (isObject(item)) {
      const ecv = <IEditableCollectionView>tryCast(this._cv, 'IEditableCollectionView');
      if (item[this.checkedMemberPath] != checked) {
        this._checking = true;
        if (ecv) {
          ecv.editItem(item);
          item[this.checkedMemberPath] = checked;
          ecv.commitEdit();
        } else {
          item[this.checkedMemberPath] = checked;
          this._cv.refresh();
        }
        this._checking = false;
      }
    }

    // update checkbox value
    const cb = this._getCheckbox(index);
    if (cb && cb.checked != checked) {
      cb.checked = checked;
    }

    // fire events
    if (notify) {
      this.onItemChecked();
      this.onCheckedItemsChanged();
    }
  }

  // handle changes to the data source
  private _cvCollectionChanged(sender: any, e: NotifyCollectionChangedEventArgs) {
    if (!this._checking) {
      this.onItemsChanged();
    }
  }

  private _cvCurrentChanged(sender: any, e: EventArgs) {
    this.showSelection();
    this.onSelectedIndexChanged();
  }


  // click to select elements
  @HostListener('click', ['$event'])
  private _click(e: MouseEvent) {
    let host = this._elementRef.nativeElement

    // select the item that was clicked
    const children = host.children;
    for (let index = 0; index < children.length; index++) {
      if (contains(children[index], e.target)) {
        this.selectedIndex = index;
        break;
      }
    }

    // handle checkboxes
    if (this.checkedMemberPath && this.selectedIndex > -1) {
      const cb = this._getCheckbox(this.selectedIndex);
      if (cb == e.target) {
        this.setItemChecked(this.selectedIndex, cb.checked);
      }
    }
  }

  // handle keydown (cursor keys)
  @HostListener('keydown', ['$event'])
  private _keydown(e: KeyboardEvent) {

    // honor defaultPrevented
    if (e.defaultPrevented) return;

    // not interested in meta keys
    if (e.ctrlKey || e.shiftKey || e.altKey || e.metaKey) return;

    // handle the event
    var index    = this.selectedIndex,
        host     = this._elementRef.nativeElement,
        children = host.children;
    switch (e.keyCode) {
      case Key.Down:
        e.preventDefault();
        if (index < children.length - 1) {
          this.selectedIndex++;
        }
        break;
      case Key.Up:
        e.preventDefault();
        if (index > 0) {
          this.selectedIndex--;
        }
        break;
      case Key.Home:
        e.preventDefault();
        this.selectedIndex = 0;
        break;
      case Key.End:
        e.preventDefault();
        this.selectedIndex = children.length - 1;
        break;
      case Key.PageDown:
        e.preventDefault();
        if (this.selectedIndex > -1) {
          var index  = this.selectedIndex,
              height = host.offsetHeight,
              offset = 0;
          for (var i = index + 1; i < this._cv.items.length; i++) {
            var itemHeight = children[i].scrollHeight;
            if (offset + itemHeight > height) {
              this.selectedIndex = i;
              break;
            }
            offset += itemHeight;
          }
          if (this.selectedIndex == index) {
            this._cv.moveCurrentToLast();
          }
        }
        break;
      case Key.PageUp:
        e.preventDefault();
        if (this.selectedIndex > -1) {
          var index  = this.selectedIndex,
              height = host.offsetHeight,
              offset = 0;
          for (var i = index - 1; i > 0; i--) {
            var itemHeight = children[i].scrollHeight;
            if (offset + itemHeight > height) {
              this.selectedIndex = i;
              break;
            }
            offset += itemHeight;
          }
          if (this.selectedIndex == index) {
            this._cv.moveCurrentToFirst();
          }
        }
        break;
      case Key.Space:
        if (this.checkedMemberPath && this.selectedIndex > -1) {
          const cb = this._getCheckbox(this.selectedIndex);
          if (cb) {
            host.focus(); // take focus from the checkbox (FireFox, TFS 135857)
            this.setItemChecked(this.selectedIndex, !cb.checked);
            e.preventDefault();
          }
        }
        break;
    }
  }

  // handle keypress (select/search)
  @HostListener('keypress', ['$event'])
  private _keypress(e: KeyboardEvent) {
    let host = this._elementRef.nativeElement;

    // honor defaultPrevented
    if (e.defaultPrevented) return;

    // don't interfere with inner input elements (TFS 132081)
    if (e.target instanceof HTMLInputElement) return;

    // auto search
    if (e.charCode > 32 || (e.charCode == 32 && this._search)) {
      e.preventDefault();

      // update search string
      this._search += String.fromCharCode(e.charCode).toLowerCase();
      if (this._toSearch) {
        clearTimeout(this._toSearch);
      }
      this._toSearch = setTimeout(
        () => {
          this._toSearch = 0;
          this._search = '';
        }, 600
      );

      // perform search
      if (host) {
        const cnt = host.childElementCount;
        for (let off = this._search.length > 1 ? 0 : 1; off < cnt; off++) {
          const idx = (this.selectedIndex + off) % cnt,
                txt = this.getDisplayText(idx).trim().toLowerCase();
          if (txt.indexOf(this._search) == 0) {
            this.selectedIndex = idx;
            break;
          }
        }
      }
    }
  }

  // gets the checkbox element in a ListBox item
  private _getCheckbox(index: number) {
    let host = this._elementRef.nativeElement;

    if (!host) {
      return null;
    }
    const li = host.children[index];
    return <HTMLInputElement>li.querySelector('input[type=checkbox]');
  }

  //#endregion
}


class TurpleListBoxView{
  constructor(public index: number, public item:any, public checked: boolean, public selected: boolean){}
}
