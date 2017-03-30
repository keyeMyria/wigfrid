import { RowCol } from "./RowCol";
import { Aggregate } from "../../../../enum/Aggregate";
import { DataMap } from "../DataMap";
import { DataType, Binding } from "../../../../core/index";
import { ColumnCollection } from "./ColumnCollection";
/**
 * Represents a column on the grid.
 */
export declare class Column extends RowCol {
    private static _ctr;
    private _hdr;
    private _name;
    private _type;
    private _align;
    private _map;
    private _subscribedMap;
    private _fmt;
    private _agg;
    private _inpType;
    private _mask;
    private _required;
    private _showDropDown;
    _binding: Binding;
    _bindingSort: Binding;
    _szStar: string;
    _hash: string;
    /**
     * Initializes a new instance of a {@link Column}.
     *
     * @param columnCollection
     * @param options Initialization options for the column.
     */
    constructor(columnCollection: ColumnCollection);
    /**
     * Gets or sets the name of the column.
     *
     * The column name can be used to retrieve the column using the @see:getColumn method.
     */
    name: string;
    headerText: string;
    /**
     * Gets or sets the type of value stored in the column.
     *
     * Values are coerced into the proper type when editing the grid.
     */
    dataType: DataType;
    /**
     * Gets or sets whether values in the column are required.
     *
     * By default, this property is set to null, which means values
     * are required, but string columns may contain empty strings.
     *
     * When set to true, values are required and empty strings are
     * not allowed.
     *
     * When set to false, null values and empty strings are allowed.
     */
    required: boolean;
    /**
     * Gets or sets a value indicating whether the grid adds drop-down buttons to the
     * cells in this column.
     *
     * The drop-down buttons are shown only if the column has a @see:dataMap
     * set and is editable. Clicking on the drop-down buttons causes the grid
     * to show a list where users can select the value for the cell.
     *
     * Cell drop-downs require the wijmo.input module to be loaded.
     */
    showDropDown: boolean;
    /**
     * Gets or sets the "type" attribute of the HTML input element used to edit values
     * in this column.
     *
     * By default, this property is set to "tel" for numeric columns, and to "text" for
     * all other non-boolean column types. The "tel" input type causes mobile devices
     * to show a numeric keyboard that includes a negative sign and a decimal separator.
     *
     * Use this property to change the default setting if the default does not work well
     * for the current culture, device, or application. In these cases, try setting the
     * property to "number" or simply "text."
     */
    inputType: string;
    /**
     * Gets or sets a mask to use while editing values in this column.
     *
     * The mask format is the same used by the @see:wijmo.input.InputMask
     * control.
     *
     * If specified, the mask must be compatible with the value of
     * the @see:format property. For example, the mask '99/99/9999' can
     * be used for entering dates formatted as 'MM/dd/yyyy'.
     */
    mask: string;
    /**
     * Gets or sets the name of the property the column is bound to.
     */
    binding: string;
    /**
     * Gets or sets the name of the property to use when sorting this column.
     *
     * Use this property in cases where you want the sorting to be performed
     * based on values other than the ones speficied by the @see:binding property.
     *
     * Setting this property is null causes the grid to use the value of the
     * @see:binding property to sort the column.
     */
    sortMemberPath: string;
    /**
     * Gets or sets the width of the column.
     *
     * Column widths may be positive numbers (sets the column width in pixels),
     * null or negative numbers (uses the collection's default column width), or
     * strings in the format '{number}*' (star sizing).
     *
     * The star-sizing option performs a XAML-style dynamic sizing where column
     * widths are proportional to the number before the star. For example, if
     * a grid has three columns with widths "100", "*", and "3*", the first column
     * will be 100 pixels wide, the second will take up 1/4th of the remaining
     * space, and the last will take up the remaining 3/4ths of the remaining space.
     *
     * Star-sizing allows you to define columns that automatically stretch to fill
     * the width available. For example, set the width of the last column to "*"
     * and it will automatically extend to fill the entire grid width so there's
     * no empty space. You may also want to set the column's @see:minWidth property
     * to prevent the column from getting too narrow.
     */
    width: any;
    /**
     * Gets or sets the minimum width of the column.
     */
    minWidth: number;
    /**
     * Gets or sets the maximum width of the column.
     */
    maxWidth: number;
    /**
     * Gets the render width of the column.
     *
     * The value returned takes into account the column's visibility, default size, and min and max sizes.
     */
    readonly renderWidth: number;
    /**
     * Gets or sets the horizontal alignment of items in the column.
     *
     * The default value for this property is null, which causes the grid to select
     * the alignment automatically based on the column's @see:dataType (numbers are
     * right-aligned, Boolean values are centered, and other types are left-aligned).
     *
     * If you want to override the default alignment, set this property
     * to 'left,' 'right,' or 'center,'
     */
    align: string;
    /**
     * Gets the actual column alignment.
     *
     * Returns the value of the @see:align property if it is not null, or
     * selects the alignment based on the column's @see:dataType.
     */
    getAlignment(): string;
    /**
     * Gets or sets the text displayed in the column header.
     */
    header: string;
    /**
     * Gets or sets the @see:DataMap used to convert raw values into display
     * values for the column.
     *
     * Columns with an associated @see:dataMap show drop-down buttons that
     * can be used for quick editing. If you do not want to show the drop-down
     * buttons, set the column's @see:showDropDown property to false.
     *
     * Cell drop-downs require the wijmo.input module to be loaded.
     */
    dataMap: DataMap;
    /**
     * Gets or sets the format string used to convert raw values into display
     * values for the column (see @see:wijmo.Globalize).
     */
    format: string;
    /**
     * Gets or sets a value indicating whether the user can sort the column by clicking its header.
     */
    allowSorting: boolean;
    /**
     * Gets or sets the @see:Aggregate to display in the group header rows
     * for the column.
     */
    aggregate: Aggregate;
    private _getBindingSort();
    /**
     *
     * parses a string in the format '<number>*' and returns the number (or null if the parsing fails).
     * @param value
     * @returns {any}
     * @private
     * @deprecated
     */
    static _parseStarSize(value: any): number;
}
