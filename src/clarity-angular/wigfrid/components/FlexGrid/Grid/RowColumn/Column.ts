import {RowCol} from "./RowCol";
import {Aggregate} from "../../../../enum/Aggregate";
import {DataMap} from "../DataMap";
import {
    DataType,
    Binding,
    asEnum,
    asBoolean,
    asString,
    getType,
    asNumber,
    isArray,
    asType,
    isString
} from "../../../../core/index";
import {RowColFlags} from "../enum/RowColFlags";
import {Subscription} from "rxjs/Subscription";
import {Input} from "@angular/core";
import {ColumnCollection} from "./ColumnCollection";
/**
 * Represents a column on the grid.
 */
export class Column extends RowCol {
    private static _ctr = 0;
    private _hdr: string;
    private _name: string;
    private _type: DataType;
    private _align: string;
    private _map: DataMap;
    private _subscribedMap: Subscription;
    private _fmt: string;
    private _agg: Aggregate;
    private _inpType: string;
    private _mask: string;
    private _required: boolean;
    private _showDropDown: boolean;
    /*private*/
    _binding: Binding;
    /*private*/
    _bindingSort: Binding;
    /*private*/
    _szStar: string;
    /*private*/
    _hash: string; // unique column id
    /**
     * Initializes a new instance of a {@link Column}.
     *
     * @param columnCollection
     * @param options Initialization options for the column.
     */
    constructor(columnCollection: ColumnCollection) {
        super(columnCollection);
        this._f    = RowColFlags.ColumnDefault;
        this._hash = Column._ctr.toString(36); // unique column key (used for unbound rows)
        Column._ctr++;
    }

    /**
     * Gets or sets the name of the column.
     *
     * The column name can be used to retrieve the column using the @see:getColumn method.
     */
    @Input()
    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    @Input()
    get headerText(): string {
        return this._name;
    }

    set headerText(value: string) {
        this._name = value;
    }

    /**
     * Gets or sets the type of value stored in the column.
     *
     * Values are coerced into the proper type when editing the grid.
     */
    get dataType(): DataType {
        return this._type;
    }

    set dataType(value: DataType) {
        if (this._type != value) {
            this._type = asEnum(value, DataType);
            if (this.grid) {
                this.grid.invalidate();
            }
        }
    }

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
    get required(): boolean {
        return this._required;
    }

    set required(value: boolean) {
        this._required = asBoolean(value, true);
    }

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
    get showDropDown(): boolean {
        return this._showDropDown;
    }

    set showDropDown(value: boolean) {
        if (value != this._showDropDown) {
            this._showDropDown = asBoolean(value, true);
            if (this.grid) {
                this.grid.invalidate();
            }
        }
    }

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
    get inputType(): string {
        return this._inpType;
    }

    set inputType(value: string) {
        this._inpType = asString(value, true);
    }

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
    get mask(): string {
        return this._mask;
    }

    set mask(value: string) {
        this._mask = asString(value, true);
    }

    /**
     * Gets or sets the name of the property the column is bound to.
     */
    @Input()
    get binding(): string {
        return this._binding ? this._binding.path : null;
    }

    set binding(value: string) {
        if (value != this.binding) {
            const path    = asString(value);
            this._binding = path ? new Binding(path) : null;
            if (!this._type && this.grid && this._binding) {
                const cv = this.grid.collectionView;
                if (cv && cv.sourceCollection && cv.sourceCollection.length) {
                    const item = cv.sourceCollection[0];
                    this._type = getType(this._binding.getValue(item));
                }
            }
            this.onPropertyChanged();
        }
    }

    /**
     * Gets or sets the name of the property to use when sorting this column.
     *
     * Use this property in cases where you want the sorting to be performed
     * based on values other than the ones speficied by the @see:binding property.
     *
     * Setting this property is null causes the grid to use the value of the
     * @see:binding property to sort the column.
     */
    get sortMemberPath(): string {
        return this._bindingSort ? this._bindingSort.path : null;
    }

    set sortMemberPath(value: string) {
        if (value != this.sortMemberPath) {
            const path        = asString(value);
            this._bindingSort = path ? new Binding(path) : null;
            this.onPropertyChanged();
        }
    }

    //region width
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
    get width(): any {
        if (this._szStar != null) {
            return this._szStar;
        } else {
            return this.size;
        }
    }

    set width(value: any) {
        if (Column._parseStarSize(value) != null) {
            this._szStar = value;
            this.onPropertyChanged();
        } else {
            this._szStar = null;
            this.size    = asNumber(value, true);
        }
    }

    /**
     * Gets or sets the minimum width of the column.
     */
    get minWidth(): number {
        return this._szMin;
    }

