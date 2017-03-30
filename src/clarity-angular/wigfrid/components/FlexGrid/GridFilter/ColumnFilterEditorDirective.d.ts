import { ColumnFilter } from "./ColumnFilter";
import { EventArgs } from "../../../eventArgs/EventArgs";
import { Event } from "../../../event/Event";
import { ElementRef } from "@angular/core";
/**
 * The editor used to inspect and modify column filters.
 *
 * This class is used by the @see:FlexGridFilter class; you
 * rarely use it directly.
 */
export declare class ColumnFilterEditorDirective {
    private elementRef;
    private sortButtons;
    private _filter;
    private _edtVal;
    private _edtCnd;
    private _divSort;
    private _btnAsc;
    private _btnDsc;
    private _divType;
    private _aCnd;
    private _aVal;
    private _divEdtVal;
    private _divEdtCnd;
    private _btnApply;
    private _btnClear;
    /**
     * Initializes a new instance of the @see:ColumnFilterEditor.
     *
     * @param elementRef The DOM element that hosts the control, or a selector for the host element (e.g. '#theCtrl').
     * @param filter The @see:ColumnFilter to edit.
     * @param sortButtons Whether to show sort buttons in the editor.
     */
    constructor(elementRef: ElementRef, filter: ColumnFilter, sortButtons?: boolean);
    ngAfterViewInit(): void;
    /**
     * Gets a reference to the @see:ColumnFilter being edited.
     */
    readonly filter: ColumnFilter;
    /**
     * Updates editor with current filter settings.
     */
    updateEditor(): void;
    /**
     * Updates filter with current editor settings.
     */
    updateFilter(): void;
    /**
     * Occurs after the filter is modified.
     */
    filterChanged: Event;
    /**
     * Raises the @see:filterChanged event.
     */
    onFilterChanged(e?: EventArgs): void;
    /**
     * Occurs when one of the editor buttons is clicked.
     */
    buttonClicked: Event;
    /**
     * Raises the @see:buttonClicked event.
     */
    onButtonClicked(e?: EventArgs): void;
    private _showFilter(filterType);
    _enableLink(a: HTMLLinkElement, enable: boolean): void;
    private _getFilterType();
    private _btnClicked(e);
}
