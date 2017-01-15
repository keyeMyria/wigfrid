//import {ICollectionView} from "../interface/collections/ICollectionView";
//import {isArray} from "../util/isArray";
//import {asCollectionView} from "../util/asserts/asCollectionView";
//import {asString} from "../util/asserts/asString";
//import {Event} from ".././../event/Event"
import {ICollectionView} from "../../../interface/collections/ICollectionView";
import {asString, asCollectionView, isArray} from "../../../core/index";
import {EventEmitter} from "@angular/core";


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
export class DataMap {
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
	constructor(itemsSource: any, selectedValuePath: string, displayMemberPath: string) {

		// turn arrays into real maps
		if (isArray(itemsSource) && !selectedValuePath && !displayMemberPath) {
			const arr = [];
			for (let i = 0; i < itemsSource.length; i++) {
				arr.push({ value: itemsSource[i] });
			}
			itemsSource = arr;
			selectedValuePath = 'value';
			displayMemberPath = 'value';
		}

		// initialize map
		this._cv = asCollectionView(itemsSource);
		this._keyPath = asString(selectedValuePath, false);
		this._displayPath = asString(displayMemberPath, false);

		// notify listeners when the map changes
		this._cv.collectionChanged.subscribe(this.onMapChanged.bind(this));
	}
	/**
	 * Gets the @see:ICollectionView object that contains the map data.
	 */
	get collectionView(): ICollectionView {
		return this._cv;
	}
	/**
	 * Gets the name of the property to use as a key for the item (data value).
	 */
	get selectedValuePath(): string {
		return this._keyPath;
	}
	/**
	 * Gets the name of the property to use as the visual representation of the item.
	 */
	get displayMemberPath(): string {
		return this._displayPath;
	}
	/**
	 * Gets the key that corresponds to a given display value.
	 *
	 * @param displayValue The display value of the item to retrieve.
	 */
	getKeyValue(displayValue: string): any {
		const index = this._indexOf(displayValue, this._displayPath, false);
		return index > -1 ? this._cv.sourceCollection[index][this._keyPath] : null;//displayValue;
	}
	/**
	 * Gets the display value that corresponds to a given key.
	 *
	 * @param key The key of the item to retrieve.
	 */
	getDisplayValue(key: any): any {
		const index = this._indexOf(key, this._keyPath, true);
		return index > -1 ? this._cv.sourceCollection[index][this._displayPath]: key;
	}
	/**
	 * Gets an array with all of the display values on the map.
	 */
	getDisplayValues(): string[]{
		const values = [];
		if (this._cv && this._displayPath) {
			const items = this._cv.sourceCollection;
			for (let i = 0; i < items.length; i++) {
				values.push(items[i][this._displayPath]);
			}
		}
		return values;
	}
	/**
	 * Gets an array with all of the keys on the map.
	 */
	getKeyValues(): string[] {
		const values = [];
		if (this._cv && this._keyPath) {
			const items = this._cv.sourceCollection;
			for (let i = 0; i < items.length; i++) {
				values.push(items[i][this._keyPath]);
			}
		}
		return values;
	}
	/**
	 * Occurs when the map data changes.
	 */
	mapChanged = new EventEmitter();
	/**
	 * Raises the @see:mapChanged event.
	 */
	onMapChanged() {
		this.mapChanged.emit(null);
	}

	// implementation

	private _indexOf(value: any, path: string, caseSensitive: boolean) {
		if (this._cv && path) {
			if (!caseSensitive) {
				value = value.toString().toLowerCase();
			}
			const items = this._cv.sourceCollection;
			for (let i = 0; i < items.length; i++) {
				const item = items[i][path];
				if (item == value) {
					return i;
				}
				if (!caseSensitive && item.length == value.length && item.toLowerCase() == value) {
					return i;
				}
			}
		}
		return -1;
	}
}
