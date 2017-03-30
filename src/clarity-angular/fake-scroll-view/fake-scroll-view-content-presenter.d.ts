import { ElementRef, NgZone, EventEmitter, OnDestroy, ChangeDetectorRef, Renderer, AfterViewInit } from "@angular/core";
import { Point, Vector } from "../core/index";
import { AbstractContentPresenter } from "./abstract-content-presenter";
export declare class FakeScrollViewContentPresenter extends AbstractContentPresenter implements OnDestroy, AfterViewInit {
    private elementRef;
    private _ngZone;
    private _cdRef;
    private _renderer;
    lastOffsetPoint: Point;
    private _canHorizontallyScroll;
    private _canVerticallyScroll;
    movetoPoint(offsetPoint: Point): void;
    readonly maxHorizontalOffset: number;
    readonly maxVerticalOffset: number;
    /**
     * canHorizontallyScroll
     */
    canHorizontallyScroll: any;
    /**
     * canVerticallyScroll
     */
    canVerticallyScroll: any;
    readonly presenterWidth: number;
    readonly presenterHeight: number;
    readonly viewportWidth: number;
    readonly viewportHeight: number;
    horizontalOffset: number;
    verticalOffset: number;
    /**
     * scroll offset point
     * @returns {Point}
     */
    offsetPoint: Point;
    readonly offsetPercent: Vector;
    horizontalOffsetPercent: number;
    verticalOffsetPercent: number;
    protected setHorizontalOffset(offset: number): void;
    protected setVerticalOffset(offset: number): void;
    offsetPointChange: EventEmitter<any>;
    offsetPointPercentChange: EventEmitter<any>;
    horizontalOffsetChange: EventEmitter<any>;
    horizontalOffsetPercentChange: EventEmitter<any>;
    verticalOffsetChange: EventEmitter<any>;
    verticalOffsetPercentChange: EventEmitter<any>;
    init(): void;
    private _scrollListenerSubscribe;
    private addScrollListener();
    onMouseWheel(e: WheelEvent): void;
    private _scrollChangeSubscribe;
    onScrollChange(scrollPoint: any): void;
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    constructor(elementRef: ElementRef, _ngZone: NgZone, _cdRef: ChangeDetectorRef, _renderer: Renderer);
    [Symbol.iterator](): Promise<void>;
    [Symbol.hasInstance](instance: any): void;
}
