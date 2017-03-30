import { ChangeDetectorRef } from "@angular/core";
export declare class EditHandlerWigfridGridDemo {
    private _cdr;
    _flexGrid: any;
    data: any;
    constructor(_cdr: ChangeDetectorRef);
    scrollPosition: any;
    onScrollPositionChanged(scrollPosition: any): void;
    ngAfterViewInit(): void;
}
