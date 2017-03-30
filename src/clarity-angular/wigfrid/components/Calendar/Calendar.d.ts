import { Control } from '../../core/Control';
import { FormatItemEventArgs } from "../FormatItemEventArgs";
import { EventArgs } from "../../eventArgs/EventArgs";
import { Event } from "../../event/Event";
/**
 * The @see:Calendar control displays a one-month calendar and allows users
 * to select a date.
 *
 * You may use the @see:min and @see:max properties to restrict the range
 * of dates that the user can select.
 *
 * Use the @see:value property to get or set the currently selected date.
 *
 * The example below shows a <b>Date</b> value with date and time information
 * using an @see:InputDate and an @see:InputTime control. Notice how both controls
 * are bound to the same controller variable, and each edits the appropriate information
 * (either date or time). The example also shows a @see:Calendar control that allows
 * users to select the date with a single click.
 *
 * @fiddle:vgc3Y
 */
export declare class Calendar extends Control {
    private _tblHdr;
    private _tblMonth;
    private _tblYear;
    private _tdMonth;
    private _spMonth;
    private _btnPrev;
    private _btnToday;
    private _btnNext;
    private _value;
    private _currMonth;
    private _firstDay;
    private _min;
    private _max;
    private _fdw;
    private _itemFormatter;
    private _itemValidator;
    /**
     * Gets or sets the template used to instantiate @see:Calendar controls.
     */
    static controlTemplate: string;
    /**
     * Initializes a new instance of a @see:Calendar.
     *
     * @param element The DOM element that hosts the control, or a selector for the host element (e.g. '#theCtrl').
     * @param options The JavaScript object containing initialization data for the control.
     */
    constructor(element: any, options?: any);
    /**
     * Gets or sets the currently selected date.
     */
    value: Date;
    /**
     * Gets or sets the earliest date that the user can select in the calendar.
     */
    min: Date;
    /**
     * Gets or sets the latest date that the user can select in the calendar.
     */
    max: Date;
    /**
     * Gets or sets a value that represents the first day of the week,
     * the one displayed in the first column of the calendar.
     *
     * Setting this property to null causes the calendar to use the default
     * for the current culture. In the English culture, the first day of the
     * week is Sunday (0); in most European cultures, the first day of the
     * week is Monday (1).
     */
    firstDayOfWeek: number;
    /**
     * Gets or sets the month displayed in the calendar.
     */
    displayMonth: Date;
    /**
     * Gets or sets a value indicating whether the control displays the header
     * area with the current month and navigation buttons.
     */
    showHeader: boolean;
    /**
     * Gets or sets a value indicating whether the calendar displays a month or a year.
     */
    monthView: boolean;
    /**
     * Gets or sets a formatter function to customize dates in the calendar.
     *
     * The formatter function can add any content to any date. It allows
     * complete customization of the appearance and behavior of the calendar.
     *
     * If specified, the function takes two parameters:
     * <ul>
     *     <li>the date being formatted </li>
     *     <li>the HTML element that represents the date</li>
     * </ul>
     *
     * For example, the code below shows weekends with a yellow background:
     * <pre>
     * calendar.itemFormatter = function(date, element) {
         *   var day = date.getDay();
         *   element.style.backgroundColor = day == 0 || day == 6 ? 'yellow' : '';
         * }
     * </pre>
     */
    itemFormatter: Function;
    /**
     * Gets or sets a validator function to determine whether dates are valid for selection.
     *
     * If specified, the validator function should take one parameter representing the
     * date to be tested, and should return false if the date is invalid and should not
     * be selectable.
     *
     * For example, the code below shows weekends in a disabled state and prevents users
     * from selecting those dates:
     * <pre>
     * calendar.itemValidator = function(date) {
         *   var weekday = date.getDay();
         *   return weekday != 0 && weekday != 6;
         * }
     * </pre>
     */
    itemValidator: Function;
    /**
     * Occurs after a new date is selected.
     */
    valueChanged: Event;
    /**
     * Raises the @see:valueChanged event.
     */
    onValueChanged(e?: EventArgs): void;
    /**
     * Occurs after the @see:displayMonth property changes.
     */
    displayMonthChanged: Event;
    /**
     * Raises the @see:displayMonthChanged event.
     */
    onDisplayMonthChanged(e?: EventArgs): void;
    /**
     * Occurs when an element representing a day in the calendar has been created.
     *
     * This event can be used to format calendar items for display. It is similar
     * in purpose to the @see:itemFormatter property, but has the advantage
     * of allowing multiple independent handlers.
     *
     * For example, the code below uses the @see:formatItem event to disable weekends
     * so they appear dimmed in the calendar:
     *
     * <pre>// disable Sundays and Saturdays
     * calendar.formatItem.addHandler(function (s, e) {
         *   var day = e.data.getDay();
         *   if (day == 0 || day == 6) {
         *     wijmo.addClass(e.item, 'wj-state-disabled');
         *   }
         * });</pre>
     */
    formatItem: Event;
    /**
     * Raises the @see:formatItem event.
     *
     * @param e @see:FormatItemEventArgs that contains the event data.
     */
    onFormatItem(e: FormatItemEventArgs): void;
    /**
     * Refreshes the control.
     *
     * @param fullUpdate Indicates whether to update the control layout as well as the content.
     */
    refresh(fullUpdate?: boolean): void;
    private _isValidDay(value);
    private _isValidMonth(value);
    private _isValidDate(value);
    private _createChildren();
    private _click(e);
    private _getCellIndex(tbl, cell);
    private _keydown(e);
    private _getMonth(date);
    private _addDays(days);
    private _addMonths(months);
    private _navigateDate(month, skip);
}
