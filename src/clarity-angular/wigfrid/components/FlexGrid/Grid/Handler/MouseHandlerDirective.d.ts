import { HitTestInfo } from "../HitTestInfo";
import { CellRange } from "../CellRange";
import { CellRangeEventArgs } from "../CellRangeEventArgs";
import { RowCol } from "../RowColumn";
import { EventEmitter } from "@angular/core";
import { FlexGridComponent } from "../FlexGridComponent";
import { FlexGridExtensionsService } from "../Extensions/flex-grid-extensions.service";
import { ResizeHandlerDirective } from "./ResizeHandlerDirective";
import { SortHandlerDirective } from "./SortHandlerDirective";
/**
 * Handles the grid's mouse commands.
 */
export declare class MouseHandlerDirective {
    private sortHandler;
    private resizeHanlder;
    private extensionsService;
    _g: FlexGridComponent;
    _htDown: HitTestInfo;
    _eMouse: MouseEvent;
    _lbSelState: boolean;
    _lbSelRows: Object;
    _szRowCol: RowCol;
    _szStart: number;
    _szArgs: CellRangeEventArgs;
    _dragSource: any;
    _dvMarker: HTMLElement;
    _rngTarget: CellRange;
    private _mouseMoveStream;
    private _mouseUpStream;
    private indicator;
    /**
     * Initializes a new instance of a @see:_MouseHandler.
     *
     * @param grid
     * @param sortHandler
     * @param resizeHanlder
     * @param extensionsService
     */
    constructor(grid: FlexGridComponent, sortHandler: SortHandlerDirective, resizeHanlder: ResizeHandlerDirective, extensionsService: FlexGridExtensionsService);
    onMouseDown(e: MouseEvent): void;
    /**
     * Resets the mouse state.
     */
    resetMouseState(): void;
    private _mouseDown(e);
    private _mouseMove(e);
    private _mouseUp(e);
    private _hover(e);
    private _mouseSelect(e, extend);
    private _handleResizing(e);
    private _showResizeMarker(sz);
    private _showDragMarker(ht);
    private _finishResizing(e);
    private _startListBoxSelection(row);
    private _handleSelection(ht, extend);
    private _bindingCursor;
    gridPointerDown: EventEmitter<HitTestInfo>;
    gridPointerMove: EventEmitter<HitTestInfo>;
    gridPointerUp: EventEmitter<HitTestInfo>;
    gridDragStart: EventEmitter<HitTestInfo>;
    gridDraging: EventEmitter<HitTestInfo>;
    gridDragEnd: EventEmitter<HitTestInfo>;
}
