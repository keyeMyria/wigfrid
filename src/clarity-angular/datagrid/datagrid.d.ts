import { AfterViewInit, OnDestroy, EventEmitter, QueryList, AfterContentInit } from "@angular/core";
import { DatagridItems } from "./datagrid-items";
import { DatagridRow } from "./datagrid-row";
import { DatagridPlaceholder } from "./datagrid-placeholder";
import { State } from "./interfaces/state";
import { FiltersProvider } from "./providers/filters";
import { Items } from "./providers/items";
import { Page } from "./providers/page";
import { Selection, SelectionType } from "./providers/selection";
import { Sort } from "./providers/sort";
import { RowActionService } from "./providers/row-action-service";
export declare class Datagrid implements AfterContentInit, AfterViewInit, OnDestroy {
    selection: Selection;
    private sort;
    private filters;
    private page;
    items: Items;
    rowActionService: RowActionService;
    constructor(selection: Selection, sort: Sort, filters: FiltersProvider, page: Page, items: Items, rowActionService: RowActionService);
    SELECTION_TYPE: typeof SelectionType;
    /**
     * Freezes the datagrid while data is loading
     */
    loading: boolean;
    /**
     * Output emitted whenever the data needs to be refreshed, based on user action or external ones
     */
    refresh: EventEmitter<State>;
    /**
     * Emits a State output to ask for the data to be refreshed
     */
    private triggerRefresh();
    /**
     * Public method to re-trigger the computation of displayed items manually
     */
    dataChanged(): void;
    /**
     * We grab the smart iterator from projected content
     */
    iterator: DatagridItems;
    /**
     * Array of all selected items
     */
    selected: any[];
    selectedChanged: EventEmitter<any[]>;
    /**
     * Selected item in single-select mode
     */
    singleSelected: any;
    singleSelectedChanged: EventEmitter<any>;
    /**
     * Indicates if all currently displayed items are selected
     */
    /**
     * Selects/deselects all currently displayed items
     * @param value
     */
    allSelected: boolean;
    /**
     * Custom placeholder detection
     */
    placeholder: DatagridPlaceholder;
    /**
     * When the datagrid is user-managed without the smart iterator, we get the items displayed
     * by querying the projected content. This is needed to keep track of the models currently
     * displayed, typically for selection.
     */
    rows: QueryList<DatagridRow>;
    /**
     * We get deep nested DatagridActionOverflow children components, listen to the changes in them,
     * and figure out if the datagrid has at least one actionable row.
     */
    actionableRows: QueryList<DatagridRow>;
    ngAfterContentInit(): void;
    /**
     * Our setup happens in the view of some of our components, so we wait for it to be done before starting
     */
    ngAfterViewInit(): void;
    /**
     * Subscriptions to all the services and queries changes
     */
    private _subscriptions;
    ngOnDestroy(): void;
}
