import { EventEmitter, ElementRef, QueryList, AfterViewInit, OnDestroy } from "@angular/core";
import { RowActionService } from "./providers/row-action-service";
export declare class DatagridActionOverflow implements OnDestroy, AfterViewInit {
    private elementRef;
    private rowActionService;
    constructor(elementRef: ElementRef, rowActionService: RowActionService);
    private position;
    menu: QueryList<ElementRef>;
    ngAfterViewInit(): void;
    private _menuSubscription;
    ngOnDestroy(): void;
    /**
     * Tracks whether the action overflow menu is open or not
     */
    private _open;
    open: boolean;
    openChanged: EventEmitter<boolean>;
    /**
     * Shows/hides the action overflow menu
     */
    toggle(): void;
    onMouseClick(target: any): void;
}
