import { RowCol } from "./RowCol";
import { RowColFlags } from "../enum/RowColFlags";
import { RowCollection } from "./RowCollection";
import { Inject } from "@angular/core";
/**
 * Represents a row in the grid.
 */
export class Row extends RowCol {
    private _data: any;
    /*private*/
    _ubv: any; // unbound value storage
    /**
     * Initializes a new instance of a @see:Row.
     *
     * @param rowCollection
     * @param dataItem The data item that this row is bound to.
     */
    constructor(@Inject(RowCollection)
                    rowCollection: RowCollection,
                dataItem?: any) {
        super(rowCollection);
        this._f    = RowColFlags.ColumnDefault;
        this._data = dataItem;
    }

    /**
     * Gets or sets the item in the data collection that the item is bound to.
     */
    get dataItem(): any {
        return this._data;
    }

    set dataItem(value: any) {
        this._data = value;
    }

    /**
     * Gets or sets the height of the row.
     * Setting this property to null or negative values causes the element to use the
     * parent collection's default size.
     */
    get height(): number {
        return this.size;
    }

    set height(value: number) {
        this.size = value;
    }

    /**
     * Gets the render height of the row.
     *
     * The value returned takes into account the row's visibility, default size, and min and max sizes.
     */
    get renderHeight(): number {
        return this.renderSize;
    }
}
