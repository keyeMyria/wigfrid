import { OnInit, AfterContentInit, ChangeDetectorRef, NgZone, EventEmitter } from "@angular/core";
import { Vector, Point } from "../core/index";
/**
 *
 * the reason of
 *
 * we could remove
 * - horizontalOffsetChange
 * - horizontalOffsetPercentChange
 * - verticalOffsetChange
 * - verticalOffsetPercentChange
 * this will make code become more brief
 *
 * ## input
 * horizontalScrollableMinimum
 * horizontalScrollableMaximum
 * verticalScrollableMinimum
 * verticalScrollableMaximum
 *
 *
 * scrollbar is should behave as native browser scrollbar, so the scrollbar change event should effect direct to content
 * presenter
 */
export declare class FakeScrollView implements OnInit, AfterContentInit {
    private cdRef;
    private _ngZone;
    private _cdRef;
    private _viewportHeight;
    private _viewportWidth;
    private _horizontalScrollableMinimum;
    private _horizontalScrollableMaximum;
    private _verticalScrollableMinimum;
    private _verticalScrollableMaximum;
    private _contentWidth;
    private _contentHeight;
    static MAX_CONTENT_WIDTH: number;
    static MAX_CONTENT_HEIGHT: number;
    readonly presenterWidth: any;
    readonly presenterHeight: any;
    readonly realHorizontalOffset: number;
    readonly realVerticalOffset: number;
    setHorizontalOffset(value: number): void;
    setVerticalOffset(value: number): void;
    lineUp(): void;
    lineDown(): void;
    lineLeft(): void;
    lineRight(): void;
    pageUp(): void;
    pageDown(): void;
    pageLeft(): void;
    pageRight(): void;
    mouseWheelUp(): void;
    mouseWheelDown(): void;
    mouseWheelLeft(): void;
    mouseWheelRight(): void;
    /**
     * viewportHeight
     * @returns {any}
     */
    viewportHeight: number;
    /**
     * viewportWidth
     * if input not set the viewport, then it will use render clientWidth instead
     * @returns {any}
     */
    viewportWidth: number;
    /**
     * implicit set real content Height;
     * @returns {any}
     */
    contentHeight: number;
    /**
     * implicit set real content Height;
     * @returns {any}
     */
    contentWidth: number;
    contentPresenterRef: any;
    contentPresenter: any;
    horizontalScrollableMinimum: number;
    horizontalScrollableMaximum: number;
    verticalScrollableMinimum: number;
    verticalScrollableMaximum: number;
    offsetPointPercent: Vector;
    horizontalOffset: number;
    horizontalOffsetPercent: number;
    verticalOffset: number;
    verticalOffsetPercent: number;
    offsetPointChange: EventEmitter<any>;
    offsetPointPercentChange: EventEmitter<any>;
    horizontalOffsetChange: EventEmitter<any>;
    horizontalOffsetPercentChange: EventEmitter<any>;
    verticalOffsetChange: EventEmitter<any>;
    verticalOffsetPercentChange: EventEmitter<any>;
    onOffsetPointChange(value: Point): void;
    onOffsetPointPercentChange(value: Vector): void;
    onHorizontalOffsetChange(value: number): void;
    onHorizontalOffsetPercentChange(value: number): void;
    onVerticalOffsetChange(value: number): void;
    onVerticalOffsetPercentChange(value: number): void;
    readonly realMaxHorizontalOffset: any;
    readonly realMaxVerticalOffset: any;
    realPointMapToContent(point: Point): Point;
    realHorizontalMapToContent(offset: number): number;
    realVerticalMapToContent(offset: number): number;
    getHorizontalOffsetPercent(offset: number): number;
    getVerticalOffsetPercent(offset: number): number;
    readonly realHorizontalOffsetPercent: number;
    readonly realVerticalOffsetPercent: number;
    readonly horizontalDelta: number;
    readonly verticalDelta: number;
    ngOnInit(): void;
    ngAfterContentInit(): void;
    ngAfterContentChecked(): void;
    ngAfterViewInit(): void;
    constructor(cdRef: ChangeDetectorRef, _ngZone: NgZone, _cdRef: ChangeDetectorRef);
    onValueChange(): void;
}
