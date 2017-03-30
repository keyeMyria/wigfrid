import { EventEmitter, ElementRef, OnChanges } from "@angular/core";
import { ThumbState } from "./enum/thumb-state";
export declare class ScrollBarThumb implements OnChanges {
    private elementRef;
    protected track: any;
    protected scrollbar: any;
    thumbState: ThumbState;
    isDragging: boolean;
    /**
     * 开始拖拽点
     */
    private _originThumbPoint;
    private _originScreenCoordPosition;
    private _previousScreenCoordPosition;
    dragStarted: EventEmitter<{}>;
    dragDelta: EventEmitter<{}>;
    dragCompleted: EventEmitter<{}>;
    cancelDrag(): void;
    constructor(elementRef: ElementRef, track: any, scrollbar: any);
    onMouseLeftButtonDown(e: MouseEvent): void;
    _mouseObservable: any;
    onMouseLeftButtonUp(e: MouseEvent): void;
    /**
     * if want to runOutsideAngular use zone.runOutsideAngular
     */
    onMouseMove(e: MouseEvent): void;
    bindingHeight(): void;
    bindingWidth(): void;
    private _thumbLength;
    thumbLength: any;
    thumbWidth: any;
    thumbHeight: any;
    ngOnChanges(): void;
}