    set minWidth(value: number) {
        if (value != this._szMin) {
            this._szMin = asNumber(value, true, true);
            this.onPropertyChanged();
        }
    }

    /**
     * Gets or sets the maximum width of the column.
     */
    get maxWidth(): number {
        return this._szMax;
    }

    set maxWidth(value: number) {
        if (value != this._szMax) {
            this._szMax = asNumber(value, true, true);
            this.onPropertyChanged();
        }
    }

    /**
     * Gets the render width of the column.
     *
     * The value returned takes into account the column's visibility, default size, and min and max sizes.
     */
    get renderWidth(): number {
        return this.renderSize;
    }

    //endregion
    //region header and align
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
    get align(): string {
        return this._align;
    }

    set align(value: string) {
        if (this._align != value) {
            this._align = value;
            this.onPropertyChanged();
        }
    }

    /**
     * Gets the actual column alignment.
     *
     * Returns the value of the @see:align property if it is not null, or
     * selects the alignment based on the column's @see:dataType.
     */
    getAlignment(): string {
        let value = this._align;
        if (value == null) {
            value = '';
            if (!this._map) {
                switch (this._type) {
                    case DataType.Boolean:
                        value = 'center';
                        break;
                    case DataType.Number:
                        value = 'right';
                        break;
                }
            }
        }
        return value;
    }

    /**
     * Gets or sets the text displayed in the column header.
     */
    get header(): string {
        return this._hdr ? this._hdr : this.binding;
    }

    set header(value: string) {
        if (this._hdr != value) {
            this._hdr = value;
            this.onPropertyChanged();
        }
    }

    //endregion
    //region dataMap dataFormat
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
    get dataMap(): DataMap {
        return this._map;
    }

    set dataMap(value: DataMap) {
        if (this._map != value) {

            // disconnect old map
            if (this._map) {
                //todo ###remove me###
                //this._map.mapChanged.removeHandler(this.onPropertyChanged, this);
                this._subscribedMap.unsubscribe();
            }
            // convert arrays into DataMaps
            if (isArray(value)) {
                value = new DataMap(value, null, null);
            }
            // set new map
            this._map = asType(value, DataMap, true);
            // connect new map
            if (this._map) {
                this._subscribedMap = this._map.mapChanged.subscribe(this.onPropertyChanged);
            }
            this.onPropertyChanged();
        }
    }

    /**
     * Gets or sets the format string used to convert raw values into display
     * values for the column (see @see:wijmo.Globalize).
     */
    get format(): string {
        return this._fmt;
    }

    set format(value: string) {
        if (this._fmt != value) {
            this._fmt = value;
            this.onPropertyChanged();
        }
    }

    //endregion
    //region sort
    /**
     * Gets or sets a value indicating whether the user can sort the column by clicking its header.
     */
    get allowSorting(): boolean {
        return this._getFlag(RowColFlags.AllowSorting);
    }

    set allowSorting(value: boolean) {
        this._setFlag(RowColFlags.AllowSorting, value);
    }

    /**
     * Gets a string that describes the current sorting applied to the column.
     * Possible values are '+' for ascending order, '-' for descending order, or
     * null for unsorted columns.
     * @deprecated
     */
    // get currentSort(): string {
    //     if (this.grid && this.grid.collectionView && this.grid.collectionView.canSort) {
    //         var sds = this.grid.collectionView.sortDescriptions;
    //         for (var i = 0; i < sds.length; i++) {
    //             if (sds[i].property == this._getBindingSort()) {
    //                 return sds[i].ascending ? '+' : '-';
    //             }
    //         }
    //     }
    //     return null;
    // }
    //endregion
    /**
     * Gets or sets the @see:Aggregate to display in the group header rows
     * for the column.
     */
    get aggregate(): Aggregate {
        return this._agg != null ? this._agg : Aggregate.None;
    }

    set aggregate(value: Aggregate) {
        if (value != this._agg) {
            this._agg = asEnum(value, Aggregate);
            this.onPropertyChanged();
        }
    }

    // gets the binding used for sorting (sortMemberPath if specified, binding ow)
    private _getBindingSort(): string {
        return this.sortMemberPath ? this.sortMemberPath :
            this.binding ? this.binding :
                null;
    }

    /**
     *
     * parses a string in the format '<number>*' and returns the number (or null if the parsing fails).
     * @param value
     * @returns {any}
     * @private
     * @deprecated
     */
    static _parseStarSize(value: any) {
        if (isString(value) && value.length > 0 && value[value.length - 1] == '*') {
            const sz = value.length == 1 ? 1 : 1 * value.substr(0, value.length - 1);
            if (sz > 0 && !isNaN(sz)) {
                return sz;
            }
        }
        return null;
    }
}
