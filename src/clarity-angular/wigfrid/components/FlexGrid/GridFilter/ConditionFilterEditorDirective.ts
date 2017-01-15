import {BaseControl} from "../../../core/BaseControl";
import {ConditionFilter} from "./ConditionFilter";
import {asType} from "../../../util/asserts/asType";
import {Component} from "@angular/core";
import {ElementRef} from "@angular/core";
import {Inject} from "@angular/core";
import {ViewChild} from "@angular/core";
import {culture} from "../../../globalization/Localization";
import {DataType} from "../../../enum/DataType";
import {changeType} from "../../../core/index";


/**
 * The editor used to inspect and modify @see:ConditionFilter objects.
 *
 * This class is used by the @see:FlexGridFilter class; you
 * rarely use it directly.
 */
@Component({
    template:
      `<div>
        <div wj-part="div-hdr"></div>
        <div wj-part="div-cmb1"></div><br/>
        <div wj-part="div-val1"></div><br/>
        <div style="text-align:center">
            <label><input wj-part="btn-and" type="radio"> <span wj-part="sp-and"></span> </label>
            &nbsp;&nbsp;&nbsp;
            <label><input wj-part="btn-or" type="radio"> <span wj-part="sp-or"></span> </label>
        </div>
        <div wj-part="div-cmb2"></div><br/>
        <div wj-part="div-val2"></div><br/>
      </div>`,
})
export class ConditionFilterEditorDirective extends BaseControl {
    private  _filter: ConditionFilter;
    private _cmb1: input.ComboBox;
    private _val1: any;
    private _cmb2: input.ComboBox;
    private _val2: any;

    @ViewChild('[wj-part="div-hdr"]')
    private _divHdr: HTMLElement;
    @ViewChild('[wj-part="div-cmb1"]')
    private _divCmb1: HTMLElement;
    @ViewChild('[wj-part="div-val1"]')
    private _divVal1: HTMLElement;
    @ViewChild('[wj-part="div-cmb2"]')
    private _divCmb2: HTMLElement;
    @ViewChild('[wj-part="div-val2"]')
    private _divVal2: HTMLElement;
    @ViewChild('[wj-part="sp-and"]')
    private _spAnd: HTMLSpanElement;
    @ViewChild('[wj-part="sp-or"]')
    private _spOr: HTMLSpanElement;
    @ViewChild('[wj-part="btn-and"]')
    private _btnAnd: HTMLInputElement;
    @ViewChild('[wj-part="btn-or"]')
    private _btnOr: HTMLInputElement;

    /**
     * Initializes a new instance of a @see:ConditionFilterEditor.
     *
     * @param elementRef The DOM element that hosts the control, or a selector
     *        for the host element (e.g. '#theCtrl').
     * @param filter The @see:ConditionFilter to edit.
     */
    constructor(@Inject(ElementRef) private elementRef: ElementRef,
                filter: ConditionFilter
    ) {
        super(elementRef);

        // save reference to filter
        this._filter = asType(filter, ConditionFilter, false);


    }

    ngAfterViewInit() {
        // instantiate and apply template
        let tpl = this.getTemplate();
        this.applyTemplate('wj-control', this.elementRef.nativeElement, {
            //todo ###remove me###
            //_divHdr: 'div-hdr',
            //_divCmb1: 'div-cmb1',
            //_divVal1: 'div-val1',
            //_btnAnd: 'btn-and',
            //_btnOr: 'btn-or',
            //_spAnd: 'sp-and',
            //_spOr: 'sp-or',
            //_divCmb2: 'div-cmb2',
            //_divVal2: 'div-val2',
        });

        // localization
        this._divHdr.textContent = culture.FlexGridFilter.header;
        this._spAnd.textContent = culture.FlexGridFilter.and;
        this._spOr.textContent = culture.FlexGridFilter.or;

        // create combos and value editors
        this._cmb1 = this._createOperatorCombo(this._divCmb1);
        this._cmb2 = this._createOperatorCombo(this._divCmb2);
        this._val1 = this._createValueInput(this._divVal1);
        this._val2 = this._createValueInput(this._divVal2);

        // add event listeners
        const andOr = this._btnAndOrChanged.bind(this);
        this._btnAnd.addEventListener('change', andOr);
        this._btnOr.addEventListener('change', andOr);

        // initialize all values
        this.updateEditor();
    }

