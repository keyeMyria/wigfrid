import { QueryList } from "@angular/core";
import { ColumnCollection } from "../RowColumn/ColumnCollection";
import { FlexGridComponent } from "../FlexGridComponent";
import { Column } from "../RowColumn/Column";
export declare class ColumnsDefinition extends ColumnCollection {
    constructor(grid: FlexGridComponent);
    columns: QueryList<Column>;
}
