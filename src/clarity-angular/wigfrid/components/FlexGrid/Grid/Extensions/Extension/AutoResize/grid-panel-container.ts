


import {Injectable} from "@angular/core";
import {FlexGridAutoResizeBindingCell} from "./flex-grid-auto-resize-binding-cell";
import {CellType} from "../../../enum/CellType";

/**
 * 一个服务供自动列布局使用
 */
@Injectable()
export class GridPanelContainer {


    constructor (){
        console.debug('grid panel container instiate time');
    }

    bindingCell: FlexGridAutoResizeBindingCell;

    public topLeftList = [];

    public columnHeaderList = [];

    public rowHeaderList = [];

    public cellList = [];


    insert(cell) {
        if (cell.cellType == CellType.TopLeft) {
            this.topLeftList.push(cell)
        } else if (cell.cellType == CellType.Cell) {
            this.cellList.push(cell);
        } else if (cell.cellType == CellType.ColumnHeader) {
            this.columnHeaderList.push(cell);
        } else if (cell.cellType == CellType.RowHeader) {
            this.rowHeaderList.push(cell);
        } else {
            throw new Error("there are unknown cell type binding to `auto resize binding cell`");
        }
    }

    remove(cell) {
        if (cell.cellType == CellType.TopLeft) {
            this.topLeftList.slice(this.topLeftList.indexOf(cell));
        } else if (cell.cellType == CellType.Cell) {
            this.cellList.slice(this.cellList.indexOf(cell));
        } else if (cell.cellType == CellType.ColumnHeader) {
            this.columnHeaderList.slice(this.columnHeaderList.indexOf(cell));
        } else if (cell.cellType == CellType.RowHeader) {
            this.rowHeaderList.slice(this.rowHeaderList.indexOf(cell));
        } else {
            throw new Error("there are unknown cell type binding to `auto resize binding cell`");
        }
    }
}
