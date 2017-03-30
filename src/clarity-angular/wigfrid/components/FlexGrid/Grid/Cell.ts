import {Row} from "./RowColumn";
import {Column} from "./RowColumn";
import {GridPanel} from "./GridPanel";
import {CellType} from "./enum/CellType";
import {CellRange} from "./CellRange";
import {CellStatus} from "./enum/CellStatus";
import {ColumnDefinition} from "./Definition/ColumnDefinition";
export class Cell {

    private cellStatus;

    public CellRange: CellRange;

    constructor(private gridPanel: GridPanel,
                public rowIndex: number,
                public columnIndex: number) {

    }

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
        return this.gridPanel.getCellData(this.rowIndex, this.columnIndex, false);
    }

    public status: CellStatus;

    public startEdit() {
        this.cellStatus = CellStatus.Editing;
    }

    public endEdit() {
        this.cellStatus = CellStatus.Idle;
    }

    get column() {
        return this.gridPanel.columns[this.columnIndex];
    }

    get row() {
        return this.gridPanel.rows[this.rowIndex];
    }

    get renderTemplate() {
        if (this.gridPanel.cellType == CellType.ColumnHeader) {
            return this.column.headerTemplate;
        }
        if (this.cellStatus != CellStatus.Editing) {
            return this.column.cellTemplate;
        } else {
            if (this.gridPanel.cellType & (CellType.ColumnHeader | CellType.RowHeader | CellType.TopLeft)) {
                return this.column.cellTemplate;
            } else {
                return this.column.cellEditingTemplate;
            }
        }
    }
}
