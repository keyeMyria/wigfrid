import { IColumnFilter } from "./IColumnFilter";
import { FilterType } from "./FlexGridFilter";
import { ConditionFilter } from "./ConditionFilter";
import { ValueFilter } from "./ValueFilter";
import { Column } from "../Grid/RowColumn/Column";
import { FlexGridFilter } from "./FlexGridFilter";
/**
 * Defines a filter for a column on a @see:FlexGrid control.
 *
 * The @see:ColumnFilter contains a @see:ConditionFilter and a
 * @see:ValueFilter; only one of them may be active at a time.
 *
 * This class is used by the @see:FlexGridFilter class; you
 * rarely use it directly.
 */
export declare class ColumnFilter implements IColumnFilter {
    private _owner;
    private _col;
    private _valueFilter;
    private _conditionFilter;
    private _filterType;
    /**
     * Initializes a new instance of a @see:ColumnFilter.
     *
     * @param owner The @see:FlexGridFilter that owns this column filter.
     * @param column The @see:Column to filter.
     */
    constructor(owner: FlexGridFilter, column: Column);
    /**
     * Gets or sets the types of filtering provided by this filter.
     *
     * Setting this property to null causes the filter to use the value
     * defined by the owner filter's @see:defaultFilterType property.
     */
    filterType: FilterType;
    /**
     * Gets the @see:ValueFilter in this @see:ColumnFilter.
     */
    readonly valueFilter: ValueFilter;
    /**
     * Gets the @see:ConditionFilter in this @see:ColumnFilter.
     */
    readonly conditionFilter: ConditionFilter;
    /**
     * Gets the @see:Column being filtered.
     */
    readonly column: Column;
    /**
     * Gets a value that indicates whether the filter is active.
     */
    readonly isActive: boolean;
    /**
     * Gets a value that indicates whether a value passes the filter.
     *
     * @param value The value to test.
     */
    apply(value: any): boolean;
    /**
     * Clears the filter.
     */
    clear(): void;
    /**
     * Returns true if the caller queries for a supported interface.
     *
     * @param interfaceName Name of the interface to look for.
     */
    implementsInterface(interfaceName: string): boolean;
}
