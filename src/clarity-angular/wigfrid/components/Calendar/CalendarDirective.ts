
import {Control} from '../../core/Control'
import {Globalize} from '../../globalization/Globalize'
import {FormatItemEventArgs} from "../FormatItemEventArgs";
import {DateTime} from "../../common/datetime/DateTime";
import {asDate} from "../../util/asserts/asDate";
import {asFunction} from "../../util/asserts/asFunction";
import {toggleClass} from "../../util/dom/toggleClass";
import {Key} from "../../enum/Key";
import {contains} from "../../util/dom/contains";
import {closest} from "../../util/dom/closest";
import {addClass} from "../../util/dom/addClass";
import {EventArgs} from "../../eventArgs/EventArgs";
import {Event} from "../../event/Event";
import {asNumber} from "../../util/asserts/asNumber";
import {asBoolean} from "../../util/asserts/asBoolean";
import {BaseControl} from "../../core/BaseControl";
import {Component} from "@angular/core";
import {EventEmitter} from "@angular/core";
import {HostListener} from "@angular/core";
import {ElementRef} from "@angular/core";
import {AppViewManager} from "@angular/core";
import {Inject} from "@angular/core";
import {Optional} from "@angular/core";
import {AfterViewInit} from "@angular/core";


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
@Component({
    selector: 'arCalendar',
    template: `<div class="wj-calendar-outer wj-content">
            <div wj-part="tbl-header" class="wj-calendar-header">
                <div wj-part="btn-month" class="wj-month-select">
                    <span wj-part="span-month"></span> <span class="wj-glyph-down"></span>
                </div>
                <div class="wj-btn-group">
                    <button type="button" wj-part="btn-prev" class="wj-btn wj-btn-default"><span class="wj-glyph-left"></span></button>
                    <button type="button" wj-part="btn-today" class="wj-btn wj-btn-default"><span class="wj-glyph-circle"></span></button>
                    <button type="button" wj-part="btn-next" class="wj-btn wj-btn-default"><span class="wj-glyph-right"></span></button>
                </div>
            </div>
            <table wj-part="tbl-month" class="wj-calendar-month" ></table>
            <table wj-part="tbl-year" class="wj-calendar-year" style="display:none" ></table>
        </div>`,
    inputs  : [],
    outputs : []
})
export class CalendarDirective extends BaseControl implements AfterViewInit {

    // child elements
    private _tblHdr: HTMLTableElement;
    private _tblMonth: HTMLTableElement;
    private _tblYear: HTMLTableElement;
    private _tdMonth: HTMLTableCellElement;
    private _spMonth: HTMLSpanElement;
    private _btnPrev : HTMLButtonElement;
    private _btnToday: HTMLButtonElement;
    private _btnNext: HTMLButtonElement;

    // property storage
    private _value: Date;
    private _currMonth: Date;
    private _firstDay: Date;
    private _min: Date;
    private _max: Date;
    private _fdw: number;
    private _itemFormatter: Function;
    private _itemValidator: Function;

    /**
     * Initializes a new instance of a @see:Calendar.
     *
     * @param elementRef The DOM element that hosts the control, or a selector for the host element (e.g. '#theCtrl').
     * @param options The JavaScript object containing initialization data for the control.
     */
    constructor(@Inject(ElementRef) private elementRef: ElementRef) {
        super(elementRef);

        // initialize value (current date)
        this._value = new Date();
        this._currMonth = this._getMonth(this._value);


    }

    ngAfterViewInit(){
        //super.ngAfterViewInit();

        // create child elements
        this._createChildren();

        // update the control
        this.refresh(true);

        // handle mouse and keyboard
        // The 'click' event may not be triggered on iOS Safari if focus changed
        // during previous tap. So use 'mouseup' instead.
        //this.addEventListener(this.hostElement, 'click', this._click.bind(this));
        //todo ###remove me###
        //this.addEventListener(this.hostElement, 'mouseup', this._click.bind(this));
        //this.addEventListener(this.hostElement, 'keydown', this._keydown.bind(this));

        // initialize control options
    }

    //--------------------------------------------------------------------------
    //#region ** object model

