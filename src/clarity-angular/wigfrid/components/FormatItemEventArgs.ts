import {asNumber, asType} from "../core/index";
import {EventArgs} from "../eventArgs/EventArgs";

/**
 * Provides arguments for the @see:formatItem event.
 */
export class FormatItemEventArgs extends EventArgs {
	_index: number;
	_data: any;
	_item: HTMLElement;

	/**
	 * Initializes a new instance of a @see:FormatItemEventArgs.
	 *
	 * @param index Index of the item being formatted.
	 * @param data Data item being formatted.
	 * @param item Element that represents the list item to be formatted.
	 */
	constructor(index: number, data: any, item: HTMLElement) {
		super();
		this._index = asNumber(index);
		this._data = data;
		this._item = asType(item, HTMLElement);
	}
	/**
	 * Gets the index of the data item in the list.
	 */
	get index():  number {
		return this._index;
	}
	/**
	 * Gets the data item being formatted.
	 */
	get data(): any {
		return this._data;
	}
	/**
	 * Gets a reference to the element that represents the list item to be formatted.
	 */
	get item(): HTMLElement {
		return this._item;
	}
}
