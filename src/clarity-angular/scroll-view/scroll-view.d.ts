import { OnInit, AfterContentInit, ChangeDetectorRef, NgZone, EventEmitter } from "@angular/core";
import { Vector, Point } from "../core/index";
export declare class ScrollView implements OnInit, AfterContentInit {
    private cdRef;
    private _ngZone;
    private _offsetPoint;
    private _viewportHeight;
    private _viewportWidth;
    private _contentHeight;
    private _contentWidth;
    private _horizontalScrollableMinimum;
    private _horizontalScrollableMaximum;
    private _verticalScrollableMinimum;
    private _verticalScrollableMaximum;
    static MAX_CONTENT_WIDTH: number;
    static MAX_CONTENT_HEIGHT: number;
    ngOnInit(): void;
    ngAfterContentInit(): void;
    ngAfterContentChecked(): void;
    ngAfterViewInit(): void;
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
    offsetPoint: Point;
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
    constructor(cdRef: ChangeDetectorRef, _ngZone: NgZone);
}
