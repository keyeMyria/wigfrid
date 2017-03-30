import { IColumnFilter } from "./IColumnFilter";
import { Column } from "../Grid/RowColumn/Column";
/**
 * Defines a value filter for a column on a @see:FlexGrid control.
 *
 * Value filters contain an explicit list of values that should be
 * displayed by the grid.
 */
export declare class ValueFilter implements IColumnFilter {
    private _col;
    private _bnd;
    private _values;
    private _filterText;
    private _maxValues;
    private _uniqueValues;
    /**
     * Initializes a new instance of a @see:ValueFilter.
     *
     * @param column The column to filter.
     */
    constructor(column: Column);
    /**
     * Gets or sets an object with all the formatted values that should be shown on the value list.
     */
    showValues: any;
    /**
     * Gets or sets a string used to filter the list of display values.
     */
    filterText: string;
    /**
     * Gets or sets the maximum number of elements on the list of display values.
     *
     * Adding too many items to the list makes searching difficult and hurts
     * performance. This property limits the number of items displayed at any time,
     * but users can still use the search box to filter the items they are
     * interested in.
     *
     * This property is set to 250 by default.
     */
    maxValues: number;
    /**
     * Gets or sets an array containing the unique values to be displayed on the list.
     *
     * If this property is set to null, the list will be filled based on the grid data.
     *
     * Explicitly assigning the list of unique values is more efficient than building
     * the list from the data, and is required for value filters to work properly when
     * the data is filtered on the server (because in this case some values might not
     * be present on the client so the list will be incomplete).
     *
     * For example, the code below provides a list of countries to be used in the
     * @see:ValueFilter for the column bound to the 'country' field:
     *
     * <pre>// create filter for a FlexGrid
     * var filter = new wijmo.grid.filter.FlexGridFilter(grid);
     * // assign list of unique values to country filter
     * var cf = filter.getColumnFilter('country');
     * cf.valueFilter.uniqueValues = countries;</pre>
     */
    uniqueValues: any[];
    /**
     * Gets the @see:Column to filter.
     */
    readonly column: Column;
    /**
     * Gets a value that indicates whether the filter is active.
     *
     * The filter is active if there is at least one value is selected.
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
