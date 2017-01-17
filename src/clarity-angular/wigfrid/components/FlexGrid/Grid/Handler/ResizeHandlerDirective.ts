import {Directive, HostListener, forwardRef, Inject, Output, EventEmitter, Input} from "@angular/core";
import {CellRangeEventArgs} from "../CellRangeEventArgs";
import {AllowResizing} from "../enum/AllowResizing";
import {CellType} from "../enum/CellType";
import {CellRange} from "../CellRange";
import {FlexGridComponent} from "../FlexGridComponent";
import {asBoolean, asInt, asNumber} from "../../../../core/index";
import {AutoSizeMode} from "../enum/AutoSizeMode";
import {asEnum} from "../../../../core/index";

@Directive(
    {
        selector: 'ar-flex-grid'
    }
)
export class ResizeHandlerDirective {
    private _deferResizing = false;

    private _allowResizing = AllowResizing.Columns;
    private _autoSizeMode  = AutoSizeMode.Both;


    constructor(@Inject(forwardRef(() => FlexGridComponent)) private grid: FlexGridComponent) {
    }

    //region inputs and outputs

    /**
     * Gets or sets whether users may resize rows and/or columns
     * with the mouse.
     *
     * If resizing is enabled, users can resize columns by dragging
     * the right edge of column header cells, or rows by dragging the
     * bottom edge of row header cells.
     *
     * Users may also double-click the edge of the header cells to
     * automatically resize rows and columns to fit their content.
     * The autosize behavior can be customized using the {@link autoSizeMode}
     * property.
     */
    @Input()
    get allowResizing(): AllowResizing {
        return this._allowResizing;
    }

    set allowResizing(value: AllowResizing) {
        this._allowResizing = asEnum(value, AllowResizing);
    }

    /**
     * Gets or sets which cells should be taken into account when auto-sizing a
     * row or column.
     *
     * This property controls what happens when users double-click the edge of
     * a column header.
     *
     * By default, the grid will automatically set the column width based on the
     * content of the header and data cells in the column. This property allows
     * you to change that to include only the headers or only the data.
     */
    @Input()
    get autoSizeMode(): AutoSizeMode {
        return this._autoSizeMode;
    }

    set autoSizeMode(value: AutoSizeMode) {
        this._autoSizeMode = asEnum(value, AutoSizeMode);
    }

    /**
     * Gets or sets whether row and column resizing should be deferred until
     * the user releases the mouse button.
     *
     * By default, {@link deferResizing} is set to false, causing rows and columns
     * to be resized as the user drags the mouse. Setting this property to true
     * causes the grid to show a resizing marker and to resize the row or column
     * only when the user releases the mouse button.
     */
    @Input()
    get deferResizing(): boolean {
        return this._deferResizing;
    }

    set deferResizing(value: boolean) {
        this._deferResizing = asBoolean(value);
    }

    /**
     * Occurs as columns are resized.
     */
    @Output()
    resizingColumn = new EventEmitter();

    /**
     * Raises the {@link resizingColumn} event.
     *
     * @param e {@link CellRangeEventArgs} that contains the event data.
     * @return True if the event was not canceled.
     */
    onResizingColumn(e: CellRangeEventArgs): boolean {
        this.resizingColumn.emit(e);
        return !e.cancel;
    }

    /**
     * Occurs when the user finishes resizing a column.
     */
    @Output()
    resizedColumn = new EventEmitter();

    /**
     * Raises the {@link resizedColumn} event.
     *
     * @param e {@link CellRangeEventArgs} that contains the event data.
     */
    onResizedColumn(e: CellRangeEventArgs) {
        this.resizedColumn.emit(e);
    }

    /**
     * Occurs before the user auto-sizes a column by double-clicking the
     * right edge of a column header cell.
     */
    @Output()
    autoSizingColumn: EventEmitter<any> = new EventEmitter();

    /**
     * Raises the {@link autoSizingColumn} event.
     *
     * @param e {@link CellRangeEventArgs} that contains the event data.
     */
    onAutoSizingColumn(e: CellRangeEventArgs): boolean {
        this.autoSizingColumn.emit(e);
        return !e.cancel;
    }

