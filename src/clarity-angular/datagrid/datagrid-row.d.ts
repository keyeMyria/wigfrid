import { EventEmitter } from "@angular/core";
import { Selection, SelectionType } from "./providers/selection";
import { RowActionService } from "./providers/row-action-service";
export declare class DatagridRow {
    selection: Selection;
    rowActionService: RowActionService;
    id: string;
    SELECTION_TYPE: typeof SelectionType;
    /**
     * Model of the row, to use for selection
     */
    item: any;
    constructor(selection: Selection, rowActionService: RowActionService);
    private _selected;
    /**
     * Indicates if the row is selected
     */
    selected: boolean;
    selectedChanged: EventEmitter<boolean>;
    toggle(selected?: boolean): void;
}
