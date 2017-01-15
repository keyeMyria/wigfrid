import { Row } from "./RowColumn";
import { Column } from "./RowColumn";
import { GridPanel } from "./GridPanel";
import { CellType } from "./enum/CellType";
import { CellRange } from "./CellRange";
import { CellStatus } from "./enum/CellStatus";
import { ColumnDefinition } from "./Definition/ColumnDefinition";
export class Cell {

    private cellStatus;

    public CellRange: CellRange;

    constructor(private gridPanel: GridPanel,
                private row: Row,
                private column: Column) {

    }

    public row: Row;
    public column: Column;

    public get cellType(): CellType {
        return this.gridPanel.cellType;
    }

    get viewRange(): CellRange {
        return this.gridPanel._getViewRange(false, false);
    }

    public get width() {
        return this.column.renderWidth;
    }

    public get height() {
        return this.row.renderHeight;
    }

    public get content(): HTMLElement|any {
        return this.gridPanel.getCellData(this.row.index, this.column.index, false);
    }

    public status: CellStatus;

    public startEdit() {
        this.cellStatus = CellStatus.Editing;
    }

    public endEdit() {
        this.cellStatus = CellStatus.Idle;
    }

    get renderTemplate() {
        if(this.gridPanel.cellType == CellType.ColumnHeader) {
            return (<ColumnDefinition>this.column).headerTemplate;
        }
        if (this.cellStatus != CellStatus.Editing) {
            return (<ColumnDefinition>this.column).cellTemplate;
        } else {
            if (this.gridPanel.cellType == CellType.ColumnHeader ||
                this.gridPanel.cellType == CellType.RowHeader ||
                this.gridPanel.cellType == CellType.TopLeft
            ) {
                return (<ColumnDefinition>this.column).cellTemplate;
            }else{
                return (<ColumnDefinition>this.column).cellEditingTemplate;
            }
        }
    }
}
