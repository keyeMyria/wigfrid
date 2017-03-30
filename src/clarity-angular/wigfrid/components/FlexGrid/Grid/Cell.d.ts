import { GridPanel } from "./GridPanel";
import { CellType } from "./enum/CellType";
import { CellRange } from "./CellRange";
import { CellStatus } from "./enum/CellStatus";
export declare class Cell {
    private gridPanel;
    rowIndex: number;
    columnIndex: number;
    private cellStatus;
    CellRange: CellRange;
    constructor(gridPanel: GridPanel, rowIndex: number, columnIndex: number);
    readonly cellType: CellType;
    readonly viewRange: CellRange;
    readonly width: any;
    readonly height: any;
    readonly content: HTMLElement | any;
    status: CellStatus;
    startEdit(): void;
    endEdit(): void;
    readonly column: any;
    readonly row: any;
    readonly renderTemplate: any;
}
