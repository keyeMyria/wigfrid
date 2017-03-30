import { EventArgs } from "../eventArgs/EventArgs";
/**
 * Provides arguments for the @see:formatItem event.
 */
export declare class FormatItemEventArgs extends EventArgs {
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
    constructor(index: number, data: any, item: HTMLElement);
    /**
     * Gets the index of the data item in the list.
     */
    readonly index: number;
    /**
     * Gets the data item being formatted.
     */
    readonly data: any;
    /**
     * Gets a reference to the element that represents the list item to be formatted.
     */
    readonly item: HTMLElement;
}
