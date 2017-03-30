import {GridPanel} from "./GridPanel";
import {CellRange} from "./CellRange";
import {Point, isNumber} from "../../../core/index";
import {HeadersVisibility} from "./enum/HeadersVisibility";
import {CellType} from "./enum/CellType";
import {FlexGridComponent} from "./FlexGridComponent";

enum HitEdge {
    Left   = 0x1,
    Top    = 0x2,
    Right  = 0x4,
    Bottom = 0x8
}

/**
 * Contains information about the part of a @see:FlexGrid control that exists at
 * a specified page coordinate.
 */
export class HitTestInfo {
    _g: FlexGridComponent;
    _p: GridPanel;
    _pt: Point;
    _row             = -1;
    _col             = -1;
    _edge            = 0; // left, top, right, bottom: 1, 2, 4, 8
    static _EDGESIZE = 5; // distance to cell border

    /**
     * Initializes a new instance of a @see:HitTestInfo object.
     *
     * @param grid The @see:FlexGrid control or @see:GridPanel to investigate.
     * @param pt The @see:Point object in page coordinates to investigate.
     */
    constructor(grid: FlexGridComponent| GridPanel, pt: any) {

        // check parameters
        if (grid instanceof FlexGridComponent) {
            this._g = <FlexGridComponent>grid;
        } else if (grid instanceof GridPanel) {
            this._p = <GridPanel>grid;
            grid    = this._g = this._p.grid;
        } else {
            throw 'First parameter should be a FlexGrid or GridPanel.';
        }
        if (isNumber(pt.pageX) && isNumber(pt.pageY)) {
            pt = new Point(pt.pageX, pt.pageY);
        } else if (!(pt instanceof Point)) {
            throw 'Second parameter should be a MouseEvent or wijmo.Point.';
        }
        this._pt = pt.clone();

        // get the variables we need
        let rc     = (<FlexGridComponent>grid).controlRect,
            tlp    = (<FlexGridComponent>grid).topLeftCells,
            hdrVis = (<FlexGridComponent>grid).headersVisibility,
            hdrWid = (hdrVis & HeadersVisibility.Row) ? tlp.columns.getTotalSize() : 0,
            hdrHei = (hdrVis & HeadersVisibility.Column) ? tlp.rows.getTotalSize() : 0,
            sp     = (<FlexGridComponent>grid).scrollPosition;

        // convert page to control coordinates
        pt.x -= rc.left;
        pt.y -= rc.top;

        // account for right to left
        if (this._g._rtl) {
            pt.x = rc.width - pt.x;
        }

        // find out which panel was clicked
        if (
            this._p == null &&
            pt.x >= 0 &&
            pt.y >= 0 &&
            (<FlexGridComponent>grid).clientSize &&
            pt.x <= (<FlexGridComponent>grid).clientSize.width + hdrWid &&
            pt.y <= (<FlexGridComponent>grid).clientSize.height + hdrHei
        ) {
            if (pt.x <= hdrWid && pt.y <= hdrHei) {
                this._p = (<FlexGridComponent>grid).topLeftCells;
            } else if (pt.x <= hdrWid) {
                this._p = (<FlexGridComponent>grid).rowHeaders;
            } else if (pt.y <= hdrHei) {
                this._p = (<FlexGridComponent>grid).columnHeaders;
            } else {
                this._p = (<FlexGridComponent>grid).cells;
            }
        }

        // if we have a panel, get the coordinates
        if (this._p != null) {

            // account for frozen rows/cols
            let rows  = this._p.rows,
                cols  = this._p.columns,
                ct    = this._p.cellType,
                ptFrz = this._p._getFrozenPos();
            if (ct == CellType.Cell || ct == CellType.RowHeader) {
                pt.y -= hdrHei;
                if (pt.y > ptFrz.y) {
                    pt.y += sp.y /*+ this._p._getOffsetY()*/;
                }
            }
            if (ct == CellType.Cell || ct == CellType.ColumnHeader) {
                pt.x -= hdrWid;
                if (pt.x > ptFrz.x) {
                    pt.x += sp.x;
                }
            }

            // get row and column
            this._row = pt.y > rows.getTotalSize() ? -1 : rows.getItemAt(pt.y);
            this._col = pt.x > cols.getTotalSize() ? -1 : cols.getItemAt(pt.x);
            if (this._row < 0 || this._col < 0) {
                this._p = null;
                return;
            }

            // get edges
            this._edge = 0;
            let sz     = HitTestInfo._EDGESIZE;
            if (this._col > -1) {
                let col = cols[this._col];
                if (pt.x - col.pos <= sz) this._edge |= HitEdge.Left; // left
                if (col.pos + col.renderSize - pt.x <= sz) this._edge |= HitEdge.Right; // right
            }
            if (this._row > -1) {
                let row = rows[this._row];
                if (pt.y - row.pos <= sz) this._edge |= HitEdge.Top; // top
                if (row.pos + row.renderSize - pt.y <= sz) this._edge |= HitEdge.Bottom; // bottom
            }
        }
    }

    /**
     * Gets the point in control coordinates that the HitTestInfo refers to.
     */
    get point(): Point {
        return this._pt;
    }

    /**
     * Gets the cell type at the specified position.
     */
    get cellType(): CellType {
        return this._p ? this._p.cellType : CellType.None;
    }

    /**
     * Gets the grid panel at the specified position.
     */
    get gridPanel(): GridPanel {
        return this._p;
    }

    /**
     * Gets the row index of the cell at the specified position.
     */
    get row(): number {
        return this._row;
    }

    /**
     * Gets the column index of the cell at the specified position.
     */
    get col(): number {
        return this._col;
    }

    /**
     * Gets the cell range at the specified position.
     */
    get cellRange(): CellRange {
        return new CellRange(this._row, this._col);
    }

    /**
     * Gets a value indicating whether the mouse is near the left edge of the cell.
     */
    get edgeLeft(): boolean {
        return (this._edge & HitEdge.Left) != 0;
    }

    /**
     * Gets a value indicating whether the mouse is near the top edge of the cell.
     */
    get edgeTop(): boolean {
        return (this._edge & HitEdge.Top) != 0;
    }

    /**
     * Gets a value indicating whether the mouse is near the right edge of the cell.
     */
    get edgeRight(): boolean {
        return (this._edge & HitEdge.Right) != 0;
    }

    /**
     * Gets a value indicating whether the mouse is near the bottom edge of the cell.
     */
    get edgeBottom(): boolean {
        return (this._edge & HitEdge.Bottom) != 0;
    }
}

