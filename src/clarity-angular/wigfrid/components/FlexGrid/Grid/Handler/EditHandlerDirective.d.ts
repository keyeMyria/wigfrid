import { EventEmitter } from "@angular/core";
import { FlexGridComponent } from "../FlexGridComponent";
import { CellRangeEventArgs } from "../CellRangeEventArgs";
import { HitTestInfo } from "../HitTestInfo";
import { CellRange } from "../CellRange";
export declare class EditHandlerDirective {
    private grid;
    _g: FlexGridComponent;
    _rng: CellRange;
    _edt: HTMLInputElement;
    _htDown: HitTestInfo;
    _fullEdit: boolean;
    _evtInput: any;
    constructor(grid: FlexGridComponent);
    gridOnSelectionChanging(event: CellRangeEventArgs): void;
    gridOnBlur(): void;
    gridOnMouseDown(e: any): void;
    gridOnClick(e: any): void;
    /**
     * Starts editing a given cell.
     *
     * @param fullEdit Whether to stay in edit mode when the user presses the cursor keys. Defaults to false.
     * @param r Index of the row to be edited. Defaults to the currently selected row.
     * @param c Index of the column to be edited. Defaults to the currently selected column.
     * @param focus Whether to give the editor the focus. Defaults to true.
     * @return True if the edit operation started successfully.
     */
    startEditing(fullEdit?: boolean, r?: number, c?: number, focus?: boolean): boolean;
    finishEditing(cancel?: boolean): boolean;
    readonly activeEditor: HTMLInputElement;
    readonly editRange: CellRange;
    private _allowEditing(r, c);
    private _commitRowEdits();
    _keyDown(e: any): boolean;
    /**
     * Occurs before a cell enters edit mode.
     */
    beginningEdit: EventEmitter<{}>;
    /**
     * Raises the {@link beginningEdit} event.
     *
     * @param e {@link CellRangeEventArgs} that contains the event data.
     * @return True if the event was not canceled.
     */
    onBeginningEdit(e: CellRangeEventArgs): boolean;
    /**
     * Occurs when an editor cell is created and before it becomes active.
     */
    prepareCellForEdit: EventEmitter<{}>;
    /**
     * Raises the {@link prepareCellForEdit} event.
     *
     * @param e {@link CellRangeEventArgs} that contains the event data.
     */
    onPrepareCellForEdit(e: CellRangeEventArgs): void;
    /**
     * Occurs when a cell edit is ending.
     */
    cellEditEnding: EventEmitter<{}>;
    /**
     * Raises the {@link cellEditEnding} event.
     *
     * You can use this event to perform validation and prevent invalid edits.
     * For example, the code below prevents users from entering values that
     * do not contain the letter 'a'. The code demonstrates how you can obtain
     * the old and new values before the edits are applied.
     *
     * <pre>function cellEditEnding (sender, e) {
         *   // get old and new values
         *   let flex = sender,
         *   oldVal = flex.getCellData(e.row, e.col),
         *   newVal = flex.activeEditor.value;
         *   // cancel edits if newVal doesn't contain 'a'
         *   e.cancel = newVal.indexOf('a') &lt; 0;
         * }</pre>
     *
     * @param e {@link CellRangeEventArgs} that contains the event data.
     * @return True if the event was not canceled.
     */
    onCellEditEnding(e: CellRangeEventArgs): boolean;
    /**
     * Occurs when a cell edit has been committed or canceled.
     */
    cellEditEnded: EventEmitter<{}>;
    /**
     * Raises the {@link cellEditEnded} event.
     *
     * @param e {@link CellRangeEventArgs} that contains the event data.
     */
    onCellEditEnded(e: CellRangeEventArgs): void;
    /**
     * Occurs when a row edit is ending, before the changes are committed or canceled.
     */
    rowEditEnding: EventEmitter<{}>;
    /**
     * Raises the {@link rowEditEnding} event.
     *
     * @param e {@link CellRangeEventArgs} that contains the event data.
     */
    onRowEditEnding(e: CellRangeEventArgs): void;
    /**
     * Occurs when a row edit has been committed or canceled.
     */
    rowEditEnded: EventEmitter<{}>;
    /**
     * Raises the {@link rowEditEnded} event.
     *
     * @param e {@link CellRangeEventArgs} that contains the event data.
     */
    onRowEditEnded(e: CellRangeEventArgs): void;
}
