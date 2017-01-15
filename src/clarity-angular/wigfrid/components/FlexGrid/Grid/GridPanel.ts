import {Row, RowCollection, Column, ColumnCollection, GroupRow} from "./RowColumn";
import {CellRange} from "./CellRange";
import {CollectionViewGroup} from "../../../collections/CollectionViewGroup";
import {Globalize} from "../../../core/index";
import {CellType} from "./enum/CellType";
import {
    asType,
    asInt,
    tryCast,
    asNumber,
    isString,
    DataType,
    getType,
    isBoolean,
    Point,
    Rectangle
} from "../../../core/index";
import {Aggregate} from "../../../enum/Aggregate";
import {Cell} from "./Cell";
import {FlexGridDirective} from "./FlexGridDirective";
/**
 * Represents a logical part of the grid, such as the column headers, row headers,
 * and scrollable data part.
 */
export abstract class GridPanel {
    private _g: FlexGridDirective;
    private _ct: CellType;
    // private _e: HTMLElement;
    protected _rows: RowCollection;
    protected _cols: ColumnCollection;
    private _rng: CellRange; // buffered view range

    protected scrollPosition;

    private cachedCellMap: Map<any, Map<any, any>> = new Map();

    public hostElement;

    /**
     * Initializes a new instance of a @see:GridPanel.
     *
     * @param grid The @see:FlexGrid object that owns the panel.
     * @param cellType The type of cell in the panel.
     */
    constructor(grid: FlexGridDirective,
                cellType: CellType,
                // rows: RowCollection,
                // cols: ColumnCollection,
                /*element: HTMLElement*/) {
        this._g  = asType(grid, FlexGridDirective);
        this._ct = asInt(cellType);
        // this._rows = asType(rows, RowCollection);
        // this._cols = asType(cols, ColumnCollection);
        // this._e = asType(element, HTMLElement);
        this._rng = new CellRange();
    }

    /**
     * Gets the grid that owns the panel.
     */
    get grid(): FlexGridDirective {
        return this._g;
    }

    /**
     * Gets the type of cell contained in the panel.
     */
    get cellType(): CellType {
        return this._ct;
    }

    /**
     * Gets a @see:CellRange that indicates the range of cells currently visible on the panel.
     */
    get viewRange(): CellRange {
        return this._getViewRange(false, false);
    }

    /**
     * Gets the total width of the content in the panel.
     */
    get width(): number {
        return this._cols.getTotalSize();
    }

    /**
     * Gets the total height of the content in this panel.
     */
    get height(): number {
        return this._rows.getTotalSize();
    }

    /**
     * Gets the panel's row collection.
     */
    get rows(): RowCollection {
        return this._rows;
    }

    /**
     * Gets the panel's column collection.
     */
    get columns(): ColumnCollection {
        return this._cols;
    }

    get draggable(): boolean {
        return false;
    }

    getMicroCell() {
    }

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
    getCellData(r: number, c: number, formatted: boolean): any {
        const col = <Column>this._cols[c],
              row = <Row>this._rows[r];
        let value = null;
        // get bound value from data item using binding
        if (col.binding && row.dataItem && !(row.dataItem instanceof CollectionViewGroup)) { // TFS 108841
            value = col._binding.getValue(row.dataItem);
        } else if (row._ubv) { // get unbound value
            value = row._ubv[col._hash];
        }
        // special values for row and column headers, aggregates
        if (value == null) {
            switch (this._ct) {
                case CellType.ColumnHeader:
                    if (r == this._rows.length - 1 && col.header) {
                        value = col.header;
                    }
                    break;
                case CellType.Cell:
                    if (col.aggregate != Aggregate.None && row instanceof GroupRow) {
                        const group = <CollectionViewGroup>tryCast(row.dataItem, CollectionViewGroup);
                        if (group) {
                            value = group.getAggregate(col.aggregate, col.binding, this._g.collectionView);
                        }
                    }
                    break;
            }
        }
        // format value if requested, never return null
        if (formatted) {
            if (this.cellType == CellType.Cell && col.dataMap) {
                value = col.dataMap.getDisplayValue(value);
            }
            value = value != null ? Globalize.format(value, col.format) : '';
        }
        // done
        return value;
    }

