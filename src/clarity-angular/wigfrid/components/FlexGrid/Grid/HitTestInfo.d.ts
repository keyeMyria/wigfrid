import { GridPanel } from "./GridPanel";
import { CellRange } from "./CellRange";
import { Point } from "../../../core/index";
import { CellType } from "./enum/CellType";
import { FlexGridComponent } from "./FlexGridComponent";
/**
 * Contains information about the part of a @see:FlexGrid control that exists at
 * a specified page coordinate.
 */
export declare class HitTestInfo {
    _g: FlexGridComponent;
    _p: GridPanel;
    _pt: Point;
    _row: number;
    _col: number;
    _edge: number;
    static _EDGESIZE: number;
    /**
     * Initializes a new instance of a @see:HitTestInfo object.
     *
     * @param grid The @see:FlexGrid control or @see:GridPanel to investigate.
     * @param pt The @see:Point object in page coordinates to investigate.
     */
    constructor(grid: FlexGridComponent | GridPanel, pt: any);
    /**
     * Gets the point in control coordinates that the HitTestInfo refers to.
     */
    readonly point: Point;
    /**
     * Gets the cell type at the specified position.
     */
    readonly cellType: CellType;
    /**
     * Gets the grid panel at the specified position.
     */
    readonly gridPanel: GridPanel;
    /**
     * Gets the row index of the cell at the specified position.
     */
    readonly row: number;
    /**
     * Gets the column index of the cell at the specified position.
     */
    readonly col: number;
    /**
     * Gets the cell range at the specified position.
     */
    readonly cellRange: CellRange;
    /**
     * Gets a value indicating whether the mouse is near the left edge of the cell.
     */
    readonly edgeLeft: boolean;
    /**
     * Gets a value indicating whether the mouse is near the top edge of the cell.
     */
    readonly edgeTop: boolean;
    /**
     * Gets a value indicating whether the mouse is near the right edge of the cell.
     */
    readonly edgeRight: boolean;
    /**
     * Gets a value indicating whether the mouse is near the bottom edge of the cell.
     */
    readonly edgeBottom: boolean;
}