    /**
     * Gets or sets the currently selected date.
     */
    get value(): Date {
        return this._value;
    }
    set value(value: Date) {
        if (!DateTime.equals(this._value, value)) {

            // check type
            value = asDate(value, true);

            // honor ranges (but keep the time)
            if (value) {
                if (this._min != null) {
                    const min = DateTime.fromDateTime(this._min, value);
                    if (value < min) {
                        value = min;
                    }
                }
                if (this._max != null && value > this._max) {
                    const max = DateTime.fromDateTime(this._max, value);
                    if (value > max) {
                        value = max;
                    }
                }
            }

            // update control
            if (!DateTime.equals(this._value, value) && this._isValidDate(value)) {
                this._value = value;
                this.displayMonth = this._getMonth(value);
                this.invalidate(false);
                this.onValueChanged();
            }
        }
    }
    /**
     * Gets or sets the earliest date that the user can select in the calendar.
     */
    get min(): Date {
        return this._min;
    }
    set min(value: Date) {
        if (value != this.min) {
            this._min = asDate(value, true);
            this.refresh();
        }
    }
    /**
     * Gets or sets the latest date that the user can select in the calendar.
     */
    get max(): Date {
        return this._max;
    }
    set max(value: Date) {
        if (value != this.max) {
            this._max = asDate(value, true);
            this.refresh();
        }
    }
    /**
     * Gets or sets a value that represents the first day of the week,
     * the one displayed in the first column of the calendar.
     *
     * Setting this property to null causes the calendar to use the default
     * for the current culture. In the English culture, the first day of the
     * week is Sunday (0); in most European cultures, the first day of the
     * week is Monday (1).
     */
    get firstDayOfWeek(): number {
        return this._fdw;
    }
    set firstDayOfWeek(value: number) {
        if (value != this._fdw) {
            value = asNumber(value, true);
            if (value && (value > 6 || value < 0)) {
                throw 'firstDayOfWeek must be between 0 and 6 (Sunday to Saturday).'
            }
            this._fdw = value;
            this.refresh();
        }
    }
    /**
     * Gets or sets the month displayed in the calendar.
     */
    get displayMonth(): Date {
        return this._currMonth;
    }
    set displayMonth(value: Date) {
        if (!DateTime.equals(this.displayMonth, value)) {
            value = asDate(value);
            if (this._isValidMonth(value)) {
                this._currMonth = this._getMonth(value);
                this.invalidate(true);
                this.onDisplayMonthChanged();
            }
        }
    }
    /**
     * Gets or sets a value indicating whether the control displays the header
     * area with the current month and navigation buttons.
     */
    get showHeader(): boolean {
        return this._tblHdr.style.display != 'none';
    }
    set showHeader(value: boolean) {
        this._tblHdr.style.display = asBoolean(value) ? '' : 'none';
    }
    /**
     * Gets or sets a value indicating whether the calendar displays a month or a year.
     */
    get monthView(): boolean {
        return this._tblMonth.style.display != 'none';
    }
    set monthView(value: boolean) {
        if (value != this.monthView) {
            this._tblMonth.style.display = value ? '' : 'none';
            this._tblYear.style.display = value ? 'none' : '';
        }
    }
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
    get itemFormatter(): Function {
        return this._itemFormatter;
    }
    set itemFormatter(value: Function) {
        if (value != this._itemFormatter) {
            this._itemFormatter = asFunction(value);
            this.invalidate();
        }
    }
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
    get itemValidator(): Function {
        return this._itemValidator;
    }
    set itemValidator(value: Function) {
        if (value != this._itemValidator) {
            this._itemValidator = asFunction(value);
            this.invalidate();
        }
    }
    /**
     * Occurs after a new date is selected.
     */
    valueChanged = new EventEmitter();
    /**
     * Raises the @see:valueChanged event.
     */
    onValueChanged(e?: EventArgs) {
        this.valueChanged.emit(e);
    }
    /**
     * Occurs after the @see:displayMonth property changes.
     */
    displayMonthChanged = new EventEmitter();
    /**
     * Raises the @see:displayMonthChanged event.
     */
    onDisplayMonthChanged(e?: EventArgs) {
        this.displayMonthChanged.emit(e);
    }
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
    formatItem = new EventEmitter();
    /**
     * Raises the @see:formatItem event.
     *
     * @param e @see:FormatItemEventArgs that contains the event data.
     */
    onFormatItem(e: FormatItemEventArgs) {
        this.formatItem.emit(e);
    }

