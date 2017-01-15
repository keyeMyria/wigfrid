import {BaseControl} from "../../../core/BaseControl";
import {ValueFilter} from "./ValueFilter";
import {asType} from "../../../util/asserts/asType";
import {culture} from "../../../globalization/Localization";
import {Component, AfterViewInit} from "@angular/core";
import {Inject} from "@angular/core";
import {ElementRef} from "@angular/core";


/**
 * The editor used to inspect and modify @see:ValueFilter objects.
 *
 * This class is used by the @see:FlexGridFilter class; you
 * rarely use it directly.
 */
@Component({
    template: `<div>
    <div wj-part="div-filter"></div> 
    <br/> 
    <label style="margin-left:11px"> 
    <input wj-part="cb-select-all" type="checkbox">  
    <span wj-part="sp-select-all"></span> 
    </label> 
    <br/> 
    <div wj-part="div-values" class="wj-dropdown" style="height:150px"></div> 
    </div>`
})
export class ValueFilterEditorDirective implements AfterViewInit {
    private _divFilter: HTMLElement;
    private _cmbFilter: input.ComboBox;
    private _cbSelectAll: HTMLInputElement;
    private _spSelectAll: HTMLElement;
    private _divValues: HTMLElement;
    private _lbValues: input.ListBox;

    private _filter: ValueFilter;
    private _toText: number;
    private _filterText: string;
    private _view: collections.CollectionView;

    /**
     * Initializes a new instance of the @see:ValueFilterEditor.
     *
     * @param elementRef The DOM element that hosts the control, or a selector
     * for the host element (e.g. '#theCtrl').
     * @param filter The @see:ValueFilter to edit.
     */
    constructor(@Inject(ElementRef) private elementRef: ElementRef,
                filter: ValueFilter) {
        super(elementRef);

        // save reference to filter
        this._filter = asType(filter, ValueFilter, false);

        // instantiate and apply template
        let tpl = this.getTemplate();
        this.applyTemplate('wj-control', this.elementRef.nativeElement, {
            _divFilter: 'div-filter',
            _cbSelectAll: 'cb-select-all',
            _spSelectAll: 'sp-select-all',
            _divValues: 'div-values'
        });

        // localization
        this._spSelectAll.textContent = culture.FlexGridFilter.selectAll;

        // create sorted/filtered collection view with the values
        const sortBinding = filter.column.dataMap ? 'text' : 'value';
        this._view = new collections.CollectionView();
        this._view.sortDescriptions.push(new collections.SortDescription(sortBinding, true));
        this._view.filter = this._filterValues.bind(this);
        this._view.collectionChanged.addHandler(this._updateSelectAllCheck, this);

        // create search combo and value list
        this._filterText = '';
        this._cmbFilter = new input.ComboBox(this._divFilter, {
            placeholder: culture.FlexGridFilter.search
        });
        this._lbValues = new input.ListBox(this._divValues, {
            displayMemberPath: 'text',
            checkedMemberPath: 'show',
            itemsSource: this._view,
            itemFormatter: function (index, item) {
                return item ? item : wijmo.culture.FlexGridFilter.null;
            }
        });

        // add event listeners
        this._cmbFilter.textChanged.addHandler(this._filterTextChanged, this);
        this._cbSelectAll.addEventListener('click', this._cbSelectAllClicked.bind(this));

        // initialize all values
        this.updateEditor();
    }

    ngAfterViewInit(){

    }

