import { ValueFilter } from "./ValueFilter";
import { AfterViewInit } from "@angular/core";
import { ElementRef } from "@angular/core";
/**
 * The editor used to inspect and modify @see:ValueFilter objects.
 *
 * This class is used by the @see:FlexGridFilter class; you
 * rarely use it directly.
 */
export declare class ValueFilterEditorDirective implements AfterViewInit {
    private elementRef;
    private _divFilter;
    private _cmbFilter;
    private _cbSelectAll;
    private _spSelectAll;
    private _divValues;
    private _lbValues;
    private _filter;
    private _toText;
    private _filterText;
    private _view;
    /**
     * Initializes a new instance of the @see:ValueFilterEditor.
     *
     * @param elementRef The DOM element that hosts the control, or a selector
     * for the host element (e.g. '#theCtrl').
     * @param filter The @see:ValueFilter to edit.
     */
    constructor(elementRef: ElementRef, filter: ValueFilter);
    ngAfterViewInit(): void;
    /**
     * Gets a reference to the @see:ValueFilter being edited.
     */
    readonly filter: ValueFilter;
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
    private _filterTextChanged();
    private _filterValues(value);
    private _cbSelectAllClicked();
    private _updateSelectAllCheck();
}
