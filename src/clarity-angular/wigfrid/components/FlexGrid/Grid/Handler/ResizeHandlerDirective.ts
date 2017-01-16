import {Directive, HostListener, forwardRef, Inject, Output, EventEmitter, Input} from "@angular/core";
import {CellRangeEventArgs} from "../CellRangeEventArgs";
import {AllowResizing} from "../enum/AllowResizing";
import {CellType} from "../enum/CellType";
import {CellRange} from "../CellRange";
import {FlexGridComponent} from "../FlexGridComponent";
import {asBoolean} from "../../../../core/index";

@Directive(
    {
        selector: 'ar-flex-grid'
    }
)
export class ResizeHandlerDirective {
    private _deferResizing = false;


    constructor(@Inject(forwardRef(() => FlexGridComponent)) private grid: FlexGridComponent) {

    }

    //region inputs and outputs

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
        if (ht.edgeRight && (g.allowResizing & AllowResizing.Columns)) {
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
        if (ht.edgeBottom && (g.allowResizing & AllowResizing.Rows)) {
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

    public autoSizeColumn() {

    }

    public autoSizeRow() {

    }
}