    /**
     * Gets a reference to the @see:ConditionFilter being edited.
     */
    get filter(): ConditionFilter {
        return this._filter;
    }
    /**
     * Updates editor with current filter settings.
     */
    updateEditor() {

        // initialize conditions
        const c1                 = this._filter.condition1,
              c2                 = this._filter.condition2;
        this._cmb1.selectedValue = c1.operator;
        this._cmb2.selectedValue = c2.operator;
        if (this._val1 instanceof input.ComboBox) {
            this._val1.text = changeType(c1.value, DataType.String, null);
            this._val2.text = changeType(c2.value, DataType.String, null);
        } else {
            this._val1.value = c1.value;
            this._val2.value = c2.value;
        }

        // initialize and/or buttons
        this._btnAnd.checked = this._filter.and;
        this._btnOr.checked = !this._filter.and;
    }
    /**
     * Clears the editor without applying changes to the filter.
     */
    clearEditor() {
        this._cmb1.selectedValue = this._cmb2.selectedValue = null;
        this._val1.text = this._val2.text = null;
        this._btnAnd.checked = true;
        this._btnOr.checked = false;
    }
    /**
     * Updates filter to reflect the current editor values.
     */
    updateFilter() {

        // initialize conditions
        const col   = this._filter.column,
              c1    = this._filter.condition1,
              c2    = this._filter.condition2;
        c1.operator = this._cmb1.selectedValue;
        c2.operator = this._cmb2.selectedValue;
        if (this._val1 instanceof input.ComboBox) {
            // store condition values to the types specified by the column, except for
            // time values, which are dates but must be stored as strings (TFS 123969)
            const dt = col.dataType == DataType.Date ? DataType.String : col.dataType;
            c1.value = changeType(this._val1.text, dt, col.format);
            c2.value = changeType(this._val2.text, dt, col.format);
        } else {
            c1.value = this._val1.value;
            c2.value = this._val2.value;
        }

        // initialize and/or operator
        this._filter.and = this._btnAnd.checked;
    }

    // ** implementation

    // create operator combo
    private _createOperatorCombo(element) {

        // get operator list based on column data type
        const col = this._filter.column;
        let list  = culture.FlexGridFilter.stringOperators;
        if (col.dataType == DataType.Date && !this._isTimeFormat(col.format)) {
            list = culture.FlexGridFilter.dateOperators;
        } else if (col.dataType == DataType.Number && !col.dataMap) {
            list = culture.FlexGridFilter.numberOperators;
        } else if (col.dataType == DataType.Boolean && !col.dataMap) {
            list = culture.FlexGridFilter.booleanOperators;
        }

        // create and initialize the combo
        const cmb = new input.ComboBox(element);
        cmb.itemsSource = list;
        cmb.displayMemberPath = 'name';
        cmb.selectedValuePath = 'op';

        // return combo
        return cmb;
    }

    // create operator input
    private _createValueInput(element): BaseControl {
        const col = this._filter.column;
        let ctl   = null;
        if (col.dataType == DataType.Date && !this._isTimeFormat(col.format)) {
            ctl = new input.InputDate(element);
            ctl.format = col.format;
        } else if (col.dataType == DataType.Number && !col.dataMap) {
            ctl = new input.InputNumber(element);
            ctl.format = col.format;
        } else {
            ctl = new input.ComboBox(element);
            if (col.dataMap) {
                ctl.itemsSource = col.dataMap.getDisplayValues();
                ctl.isEditable = true;
            } else if (col.dataType == DataType.Boolean) {
                ctl.itemsSource = [true, false];
            }
        }
        ctl.required = false;
        return ctl;
    }

    // checks whether a format represents a time (and not just a date)
    private _isTimeFormat(fmt: string): boolean {
        if (!fmt) return false;
        fmt = culture.Globalize.calendar.patterns[fmt] || fmt;
        return /[Hmst]+/.test(fmt); // TFS 109409
    }

    // update and/or buttons
    private _btnAndOrChanged(e) {
        this._btnAnd.checked = e.target == this._btnAnd;
        this._btnOr.checked = e.target == this._btnOr;
    }
}
