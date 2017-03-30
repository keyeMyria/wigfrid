import { FlexGridComponent } from "../FlexGridComponent";
import { HitTestInfo } from "../HitTestInfo";
import { RowCol } from "../RowColumn/RowCol";
import { CellRangeEventArgs } from "../CellRangeEventArgs";
import { CellRange } from "../CellRange";
export declare class DragHandlerDirective {
    _g: FlexGridComponent;
    _htDown: HitTestInfo;
    _lbSelRows: Object;
    _szRowCol: RowCol;
    _szArgs: CellRangeEventArgs;
    _dragSource: any;
    _dvMarker: HTMLElement;
    _rngTarget: CellRange;
    constructor(grid: FlexGridComponent);
    private onPointerDown(hit);
    private onPointerUp();
    private _dragStart(e);
    private _dragEnd(e);
    private _dragOver(e);
    private _drop(e);
    /**
     * Resets the mouse state.
     */
    resetMouseState(): void;
    private _showDragMarker(ht);
    private _bindingCursor;
}