    /**
     * Sets the content of a cell in the panel.
     *
     * @param r The index of the row that contains the cell.
     * @param c The index, name, or binding of the column that contains the cell.
     * @param value The value to store in the cell.
     * @param coerce A value indicating whether to change the value automatically to match the column's data type.
     * @return Returns true if the value is stored successfully, false otherwise (failed cast).
     */
    setCellData(r: number, c: any, value: any, coerce = false): boolean {
        const row = <Row>this._rows[asNumber(r, false, true)];
        let col: Column;
        // get column index by name or binding
        if (isString(c)) {
            c = this._cols.indexOf(c);
            if (c < 0) {
                throw 'Invalid column name or binding.';
            }
        }
        // get column
        col = <Column>this._cols[asNumber(c, false, true)];
        // handle dataMap, coercion, type-checking
        if (this._ct == CellType.Cell) {

            // honor dataMap
            if (col.dataMap && value != null) {
                if (col.required || (value != '' && value != null)) { // TFS 107058
                    value = col.dataMap.getKeyValue(value);
                    if (value == null) return false; // not in map
                }
            }
            // get target type
            let targetType = DataType.Object;
            if (col.dataType) {
                targetType = col.dataType;
            } else {
                const current = this.getCellData(r, c, false);
                targetType    = getType(current);
            }
            // honor 'required' property
            if (isBoolean(col.required)) {
                if (!col.required && (value === '' || value === null)) {
                    value  = null; // setting to null
                    coerce = false;
                } else if (col.required && (value === '' || value === null)) {
                    return false; // value is required
                }
            }
            // coerce type if required
            if (coerce) {
                value = changeType(value, targetType, col.format);
                if (targetType != DataType.Object && getType(value) != targetType) {
                    return false; // wrong data type
                }
            }
        }
        // store value
        if (row.dataItem && col.binding) {
            col._binding.setValue(row.dataItem, value);
        } else {
            if (!row._ubv) row._ubv = {};
            row._ubv[col._hash] = value;
        }
        // done
        return true;
    }

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
    getCellBoundingRect(r: number, c: number): Rectangle {

        // get rect in panel coordinates
        const row = this.rows[r],
              col = this.columns[c],
              rc  = new Rectangle(col.pos, row.pos, col.renderSize, row.renderSize);
        // ajust for rtl
        if (this._g._rtl) {
            rc.left = this.hostElement.offsetWidth - rc.right;
        }
        // adjust for panel position
        const rcp = this.hostElement.getBoundingClientRect();
        rc.left += rcp.left;
        rc.top += rcp.top;
        // account for frozen rows/columns (TFS 105593)
        if (r < this.rows.frozen) {
            rc.top -= this._g.scrollPosition.y;
        }
        if (c < this.columns.frozen) {
            rc.left -= this._g.scrollPosition.x;
        }
        // done
        return rc;
    }

    // /**
    //  * Gets the host element for the panel.
    //  */
    // get hostElement(): HTMLElement {
    // 	return this._e;
    // }
    // ** implementation
    /* -- do not document, this is internal --
     * Gets the Y offset for cells in the panel.
     */
    // _getOffsetY(): number {
    //     return this._offsetY;
    // }

    /**
     *
     * gets the range of cells currently visible,
     * optionally adding a buffer for inertial scrolling
     */
    _getViewRange(bufferRows: boolean, bufferCols: boolean): CellRange {
        const g    = this._g,            // sp   = g._ptScrl,
              sp   = this.scrollPosition,
              rows = this._rows,
              cols = this._cols,
              rng  = new CellRange(0, 0, rows.length - 1, cols.length - 1);
        // no buffer if there are frozen rows/columns
        if (rows.frozen > 0 || cols.frozen > 0) {
            bufferRows = bufferCols = false;
        }
        let rectangle = new Rectangle(0, 0, g.clientSize.width + 1, g.clientSize.height + 1);
        //scrollbar offset
        rectangle.offset(sp.x, sp.y);
        //frozen rows
        let fzRows = Math.min(rows.frozen, rows.length - 1);
        if (fzRows > 0) {
            let fzs = rows[fzRows - 1].pos;
            rectangle.offset(0, fzs);
            rectangle.height -= fzs;
        }
        let fzCols = Math.min(cols.frozen, cols.length - 1);
        // account for frozen columns
        if (fzCols > 0) {
            var fzs = cols[fzCols - 1].pos;
            rectangle.offset(fzs, 0);
            rectangle.width -= fzs;
        }
        //bufferRows and bufferCols
        if (bufferRows) {
            rectangle.inflate(0, rectangle.height / 2)
        }
        if (bufferCols) {
            rectangle.inflate(rectangle.width, 0);
        }
        // calculate range
        if (this._ct == CellType.Cell || this._ct == CellType.RowHeader) {
            // set row range
            if (rows.length <= rows.frozen) {
                rng.row = rng.row2 = -1;
            } else {
                rng.row  = Math.min(rows.length - 1, Math.max(rows.frozen, rows.getItemAt(rectangle.y)));
                rng.row2 = rows.getItemAt(rectangle.bottom);
            }
        }
        if (this._ct == CellType.Cell || this._ct == CellType.ColumnHeader) {
            // set column range
            if (cols.length <= cols.frozen) {
                rng.col = rng.col2 = -1;
            } else {
                rng.col  = Math.min(cols.length - 1, Math.max(cols.frozen, cols.getItemAt(rectangle.x)));
                rng.col2 = cols.getItemAt(rectangle.right);
            }
        }
        // return viewrange
        return rng;
    }

