import { ComboBox } from "../ComboBox/ComboBox";
import { EventArgs } from "../../eventArgs/EventArgs";
/**
 * The @see:AutoComplete control is an input control that allows callers
 * to customize the item list as the user types.
 *
 * The control is similar to the @see:ComboBox, except the item source is a
 * function (@see:itemsSourceFunction) rather than a static list. For example,
 * you can look up items on remote databases as the user types.
 *
 * The example below creates an @see:AutoComplete control and populates it using
 * a 'countries' array. The @see:AutoComplete searches for the country as the user
 * types, and narrows down the list of countries that match the current input.
 *
 * @fiddle:8HnLx
 */
export declare class AutoComplete extends ComboBox {
    private _itemsSourceFn;
    private _minLength;
    private _maxItems;
    private _itemCount;
    private _delay;
    private _cssMatch;
    private _toSearch;
    private _query;
    private _rxMatch;
    private _rxHighlight;
    private _handlingCallback;
    /**
     * Initializes a new instance of an @see:AutoComplete control.
     *
     * @param element The DOM element that hosts the control, or a selector for the host element (e.g. '#theCtrl').
     * @param options The JavaScript object containing initialization data for the control.
     */
    constructor(element: any, options?: any);
    /**
     * Gets or sets the minimum input length to trigger autocomplete suggestions.
     */
    minLength: number;
    /**
     * Gets or sets the maximum number of items to display in the drop-down list.
     */
    maxItems: number;
    /**
     * Gets or sets the delay, in milliseconds, between when a keystroke occurs
     * and when the search is performed.
     */
    delay: number;
    /**
     * Gets or sets a function that provides list items dynamically as the user types.
     *
     * The function takes three parameters:
     * <ul>
     *     <li>the query string typed by the user</li>
     *     <li>the maximum number of items to return</li>
     *     <li>the callback function to call when the results become available</li>
     * </ul>
     *
     * For example:
     * <pre>
     * autoComplete.itemsSourceFunction = function (query, max, callback) {
         *   // get results from the server
         *   var params = { query: query, max: max };
         *   $.getJSON('companycatalog.ashx', params, function (response) {
         *     // return results to the control
         *     callback(response);
         *   });
         * };
     * </pre>
     */
    itemsSourceFunction: (...args) => {};
    /**
     * Gets or sets the name of the css class used to highlight any parts
     * of the content that match the search terms.
     *
     * By default, this property is set to null, which causes the matching
     * terms to be shown in bold. You can set it to the name of a css class
     * to change the way the matches are displayed.
     *
     * The example below shows how you could use a specific css class called
     * 'match' to highlight the matches:
     *
     * <pre>
     * &lt;!-- css style for highlighting matches --&gt;
     * .match {
         *   background-color: yellow;
         *   color:black;
         * }
     * // assign css style to cssMatch property
     * autoComplete.cssMatch = 'match';
     * </pre>
     */
    cssMatch: string;
    _keydown(e: KeyboardEvent): void;
    _setText(text: string): void;
    _itemSourceFunctionCallback(result: any): void;
    onIsDroppedDownChanged(e?: EventArgs): void;
    _updateItems(): void;
    _filter(item: any): boolean;
    _defaultFormatter(index: number, text: string): string;
}