    /**
     * Gets a reference to the @see:ValueFilter being edited.
     */
    get filter(): ValueFilter {
        return this._filter;
    }
    /**
     * Updates editor with current filter settings.
     */
    updateEditor() {
        const col    = this._filter.column,
              values = [];

        // get list of unique values
        if (this._filter.uniqueValues) {  // explicit list provided
            const uvalues = this._filter.uniqueValues;
            for (var i = 0; i < uvalues.length; i++) {
                var value = uvalues[i];
                values.push({ value: value, text: value.toString()});
            }
        } else { // list not provided, get from data
            const keys = {},
                  src  = col.collectionView ? col.collectionView.sourceCollection : [];
            for (var i = 0; i < src.length; i++) {
                var value = col._binding.getValue(src[i]),
                    text = col.dataMap ? col.dataMap.getDisplayValue(value) : Globalize.format(value, col.format);
                if (!keys[text]) {
                    keys[text] = true;
                    values.push({ value: value, text: text });
                }
            }
        }

        // check the items that are currently selected
        let showValues = this._filter.showValues;
        if (!showValues || Object.keys(showValues).length == 0) {
            for (var i = 0; i < values.length; i++) {
                values[i].show = true;
            }
        } else {
            for (let key in showValues) {
                for (var i = 0; i < values.length; i++) {
                    if (values[i].text == key) {
                        values[i].show = true;
                        break;
                    }
                }
            }
        }

        // honor isContentHtml property
        this._lbValues.isContentHtml = col.isContentHtml;

        // load filter and apply immediately
        this._cmbFilter.text = this._filter.filterText;
        this._filterText = this._cmbFilter.text.toLowerCase();

        // show the values
        this._view.pageSize = this._filter.maxValues;
        this._view.sourceCollection = values;
        this._view.moveCurrentToPosition(-1);
    }
    /**
     * Clears the editor without applying changes to the filter.
     */
    clearEditor() {
        this._cmbFilter.text = '';
        this._filterText = '';
        this._view.refresh();
        const values = this._view.items;
        for (let i = 0; i < values.length; i++) {
            values[i].show = false;
        }
    }
    /**
     * Updates filter to reflect the current editor values.
     */
    updateFilter() {

        // build list of values to show
        const showValues = {},
              items      = this._view.items;
        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            if (item.show) {
                showValues[item.text] = true;
            }
        }

        // save to filter
        this._filter.showValues = showValues;
        this._filter.filterText = this._filterText;
    }

    // ** implementation

    // filter items on the list
    private _filterTextChanged() {
        if (this._toText) {
            clearTimeout(this._toText);
        }
        this._toText = setTimeout(() => {

            // apply the filter
            const filter = this._cmbFilter.text.toLowerCase();
            if (filter != this._filterText) { // TFS 128910
                this._filterText = filter;
                this._view.refresh();

                // select all items that pass the filter (Excel behavior)
                this._cbSelectAll.checked = true;
                this._cbSelectAllClicked();
            }
        }, 500);
    }

    // filter values for display
    private _filterValues(value) {
        if (this._filterText) {
            return value && value.text
                ? value.text.toLowerCase().indexOf(this._filterText) > -1
                : false;
        }
        return true;
    }

    // handle clicks on 'Select All' checkbox
    private _cbSelectAllClicked() {
        const checked = this._cbSelectAll.checked,
              values  = this._view.items;
        for (let i = 0; i < values.length; i++) {
            values[i].show = checked;
        }
        this._view.refresh();
    }

    // update state of 'Select All' checkbox when values are checked/unchecked
    private _updateSelectAllCheck() {

        // count checked items
        let checked  = 0;
        const values = this._view.items;
        for (let i = 0; i < values.length; i++) {
            if (values[i].show) checked++;
        }

        // update checkbox
        if (checked == 0) {
            this._cbSelectAll.checked = false;
            this._cbSelectAll.indeterminate = false;
        } else if (checked == values.length) {
            this._cbSelectAll.checked = true;
            this._cbSelectAll.indeterminate = false;
        } else {
            this._cbSelectAll.indeterminate = true;
        }

        // REVIEW: disable Apply button if nothing is selected
        //toggleClass(this._btnApply, 'wj-state-disabled', checked == 0);
        //this._btnApply.style.cursor = (checked == 0) ? 'default' : '';
    }
}
