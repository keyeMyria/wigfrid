import { CellRange } from "../CellRange";
import { SelectionMode } from "../enum/SelectionMode";
import { SelectedState } from "../enum/SelectedState";
import { SelMove } from "../enum/SelMove";
import { FlexGridComponent } from "../FlexGridComponent";
/**
 * Handles the grid's selection.
 */
export declare class SelectionHandlerDirective {
    _g: FlexGridComponent;
    _sel: CellRange;
    _mode: SelectionMode;
    /**
     * Initializes a new instance of a @see:_SelectionHandler.
     *
     * @param grid @see:FlexGrid that owns this @see:_SelectionHandler.
     */
    constructor(grid: FlexGridComponent);
    /**
     * Gets or sets the current selection mode.
     */
    selectionMode: SelectionMode;
    /**
     * Gets or sets the current selection.
     */
    selection: CellRange;
    /**
     * Gets a @see:SelectedState value that indicates the selected state of a cell.
     *
     * @param r Row index of the cell to inspect.
     * @param c Column index of the cell to inspect.
     */
    getSelectedState(r: number, c: number): SelectedState;
    /**
     * Selects a cell range and optionally scrolls it into view.
     *
     * @param rng Range to select.
     * @param show Whether to scroll the new selection into view.
     */
    select(rng: any, show?: any): void;
    /**
     * Moves the selection by a specified amount in the vertical and horizontal directions.
     * @param rowMove How to move the row selection.
     * @param colMove How to move the column selection.
     * @param extend Whether to extend the current selection or start a new one.
     */
    moveSelection(rowMove: SelMove, colMove: SelMove, extend: boolean): void;
    private _getReferenceCell(rowMove, colMove, extend);
    private _adjustSelection(rng);
}
