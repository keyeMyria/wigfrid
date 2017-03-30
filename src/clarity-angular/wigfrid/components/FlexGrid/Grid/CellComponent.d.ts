import { Injector, ElementRef } from "@angular/core";
import { Cell } from "./Cell";
import { SelectedState } from "./enum/SelectedState";
export declare class CellComponent {
    private injector;
    private elementRef;
    private _cell;
    private _mask;
    private _renderComponentRef;
    private cellStatus;
    private grid;
    /**
     * dynamicComponentLoader to load component
     * @returns {ComponentRef}
     */
    private renderComponentRef;
    selectedState: SelectedState;
    cell: Cell;
    readonly computeClass: string;
    computeClassObject(): {};
    /**
     * column mask
     * @param value
     */
    mask: any;
    private contentViewContainerRef;
    constructor(injector: Injector, elementRef: ElementRef);
    ngOnInit(): any;
    ngDoCheck(): void;
}
