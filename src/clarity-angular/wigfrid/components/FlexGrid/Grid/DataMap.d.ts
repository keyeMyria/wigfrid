import { ICollectionView } from "../../../interface/collections/ICollectionView";
import { EventEmitter } from "@angular/core";
/**
 * Represents a data map for use with the column's @see:dataMap property.
 *
 * Data maps provide the grid with automatic look up capabilities. For example,
 * you may want to display a customer name instead of his ID, or a color name
 * instead of its RGB value.
 *
 * The code below binds a grid to a collection of products,
 * then assigns a @see:DataMap to the grid's 'CategoryID' column so that the grid
 * displays the category names rather than the raw IDs.
 *
 * <pre>
 * // bind grid to products
 * var flex = new wijmo.grid.FlexGrid();
 * flex.itemsSource = products;
 * // map CategoryID column to show category name instead of ID
 * var col = flex.columns.getColumn('CategoryID');
 * col.dataMap = new wijmo.grid.DataMap(categories, 'CategoryID', 'CategoryName');
 * </pre>
 */
export declare class DataMap {
    _cv: ICollectionView;
    _keyPath: string;
    _displayPath: string;
    /**
     * Initializes a new instance of a @see:DataMap.
     *
     * @param itemsSource An array or @see:ICollectionView that contains the items to map.
     * @param selectedValuePath The name of the property that contains the keys (data values).
     * @param displayMemberPath The name of the property to use as the visual representation of the items.
     */
    constructor(itemsSource: any, selectedValuePath: string, displayMemberPath: string);
    /**
     * Gets the @see:ICollectionView object that contains the map data.
     */
    readonly collectionView: ICollectionView;
    /**
     * Gets the name of the property to use as a key for the item (data value).
     */
    readonly selectedValuePath: string;
    /**
     * Gets the name of the property to use as the visual representation of the item.
     */
    readonly displayMemberPath: string;
    /**
     * Gets the key that corresponds to a given display value.
     *
     * @param displayValue The display value of the item to retrieve.
     */
    getKeyValue(displayValue: string): any;
    /**
     * Gets the display value that corresponds to a given key.
     *
     * @param key The key of the item to retrieve.
     */
    getDisplayValue(key: any): any;
    /**
     * Gets an array with all of the display values on the map.
     */
    getDisplayValues(): string[];
    /**
     * Gets an array with all of the keys on the map.
     */
    getKeyValues(): string[];
    /**
     * Occurs when the map data changes.
     */
    mapChanged: EventEmitter<{}>;
    /**
     * Raises the @see:mapChanged event.
     */
    onMapChanged(): void;
    private _indexOf(value, path, caseSensitive);
}
