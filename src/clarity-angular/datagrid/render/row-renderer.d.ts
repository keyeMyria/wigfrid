import { QueryList, OnDestroy, AfterViewInit } from "@angular/core";
import { DatagridRenderOrganizer } from "./render-organizer";
import { DatagridCellRenderer } from "./cell-renderer";
export declare class DatagridRowRenderer implements OnDestroy, AfterViewInit {
    private organizer;
    constructor(organizer: DatagridRenderOrganizer);
    private subscription;
    ngOnDestroy(): void;
    cells: QueryList<DatagridCellRenderer>;
    private setWidths();
    ngAfterViewInit(): void;
}
