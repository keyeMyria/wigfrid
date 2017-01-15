import {IColumnFilter} from "./IColumnFilter";
import {Column} from "../Grid/RowColumn/Column";
import {asString, Binding, asArray, Globalize, asNumber} from "../../../core/index";


/**
 * Defines a value filter for a column on a @see:FlexGrid control.
 *
 * Value filters contain an explicit list of values that should be
 * displayed by the grid.
 */
export class ValueFilter implements IColumnFilter {
    private _col: Column;
    private _bnd: Binding;
    private _values: any;
    private _filterText: string;
    private _maxValues = 250;
    private _uniqueValues: any[];

    /**
     * Initializes a new instance of a @see:ValueFilter.
     *
     * @param column The column to filter.
     */
    constructor(column: Column) {
        this._col = column;
        this._bnd = column.binding ? new Binding(column.binding) : null;
    }
    /**
     * Gets or sets an object with all the formatted values that should be shown on the value list.
     */
    get showValues(): any {
        return this._values;
    }
    set showValues(value: any) {
        this._values = value;
    }
    /**
     * Gets or sets a string used to filter the list of display values.
     */
    get filterText(): string {
        return this._filterText;
    }
    set filterText(value: string) {
        this._filterText = asString(value);
    }
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
    get maxValues(): number {
        return this._maxValues;
    }
    set maxValues(value: number) {
        this._maxValues = asNumber(value, false, true);
    }
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
    get uniqueValues(): any[] {
        return this._uniqueValues;
    }
    set uniqueValues(value: any[]) {
        this._uniqueValues = asArray(value);
    }

    // ** IColumnFilter

    /**
     * Gets the @see:Column to filter.
     */
    get column(): Column {
        return this._col;
    }
    /**
     * Gets a value that indicates whether the filter is active.
     *
     * The filter is active if there is at least one value is selected.
     */
    get isActive(): boolean {
        return this._values != null && Object.keys(this._values).length > 0;
    }
    /**
     * Gets a value that indicates whether a value passes the filter.
     *
     * @param value The value to test.
     */
    apply(value): boolean {
        const col = this.column;

        // no binding or no values? accept everything
        if (!this._bnd || !this._values || !Object.keys(this._values).length) {
            return true;
        }

        // retrieve the formatted value
        value = this._bnd.getValue(value);
        value = col.dataMap
            ? col.dataMap.getDisplayValue(value)
            : Globalize.format(value, col.format);

        // apply conditions
        return this._values[value] != undefined;
    }
    /**
     * Clears the filter.
     */
    clear() {
        this.showValues = null;
        this.filterText = null;
    }

    // ** IQueryInterface

    /**
     * Returns true if the caller queries for a supported interface.
     *
     * @param interfaceName Name of the interface to look for.
     */
    implementsInterface(interfaceName: string): boolean {
        return interfaceName == 'IColumnFilter';
    }
}
