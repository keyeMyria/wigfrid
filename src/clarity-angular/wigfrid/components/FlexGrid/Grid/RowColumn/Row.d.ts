import { RowCol } from "./RowCol";
import { RowCollection } from "./RowCollection";
/**
 * Represents a row in the grid.
 */
export declare class Row extends RowCol {
    private _data;
    _ubv: any;
    /**
     * Initializes a new instance of a @see:Row.
     *
     * @param rowCollection
     * @param dataItem The data item that this row is bound to.
     */
    constructor(rowCollection: RowCollection, dataItem?: any);
    /**
     * Gets or sets the item in the data collection that the item is bound to.
     */
    dataItem: any;
    /**
     * Gets or sets the height of the row.
     * Setting this property to null or negative values causes the element to use the
     * parent collection's default size.
     */
    height: number;
    /**
     * Gets the render height of the row.
     *
     * The value returned takes into account the row's visibility, default size, and min and max sizes.
     */
    readonly renderHeight: number;
}
