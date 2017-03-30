import { ChangeDetectorRef } from "@angular/core";
export declare class MouseHandlerWigfridGridDemo {
    private _cdr;
    _flexGrid: any;
    data: any;
    constructor(_cdr: ChangeDetectorRef);
    scrollPosition: any;
    onScrollPositionChanged(scrollPosition: any): void;
    ngAfterViewInit(): void;
}