    /**
     * Refreshes the control.
     *
     * @param fullUpdate Indicates whether to update the control layout as well as the content.
     */
    refresh(fullUpdate = true) {
        let cells: any,
            cell: HTMLElement,
            day: Date;
        const fdw = this.firstDayOfWeek != null ? this.firstDayOfWeek : Globalize.getFirstDayOfWeek();

        // call base class to suppress any pending invalidations
        super.refresh(fullUpdate);

        // calculate first day of the calendar
        this._firstDay = DateTime.addDays(this.displayMonth, -(this.displayMonth.getDay() - fdw + 7) % 7);

        // update current month (e.g. January 2014)
        this._spMonth.textContent = Globalize.format(this.displayMonth, 'y');

        // update week day headers (localizable)
        cells = this._tblMonth.querySelectorAll('td');
        for (var i = 0; i < 7 && i < cells.length; i++) {
            day = DateTime.addDays(this._firstDay, i);
            cells[i].textContent = Globalize.format(day, 'ddd');
        }

        // update month days
        for (var i = 7; i < cells.length; i++) {
            cell = cells[i];
            day = DateTime.addDays(this._firstDay, i - 7);
            cell.textContent = day.getDate().toString();
            cell.className = '';
            const invalid = !this._isValidDate(day);
            toggleClass(cell, 'wj-state-invalid', invalid);
            toggleClass(cell, 'wj-state-selected', DateTime.sameDate(day, this.value));
            toggleClass(cell, 'wj-day-today', DateTime.sameDate(day, new Date()));
            toggleClass(cell, 'wj-day-othermonth', invalid || day.getMonth() != this.displayMonth.getMonth() || !this._isValidDay(day));

            // customize the display
            if (this.itemFormatter) {
                this.itemFormatter(day, cell);
            }
            if (this.formatItem.hasHandlers) {
                const e = new FormatItemEventArgs(i, day, cell);
                this.onFormatItem(e);
            }
        }

        // hide rows that belong to the next month
        const rows = this._tblMonth.querySelectorAll('tr');
        if (rows.length) {
            day = DateTime.addDays(this._firstDay, 28);
            (<HTMLElement>rows[rows.length - 2]).style.display = (day.getMonth() == this.displayMonth.getMonth()) ? '' : 'none';
            day = DateTime.addDays(this._firstDay, 35);
            (<HTMLElement>rows[rows.length - 1]).style.display = (day.getMonth() == this.displayMonth.getMonth()) ? '' : 'none';
        }

        // update current year
        cells = this._tblYear.querySelectorAll('td');
        if (cells.length) {
            cells[0].textContent = this.displayMonth.getFullYear().toString();
        }

        // update month names
        for (var i = 1; i < cells.length; i++) {
            cell = cells[i];
            day = new Date(this.displayMonth.getFullYear(), i - 1, 1);
            cell.textContent = Globalize.format(day, 'MMM');
            cell.className = '';
            toggleClass(cell, 'wj-state-disabled', !this._isValidMonth(day));
            toggleClass(cell, 'wj-state-selected', DateTime.sameDate(this._getMonth(day), this.displayMonth));
        }
    }

    //#endregion

    //--------------------------------------------------------------------------
    //#region ** implementation

    // check whether a day is within the valid range
    private _isValidDay(value: Date) {
        if (this.min && value < DateTime.fromDateTime(this.min, value)) return false;
        if (this.max && value > DateTime.fromDateTime(this.max, value)) return false;
        return true;
    }

    // check whether a month is within the valid range
    private _isValidMonth(value: Date) {
        const y     = value.getFullYear(),
              m     = value.getMonth(),
              first = new Date(y, m, 1),
              last  = DateTime.addDays(new Date(y, m + 1), -1);
        return this._isValidDay(first) || this._isValidDay(last);
    }

    // check whether a date should be selectable by the user
    private _isValidDate(value: Date): boolean {
        return this.itemValidator && value
            ? this.itemValidator(value)
            : true;
    }

    // create child elements
    private _createChildren() {

        // instantiate and apply template
        let tpl = this.getTemplate();
        this.applyTemplate('wj-control wj-calendar', this.elementRef.nativeElement, {
            _tblHdr: 'tbl-header',
            _tdMonth: 'btn-month',
            _spMonth: 'span-month',
            _btnPrev: 'btn-prev',
            _btnToday: 'btn-today',
            _btnNext: 'btn-next',
            _tblMonth: 'tbl-month',
            _tblYear: 'tbl-year'
        });

        // populate month calendar
        let tr = document.createElement('TR');
        addClass(tr, 'wj-header');
        for (var d = 0; d < 7; d++) {
            tr.appendChild(document.createElement('TD'));
        }
        this._tblMonth.appendChild(tr);
        for (let w = 0; w < 6; w++) {
            tr = document.createElement('TR');
            for (var d = 0; d < 7; d++) {
                tr.appendChild(document.createElement('TD'));
            }
            this._tblMonth.appendChild(tr);
        }

        // populate year calendar
        tr = document.createElement('TR');
        addClass(tr, 'wj-header');
        const td = document.createElement('TD');
        td.setAttribute('colspan', '4');
        tr.appendChild(td);
        this._tblYear.appendChild(tr);
        for (let i = 0; i < 3; i++) {
            tr = document.createElement('TR');
            for (let j = 0; j < 4; j++) {
                tr.appendChild(document.createElement('TD'));
            }
            this._tblYear.appendChild(tr);
        }
    }

