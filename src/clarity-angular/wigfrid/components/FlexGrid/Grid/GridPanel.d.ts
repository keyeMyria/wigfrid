import { RowCollection, ColumnCollection } from "./RowColumn";
import { CellRange } from "./CellRange";
import { CellType } from "./enum/CellType";
import { Point, Rectangle } from "../../../core/index";
import { FlexGridComponent } from "./FlexGridComponent";
/**
 * Represents a logical part of the grid, such as the column headers, row headers,
 * and scrollable data part.
 */
export declare abstract class GridPanel {
    private _g;
    private _ct;
    protected _rows: RowCollection;
    protected _cols: ColumnCollection;
    private _rng;
    protected scrollPosition: any;
    hostElement: any;
    /**
     * Initializes a new instance of a @see:GridPanel.
     *
     * @param grid The @see:FlexGrid object that owns the panel.
     * @param cellType The type of cell in the panel.
     */
    constructor(grid: FlexGridComponent, cellType: CellType);
    /**
     * Gets the grid that owns the panel.
     */
    readonly grid: FlexGridComponent;
    /**
     * Gets the type of cell contained in the panel.
     */
    readonly cellType: CellType;
    /**
     * Gets a @see:CellRange that indicates the range of cells currently visible on the panel.
     */
    readonly viewRange: CellRange;
    /**
     * Gets the total width of the content in the panel.
     */
    readonly width: number;
    /**
     * Gets the total height of the content in this panel.
     */
    readonly height: number;
    /**
     * Gets the panel's row collection.
     */
    readonly rows: RowCollection;
    /**
     * Gets the panel's column collection.
     */
    readonly columns: ColumnCollection;
    readonly draggable: boolean;
    getCell(): void;
    /**
     * Gets the value stored in a cell in the panel.
     * 单元格渲染己单独提到MicroCell, 故getCellData不会再使用, 应调用 getMicroCell
     *
     * 调用:
     *  - FlexGrid getCellData
     *  - FlexGrid getClipString
     *  - GridPanel setCellData
     *  - MergeManage
     *
     * @param r The row index of the cell.
     * @param c The column index of the cell.
     * @param formatted A value indicating whether to format the value for display.
     *
     * @deprecated use {@link getMicroCell} instead
     */
    getCellData(r: number, c: number, formatted: boolean): any;
    /**
     * Sets the content of a cell in the panel.
     *
     * @param r The index of the row that contains the cell.
     * @param c The index, name, or binding of the column that contains the cell.
     * @param value The value to store in the cell.
     * @param coerce A value indicating whether to change the value automatically to match the column's data type.
     * @return Returns true if the value is stored successfully, false otherwise (failed cast).
     */
    setCellData(r: number, c: any, value: any, coerce?: boolean): boolean;
    /**
     * Gets a cell's bounds in viewport coordinates.
     *
     * The returned value is a @see:Rect object which contains the
     * position and dimensions of the cell in viewport coordinates.
     * The viewport coordinates are the same as those used by the
     * <a href="https://developer.mozilla.org/en-US/docs/Web/API/Element.getBoundingClientRect"
     * target="_blank">getBoundingClientRect</a> method.
     *
     * @param r The index of the row that contains the cell.
     * @param c The index of the column that contains the cell.
     * fixme
     */
    getCellBoundingRect(r: number, c: number): Rectangle;
    /**
     *
     * gets the range of cells currently visible,
     * optionally adding a buffer for inertial scrolling
     */
    _getViewRange(bufferRows: boolean, bufferCols: boolean): CellRange;
    _getFrozenPos(): Point;
    private _cacheMap;
    getItems(): any[];
}
