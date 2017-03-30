import { ElementRef, OnChanges } from "@angular/core";
import { ScrollBarThumb } from "./scroll-bar-thumb";
import { Point } from "../core/index";
export declare class ScrollBarTrack implements OnChanges {
    protected elementRef: ElementRef;
    protected scrollbar: any;
    constructor(elementRef: ElementRef, scrollbar: any);
    decreaseRepeatButton: any;
    private _thumb;
    thumb: ScrollBarThumb;
    increaseRepeatButton: any;
    value: any;
    horizontalViewportSizeviewportSize: any;
    isDirectionReversed: boolean;
    density: any;
    valueFromPoint(pt: Point): void;
    valueFromDistance(horizontal: any, vertical: any): any;
    private calculatePosition();
    readonly trackWidth: any;
    readonly trackHeight: any;
    ngOnChanges(): void;
}
