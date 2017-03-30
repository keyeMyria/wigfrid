import { ChangeDetectorRef } from "@angular/core";
export declare class SimpleWigfridGridDemo {
    private _cdr;
    _flexGrid: any;
    data: any;
    rowIndex: any;
    rowHeight: any;
    constructor(_cdr: ChangeDetectorRef);
    scrollPosition: any;
    onScrollPositionChanged(scrollPosition: any): void;
    ngAfterViewInit(): void;
    ngDoCheck(): void;
}