    // gets the point where the frozen area ends
    _getFrozenPos(): Point {
        const fzr   = this._rows.frozen,
              fzc   = this._cols.frozen,
              fzrow = fzr > 0 ? this._rows[fzr - 1] : null,
              fzcol = fzc > 0 ? this._cols[fzc - 1] : null,
              fzy   = fzrow ? fzrow.pos + fzrow.renderSize : 0,
              fzx   = fzcol ? fzcol.pos + fzcol.renderSize : 0;
        return new Point(fzx, fzy);
    }

    //region transform
    localPosition;

    localRotate;

    localScale;


    private _cacheMap = new Map();

    // [Symbol.iterator]() {
    //     let rng = this._getViewRange(false, false);
    //     console.debug(`view range [TBLR]: ${rng.topRow} ${rng.bottomRow} ${rng.leftCol} ${rng.rightCol}`);
    //     let currentRowIndex = rng.topRow, currentColumnIndex = rng.leftCol - 1;
    //     return {
    //         next: () => {
    //             let cachedCell, columnMap;
    //             while (currentRowIndex <= rng.bottomRow) {
    //                 while (++currentColumnIndex <= rng.rightCol) {
    //                     if (columnMap = this.cachedCellMap.get(this.rows[currentRowIndex])) {
    //                         if (cachedCell = columnMap.get(this.columns[currentColumnIndex])) {
    //                             return {value: cachedCell, done: false};
    //                         }
    //                     } else {
    //                         columnMap = new Map();
    //                         this.cachedCellMap.set(this.rows[currentRowIndex], columnMap);
    //                     }
    //                     let cell = new Cell(this, this.rows[currentRowIndex], this.columns[currentColumnIndex]);
    //                     columnMap.set(this.columns[currentColumnIndex], cell);
    //                     return {value: cell, done: false}
    //                 }
    //                 currentColumnIndex = -1;
    //                 ++currentRowIndex;
    //             }
    //             return {value: void 0, done: true}
    //         }
    //     }
    // }

    private _rowColumnCacheMap = new Map();

    [Symbol.iterator]() {
        let rng = this._getViewRange(false, false);
        console.debug(`view range [TRBL]: ${rng.topRow} ${rng.rightCol} ${rng.bottomRow} ${rng.leftCol}`);
        let currentRowIndex = rng.topRow, currentColumnIndex = rng.leftCol - 1;
        return {
            next: () => {
                while (currentRowIndex <= rng.bottomRow) {
                    while (++currentColumnIndex <= rng.rightCol) {
                        let cacheKey   = GridPanel._getRowColumnKeyName(this.rows[currentRowIndex], this.columns[currentColumnIndex]);
                        let cachedCell = this._rowColumnCacheMap.get(cacheKey);
                        if (!cachedCell) {
                            let cachedCell = new Cell(this, this.rows[currentRowIndex], this.columns[currentColumnIndex]);
                            this._rowColumnCacheMap.set(cacheKey, cachedCell);
                        }
                        return {value: cachedCell, done: false}

                    }
                    currentColumnIndex = -1;
                    ++currentRowIndex;
                }
                return {value: void 0, done: true}
            }
        }
    }

    private static _getRowColumnKeyName(rowIndex, columnIndex) {
        return `row: ${rowIndex}, column: ${columnIndex}`;
    }


    public getItems() {
        let results = [];
        let rng     = this._getViewRange(false, false);
        for (let r = rng.topRow; r <= rng.bottomRow && r > -1; r++) {
            for (let c = rng.leftCol; c <= rng.rightCol && c > -1; c++) {
                let hash = `${r.toString(26)}#${c.toString(26)}`;
                if (this._cacheMap.has(hash)) {
                    results.push(this._cacheMap.get(hash));
                } else {
                    let cell = new Cell(this, this.rows[r], this.columns[c]);
                    this._cacheMap.set(hash, cell);
                    results.push(cell);
                }
            }
        }
        return results;
    }

    // async [Symbol.iterator]() {
    //     let rng = this._getViewRange(false, false);
    //     for (let rowIndex = rng.topRow; rowIndex < rng.bottomRow; ++rowIndex) {
    //         for (let columnIndex = rng.leftCol; columnIndex < rng.rightCol; ++columnIndex) {
    //             await new Cell(this, this.rows[rowIndex], this.columns[columnIndex]);
    //         }
    //     }
    // }

    // $$iterator() {
    //     let rng = this._getViewRange(false, false);
    //     for (let rowIndex = rng.topRow; rowIndex < rng.bottomRow; ++rowIndex) {
    //         for (let columnIndex = rng.leftCol; columnIndex < rng.rightCol; ++columnIndex) {
    //             yeild
    //             new Cell(this, this.rows[rowIndex], this.columns[columnIndex]);
    //         }
    //     }
    // }
}