    // handle clicks on the calendar
    @HostListener('click', ['$event'])
    @HostListener('mouseup', ['$event'])
    private _click(e: MouseEvent) {
        let handled = false;

        // get element that was clicked
        let elem = <HTMLElement>e.target;

        // switch month/year view
        if (contains(this._tdMonth, elem)) {
            this.monthView = !this.monthView;
            handled = true;
        }

        // navigate month/year
        else if (contains(this._btnPrev, elem)) {
            this._navigateDate(this.monthView, -1);
            handled = true;
        } else if (contains(this._btnNext, elem)) {
            this._navigateDate(this.monthView, +1);
            handled = true;
        } else if (contains(this._btnToday, elem)) {
            this._navigateDate(this.monthView, 0);
            handled = true;
        }

        // select day/month
        if (!handled && elem) {
            elem = <HTMLElement>closest(elem, 'TD');
            if (elem) {
                if (this.monthView) {
                    var index = this._getCellIndex(this._tblMonth, elem);
                    if (index > 6) {
                        this.value = DateTime.fromDateTime(DateTime.addDays(this._firstDay, index - 7), this.value);
                        handled = true;
                    }
                } else {
                    var index = this._getCellIndex(this._tblYear, elem);
                    if (index > 0) {
                        this.displayMonth = new Date(this.displayMonth.getFullYear(), index - 1, 1);
                        this.monthView = true;
                        handled = true;
                    }
                }
            }
        }

        // if we handled the mouse, prevent browser from seeing it
        if (handled) {
            e.preventDefault();
            this.focus();
        }
    }

    // gets the index of a cell in a table
    private _getCellIndex(tbl: HTMLTableElement, cell: HTMLElement): number {
        const cells = tbl.querySelectorAll('TD');
        for (let i = 0; i < cells.length; i++) {
            if (cells[i] == cell) return i;
        }
        return -1;
    }

    // handle keyboard events
    @HostListener('keydown', ['$event'])
    private _keydown(e: KeyboardEvent) {

        // honor defaultPrevented
        if (e.defaultPrevented) return;

        // not interested in meta keys
        if (e.ctrlKey || e.shiftKey || e.altKey || e.metaKey) return;

        // handle the key
        let handled = true;
        if (this.monthView) {
            switch (e.keyCode) {
                case Key.Left:
                    this.value = this._addDays(-1);
                    break;
                case Key.Right:
                    this.value = this._addDays(+1);
                    break;
                case Key.Up:
                    this.value = this._addDays(-7);
                    break;
                case Key.Down:
                    this.value = this._addDays(+7);
                    break;
                case Key.PageDown:
                    this.displayMonth = this._addMonths(+1);
                    break;
                case Key.PageUp:
                    this.displayMonth = this._addMonths(-1);
                    break;
                default:
                    handled = false;
                    break;
            }
        } else {
            switch (e.keyCode) {
                case Key.Left:
                    this.displayMonth = this._addMonths(-1);
                    break;
                case Key.Right:
                    this.displayMonth = this._addMonths(+1);
                    break;
                case Key.Up:
                    this.displayMonth = this._addMonths(-4);
                    break;
                case Key.Down:
                    this.displayMonth = this._addMonths(+4);
                    break;
                case Key.PageDown:
                    this.displayMonth = this._addMonths(+12);
                    break;
                case Key.PageUp:
                    this.displayMonth = this._addMonths(-12);
                    break;
                case Key.Enter:
                    this.monthView = true;
                    break;
                default:
                    handled = false;
                    break;
            }
        }

        // if we handled the key, prevent browser from seeing it
        if (handled) {
            e.preventDefault();
        }
    }

    // gets the month being displayed in the calendar
    private _getMonth(date: Date) {
        if (!date) date = new Date();
        return new Date(date.getFullYear(), date.getMonth(), 1);
    }

    // adds a given number of days to the current value (preserving time)
    private _addDays(days: number): Date {
        const dt = DateTime.addDays(this.value, days);
        return DateTime.fromDateTime(dt, this.value);
    }

    // adds a given number of months to the current display month
    private _addMonths(months: number): Date {
        return DateTime.addMonths(this.displayMonth, months);
    }

    // change display month by a month or a year, or skip to the current
    private _navigateDate(month: boolean, skip: number) {
        switch (skip) {
            case 0:
                if (month) {
                    this.value = new Date();
                } else {
                    this.displayMonth = this._getMonth(new Date());
                }
                break;
            case +1:
                if (month) {
                    this.displayMonth = DateTime.addMonths(this.displayMonth, +1);
                } else {
                    this.displayMonth = new Date(this.displayMonth.getFullYear() + 1, 0, 1);
                }
                break;
            case -1:
                if (month) {
                    this.displayMonth = DateTime.addMonths(this.displayMonth, -1);
                } else {
                    this.displayMonth = new Date(this.displayMonth.getFullYear() - 1, 11, 1);
                }
                break;
        }
    }

    //#endregion
}
