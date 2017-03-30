import { Column } from "../RowColumn/Column";
import { CellTemplate } from "./Column/CellTemplate";
import { ColumnsDefinition } from "./ColumnsDefinition";
import { HeaderTemplate } from "./Column/HeaderTemplate";
import { CellEditingTemplate } from "./Column/CellEditingTemplate";
export declare class ColumnDefinition extends Column {
    constructor(columnCollection: ColumnsDefinition);
    _cellTemplate: CellTemplate;
    cellTemplate: CellTemplate;
    _headerTemplate: HeaderTemplate;
    headerTemplate: HeaderTemplate;
    _cellEditingTemplate: CellEditingTemplate;
    cellEditingTemplate: CellEditingTemplate;
}
