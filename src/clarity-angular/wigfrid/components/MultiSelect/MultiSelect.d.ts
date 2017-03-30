import { ComboBox } from '../ComboBox/ComboBox';
import { EventArgs } from "../../eventArgs/EventArgs";
import { Event } from "../../event/Event";
/**
 * The @see:MultiSelect control allows users to select multiple items from
 * drop-down lists that contain custom objects or simple strings.
 *
 * The @see:MultiSelect control extends @see:ComboBox, with all the usual
 * properties, including @see:itemsSource and @see:displayMemberPath.
 *
 * Like the @see:ListBox control, it has a @see:checkedMemberPath property
 * that defines the name of the property that determines whether an item is
 * checked or not.
 *
 * The items currently checked (selected) can be obtained using the
 * @see:checkedItems property.</p>
 *
 * The control header is fully customizable. By default, it shows up to two items
 * selected and the item count after that. You can change the maximum number of
 * items to display (@see:maxHeaderItems), the message shown when no items are selected
 * (@see:placeholder), and the format string used to show the item count (@see:headerFormat).
 * Or you can provide a function to generate the header content based on whatever criteria
 * your application requires (@see:headerFormatter).
 */
export declare class MultiSelect extends ComboBox {
    _maxHdrItems: number;
    _hdrFmt: any;
    _hdrFormatter: Function;
    static _DEF_CHECKED_PATH: string;
    /**
     * Initializes a new instance of a @see:MultiSelect control.
     *
     * @param element The DOM element that hosts the control, or a selector for the host element (e.g. '#theCtrl').
     * @param options The JavaScript object containing initialization data for the control.
     */
    constructor(element: any, options?: any);
    /**
     * Gets or sets the name of the property used to control the checkboxes
     * placed next to each item.
     */
    checkedMemberPath: string;
    /**
     * Gets or sets the maximum number of items to display on the control header.
     *
     * If no items are selected, the header displays the text specified by the
     * @see:placeholder property.
     *
     * If the number of selected items is smaller than or equal to the value of the
     * @see:maxHeaderItems property, the selected items are shown in the header.
     *
     * If the number of selected items is greater than @see:maxHeaderItems, the
     * header displays the selected item count instead.
     */
    maxHeaderItems: number;
    /**
     * Gets or sets the format string used to create the header content
     * when the control has more than @see:maxHeaderItems items checked.
     *
     * The format string may contain the '{count}' replacement string
     * which gets replaced with the number of items currently checked.
     * The default value for this property in the English culture is
     * '{count:n0} items selected'.
     */
    headerFormat: string;
    /**
     * Gets or sets a function that gets the HTML in the control header.
     *
     * By default, the control header content is determined based on the
     * @see:placeholder, @see:maxHeaderItems, and on the current selection.
     *
     * You may customize the header content by specifying a function that
     * returns a custom string based on whatever criteria your application
     * requires.
     */
    headerFormatter: Function;
    /**
     * Gets or sets an array containing the items that are currently checked.
     */
    checkedItems: any[];
    /**
     * Occurs when the value of the @see:checkedItems property changes.
     */
    checkedItemsChanged: Event;
    /**
     * Raises the @see:checkedItemsChanged event.
     */
    onCheckedItemsChanged(e?: EventArgs): void;
    refresh(fullUpdate?: boolean): void;
    onIsDroppedDownChanged(e?: EventArgs): void;
    _updateHeader(): void;
    _setText(text: string, fullMatch: boolean): void;
}
