import { ChangeDetectorRef } from "@angular/core";
export declare class IndicatorWigfridGridDemo {
    private _cdr;
    _flexGrid: any;
    data: any;
    constructor(_cdr: ChangeDetectorRef);
    indicatorPosition: any;
    scrollPosition: any;
    onScrollPositionChanged(scrollPosition: any): void;
    ngAfterViewInit(): void;
}