    /**
     * Occurs after the user auto-sizes a column by double-clicking the
     * right edge of a column header cell.
     */
    @Output()
    autoSizedColumn: EventEmitter<any> = new EventEmitter();

    /**
     * Raises the {@link autoSizedColumn} event.
     *
     * @param e {@link CellRangeEventArgs} that contains the event data.
     */
    onAutoSizedColumn(e: CellRangeEventArgs) {
        this.autoSizedColumn.emit(e);
    }

    /**
     * Occurs as rows are resized.
     */
    @Output()
    resizingRow = new EventEmitter();

    /**
     * Raises the {@link resizingRow} event.
     *
     * @param e {@link CellRangeEventArgs} that contains the event data.
     * @return True if the event was not canceled.
     */
    onResizingRow(e: CellRangeEventArgs): boolean {
        this.resizingRow.emit(e);
        return !e.cancel;
    }

    /**
     * Occurs when the user finishes resizing rows.
     */
    @Output()
    resizedRow = new EventEmitter();

    /**
     * Raises the {@link resizedRow} event.
     *
     * @param e {@link CellRangeEventArgs} that contains the event data.
     */
    onResizedRow(e: CellRangeEventArgs) {
        this.resizedRow.emit(e);
    }

    /**
     * Occurs before the user auto-sizes a row by double-clicking the
     * bottom edge of a row header cell.
     */
    @Output()
    autoSizingRow = new EventEmitter();

    /**
     * Raises the {@link autoSizingRow} event.
     *
     * @param e {@link CellRangeEventArgs} that contains the event data.
     */
    onAutoSizingRow(e: CellRangeEventArgs): boolean {
        this.autoSizingRow.emit(e);
        return !e.cancel;
    }

    /**
     * Occurs after the user auto-sizes a row by double-clicking the
     * bottom edge of a row header cell.
     */
    @Output()
    autoSizedRow = new EventEmitter();

    /**
     * Raises the {@link autoSizedRow} event.
     *
     * @param e {@link CellRangeEventArgs} that contains the event data.
     */
    onAutoSizedRow(e: CellRangeEventArgs) {
        this.autoSizedRow.emit(e);
    }

    //endregion


    // handles double-clicks
    @HostListener('dblclick', ['$event'])
    private _dblClick(e: MouseEvent) {
        console.log('double click cell boundary');
        let g   = this.grid,
            ht  = g.hitTest(e),
            sel = g.selection,
            rng = ht.cellRange,
            args: CellRangeEventArgs;

        // ignore if already handled
        if (e.defaultPrevented) {
            return;
        }

        // auto-size columns
        if (ht.edgeRight && (this.allowResizing & AllowResizing.Columns)) {
            if (ht.cellType == CellType.ColumnHeader) {
                if (e.ctrlKey && sel.containsColumn(ht.col)) {
                    rng = sel;
                }
                for (let c = rng.leftCol; c <= rng.rightCol; c++) {
                    if (g.columns[c].allowResizing) {
                        args = new CellRangeEventArgs(g.cells, new CellRange(-1, c));
                        if (this.onAutoSizingColumn(args) && this.onResizingColumn(args)) {
                            this.autoSizeColumn(c);
                            this.onResizedColumn(args);
                            this.onAutoSizedColumn(args);
                        }
                    }
                }
            } else if (ht.cellType == CellType.TopLeft) {
                if (g.topLeftCells.columns[ht.col].allowResizing) {
                    args = new CellRangeEventArgs(g.topLeftCells, new CellRange(-1, ht.col));
                    if (this.onAutoSizingColumn(args) && this.onResizingColumn(args)) {
                        this.autoSizeColumn(ht.col, true);
                        this.onAutoSizedColumn(args);
                        this.onResizedColumn(args);
                    }
                }
            }
            return;
        }

        // auto-size rows
        if (ht.edgeBottom && (this.allowResizing & AllowResizing.Rows)) {
            if (ht.cellType == CellType.RowHeader) {
                if (e.ctrlKey && sel.containsRow(ht.row)) {
                    rng = sel;
                }
                for (let r = rng.topRow; r <= rng.bottomRow; r++) {
                    if (g.rows[r].allowResizing) {
                        args = new CellRangeEventArgs(g.cells, new CellRange(r, -1));
                        if (this.onAutoSizingRow(args) && this.onResizingRow(args)) {
                            this.autoSizeRow(r);
                            this.onResizedRow(args);
                            this.onAutoSizedRow(args);
                        }
                    }
                }
            } else if (ht.cellType == CellType.TopLeft) {
                if (g.topLeftCells.rows[ht.row].allowResizing) {
                    args = new CellRangeEventArgs(g.topLeftCells, new CellRange(ht.row, -1));
                    if (this.onAutoSizingRow(args) && this.onResizingRow(args)) {
                        this.autoSizeRow(ht.row, true);
                        this.onResizedRow(args);
                        this.onAutoSizedRow(args);
                    }
                }
            }
        }
    }

