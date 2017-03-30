import { BaseControl } from "../../../core/BaseControl";
import { ConditionFilter } from "./ConditionFilter";
import { ElementRef } from "@angular/core";
/**
 * The editor used to inspect and modify @see:ConditionFilter objects.
 *
 * This class is used by the @see:FlexGridFilter class; you
 * rarely use it directly.
 */
export declare class ConditionFilterEditorDirective extends BaseControl {
    private elementRef;
    private _filter;
    private _cmb1;
    private _val1;
    private _cmb2;
    private _val2;
    private _divHdr;
    private _divCmb1;
    private _divVal1;
    private _divCmb2;
    private _divVal2;
    private _spAnd;
    private _spOr;
    private _btnAnd;
    private _btnOr;
    /**
     * Initializes a new instance of a @see:ConditionFilterEditor.
     *
     * @param elementRef The DOM element that hosts the control, or a selector
     *        for the host element (e.g. '#theCtrl').
     * @param filter The @see:ConditionFilter to edit.
     */
    constructor(elementRef: ElementRef, filter: ConditionFilter);
    ngAfterViewInit(): void;
    /**
     * Gets a reference to the @see:ConditionFilter being edited.
     */
    readonly filter: ConditionFilter;
    /**
     * Updates editor with current filter settings.
     */
    updateEditor(): void;
    /**
     * Clears the editor without applying changes to the filter.
     */
    clearEditor(): void;
    /**
     * Updates filter to reflect the current editor values.
     */
    updateFilter(): void;
    private _createOperatorCombo(element);
    private _createValueInput(element);
    private _isTimeFormat(fmt);
    private _btnAndOrChanged(e);
}
