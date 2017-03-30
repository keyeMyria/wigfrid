import { Column } from "../Grid/RowColumn/Column";
import { FilterCondition } from "./FilterCondition";
import { IColumnFilter } from "./IColumnFilter";
/**
 * Defines a condition filter for a column on a @see:FlexGrid control.
 *
 * Condition filters contain two conditions that may be combined
 * using an 'and' or an 'or' operator.
 *
 * This class is used by the @see:FlexGridFilter class; you will
 * rarely use it directly.
 */
export declare class ConditionFilter implements IColumnFilter {
    private _col;
    private _bnd;
    private _c1;
    private _c2;
    private _and;
    /**
     * Initializes a new instance of a @see:ConditionFilter.
     *
     * @param column The column to filter.
     */
    constructor(column: Column);
    /**
     * Gets the first condition in the filter.
     */
    readonly condition1: FilterCondition;
    /**
     * Gets the second condition in the filter.
     */
    readonly condition2: FilterCondition;
    /**
     * Gets a value that indicates whether to combine the two conditions
     * with an AND or an OR operator.
     */
    and: boolean;
    /**
     * Gets the @see:Column to filter.
     */
    readonly column: Column;
    /**
     * Gets a value that indicates whether the filter is active.
     *
     * The filter is active if at least one of the two conditions
     * has its operator and value set to a valid combination.
     */
    readonly isActive: boolean;
    /**
     * Returns a value indicating whether a value passes this filter.
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