    autoSizeColumn(c: number, header = false, extra = 4) {
        this.autoSizeColumns(c, c, header, extra);
    }
    /**
     * Resizes a range of columns to fit their content.
     *
     * The grid will always measure all rows in the current view range, plus up to 2,000 rows
     * not currently in view. If the grid contains a large amount of data (say 50,000 rows),
     * then not all rows will be measured since that could potentially take a long time.
     *
     * @param firstColumn Index of the first column to resize (defaults to the first column).
     * @param lastColumn Index of the last column to resize (defaults to the last column).
     * @param header Whether the column indices refer to regular or header columns.
     * @param extra Extra spacing, in pixels.
     */
    autoSizeColumns(firstColumn?: number, lastColumn?: number, header = false, extra = 4) {
        var max = 0,
            groupPanelHeader = header ? this.grid.topLeftCells : this.grid.columnHeaders,
            groupPanelCells = header ? this.grid.rowHeaders : this.grid.cells,
            rowRange = this.grid.viewRange,
            text: string, lastText: string;
        firstColumn = firstColumn == null ? 0 : asInt(firstColumn);
        lastColumn = lastColumn == null ? groupPanelCells.columns.length - 1 : asInt(lastColumn);
        asBoolean(header);
        asNumber(extra);

        // choose row range to measure
        // (viewrange by default, everything if we have only a few items)
        rowRange.row = Math.max(0, rowRange.row - 1000);
        rowRange.row2 = Math.min(rowRange.row2 + 1000, this.rows.length - 1);


        // create element to measure content
        // let eMeasure = document.createElement('div');
        // eMeasure.setAttribute(FlexGrid._WJS_MEASURE, 'true');
        // eMeasure.style.visibility = 'hidden';
        // this.hostElement.appendChild(eMeasure);

        // measure cells in the range
        for (let c = firstColumn; c <= lastColumn && c > -1 && c < groupPanelCells.columns.length; c++) {
            max = 0;

            // headers
            if (this.autoSizeMode & AutoSizeMode.Headers) {
                for (let r = 0; r < groupPanelHeader.rows.length; r++) {
                    if (groupPanelHeader.rows[r].isVisible) {
                        let w = this._getDesiredWidth(groupPanelHeader, r, c, eMeasure);
                        max = Math.max(max, w);
                    }
                }
            }

            // cells
            if (this.autoSizeMode & AutoSizeMode.Cells) {
                lastText = null;
                for (let r = rowRange.row; r <= rowRange.row2 && r > -1 && r < groupPanelCells.rows.length; r++) {
                    if (groupPanelCells.rows[r].isVisible) {

                        if (!header && c == groupPanelCells.columns.firstVisibleIndex && groupPanelCells.rows.maxGroupLevel > -1) {

                            // ignore last text for outline cells
                            let w = this._getDesiredWidth(groupPanelCells, r, c, eMeasure);
                            max = Math.max(max, w);

                        } else {

                            // regular cells
                            text = groupPanelCells.getCellData(r, c, true);
                            if (text != lastText) {
                                lastText = text;
                                let w = this._getDesiredWidth(groupPanelCells, r, c, eMeasure);
                                max = Math.max(max, w);
                            }
                        }
                    }
                }
            }

            // set size
            groupPanelCells.columns[c].width = max + extra + 2;
        }

        // done with measuring element
        this.hostElement.removeChild(eMeasure);
    }

    public autoSizeRow() {

    }
}
