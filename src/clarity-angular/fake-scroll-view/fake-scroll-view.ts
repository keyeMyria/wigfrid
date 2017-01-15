import {
    Component,
    Input,
    ViewChild,
    OnInit,
    ElementRef,
    AfterContentInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    NgZone,
    Output,
    EventEmitter
} from "@angular/core";
import {FakeScrollViewContentPresenter} from "./fake-scroll-view-content-presenter";
import {SCROLL_LINE_DELTA, SCROLL_MOUSE_WHEEL_DELTA} from "./consts";
import {Vector, Point, clamp, isNumber} from "../core/index";

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
@Component(
    {
        selector: 'fake-scroll-view',
        template: `
    <!-- content wrapper -->
    <fake-scroll-view-content-presenter
    [style.width.px]="viewportWidth"
    [style.height.px]="viewportHeight"
    
    (offsetPointChange)="onOffsetPointChange($event)"
    (offsetPointPercentChange)="onOffsetPointPercentChange($event)"
    (horizontalOffsetChange)="onHorizontalOffsetChange($event)"
    (horizontalOffsetPercentChange)="onHorizontalOffsetPercentChange($event)"
    (verticalOffsetChange)="onVerticalOffsetChange($event)"
    (verticalOffsetPercentChange)="onVerticalOffsetPercentChange($event)"
    >
    <!--(contentWidthChange)="onContentWidthChange($event)"-->
    <!--(contentHeightChange)="onContentHeightChange($event)"-->
        <ng-content></ng-content>
    </fake-scroll-view-content-presenter>
    <!-- horizontal scrollbar -->
    <scroll-bar
    [orientation]="'Horizontal'"
    [minimum]="0"
    [maximum]="realMaxHorizontalOffset"
    [viewportSize]="viewportWidth"
    [value] = "contentPresenter.horizontalOffset"
    (valueChange)="contentPresenter.setHorizontalOffset($event)"
    [visibility]="true"
    >
    </scroll-bar>
    <!-- vertical scrollbar -->
    <scroll-bar
    [orientation]="'Vertical'"
    [minimum]="0"
    [maximum]="realMaxVerticalOffset"
    [viewportSize]="viewportHeight"
    [value]="contentPresenter.verticalOffset"
    (valueChange)="contentPresenter.setVerticalOffset($event)"
    [visibility]="true"
    >
    
    </scroll-bar>
`,
        styles: [`:host {
                position: relative;
                display: block;
            }
            :host fake-scroll-view-content-presenter {
                overflow: hidden;
                position: relative;
                display: block;
                border: none;
            }
          `
        ],
        host: {
            // 'style.overflow': '"hidden"',
            // 'style.position': '"relative"',
            // 'style.display': '"block"',
            '[style.width.px]': "viewportWidth",
            '[style.height.px]': "viewportHeight"
        },
        changeDetection: ChangeDetectionStrategy.OnPush,
    }
)
export class FakeScrollView implements OnInit, AfterContentInit {

    private _viewportHeight;
    private _viewportWidth;

    // private _contentHeight;
    // private _contentWidth;

    private _horizontalScrollableMinimum;
    private _horizontalScrollableMaximum;

    private _verticalScrollableMinimum;
    private _verticalScrollableMaximum;

    private _contentWidth;
    private _contentHeight;

    public static MAX_CONTENT_WIDTH  = 10000;
    public static MAX_CONTENT_HEIGHT = 10000;

    //region readonly property

    get presenterWidth() {
        return this.contentPresenter.presenterWidth;
    }

    get presenterHeight() {
        return this.contentPresenter.presenterHeight;
    }

    //endregion

    get realHorizontalOffset() {
        if (this.contentWidth && this.contentWidth != this.presenterWidth) {
            if (isNumber(this.horizontalScrollableMinimum) && isNumber(this.horizontalScrollableMaximum)) {
                return this.contentPresenter.horizontalOffsetPercent * (this.horizontalScrollableMaximum - this.horizontalScrollableMinimum)
                    + this.horizontalScrollableMinimum;
            } else {
                return this.contentPresenter.horizontalOffsetPercent * this.realMaxHorizontalOffset;
            }
        }
        return this.contentPresenter.horizontalOffsetPercent * this.realMaxHorizontalOffset;
    }

    get realVerticalOffset() {
        if (this.contentHeight && this.contentHeight != this.presenterHeight) {
            if (isNumber(this.verticalScrollableMinimum) && isNumber(this.verticalScrollableMaximum)) {
                return this.contentPresenter.verticalOffsetPercent * (this.verticalScrollableMaximum - this.verticalScrollableMinimum)
                    + this.verticalScrollableMinimum;
            } else {
                return this.contentPresenter.verticalOffsetPercent * this.realMaxVerticalOffset;
            }
        }
        return this.contentPresenter.verticalOffsetPercent * this.realMaxVerticalOffset;
    }

    setHorizontalOffset(value: number) {
        let contentOffset = this.getHorizontalOffsetPercent(value) * this.contentPresenter.maxHorizontalOffset;
        this.contentPresenter.setHorizontalOffset(contentOffset);
    }

    setVerticalOffset(value: number) {
        let contentOffset = this.getVerticalOffsetPercent(value) * this.contentPresenter.maxVerticalOffset;
        this.contentPresenter.setVerticalOffset(contentOffset);
    }

    //region scroll control

    lineUp() {
        this.setVerticalOffset(this.realVerticalOffset - SCROLL_LINE_DELTA);
    }

    lineDown() {
        this.setVerticalOffset(this.realVerticalOffset + SCROLL_LINE_DELTA);
    }

    lineLeft() {
        this.setHorizontalOffset(this.realHorizontalOffset - SCROLL_LINE_DELTA);
    }

    lineRight() {
        this.setHorizontalOffset(this.realHorizontalOffset + SCROLL_LINE_DELTA);
    }

    pageUp() {
        this.setVerticalOffset(this.realVerticalOffset - this.viewportHeight);
    }

    pageDown() {
        this.setVerticalOffset(this.realVerticalOffset + this.viewportHeight);
    }

    pageLeft() {
        this.setHorizontalOffset(this.realHorizontalOffset - this.viewportWidth);
    }

    pageRight() {
        this.setHorizontalOffset(this.realHorizontalOffset + this.viewportWidth);
    }

    mouseWheelUp() {
        this.setVerticalOffset(this.realVerticalOffset - SCROLL_MOUSE_WHEEL_DELTA);
    }

    mouseWheelDown() {
        this.setVerticalOffset(this.realVerticalOffset + SCROLL_MOUSE_WHEEL_DELTA);
    }

    mouseWheelLeft() {
        this.setHorizontalOffset(this.realHorizontalOffset - SCROLL_MOUSE_WHEEL_DELTA);
    }

    mouseWheelRight() {
        this.setHorizontalOffset(this.realHorizontalOffset + SCROLL_MOUSE_WHEEL_DELTA);
    }

    //endregion


    /**
     * viewportHeight
     * @returns {any}
     */
    @Input()
    get viewportHeight() {
        return this._viewportHeight;
    }

    set viewportHeight(value: number) {
        this._viewportHeight = value;
    }

    /**
     * viewportWidth
     * if input not set the viewport, then it will use render clientWidth instead
     * @returns {any}
     */
    @Input()
    get viewportWidth() {
        return this._viewportWidth;
    }

    set viewportWidth(value: number) {
        this._viewportWidth = value;
    }

    /**
     * implicit set real content Height;
     * @returns {any}
     */
    @Input()
    get contentHeight() {
        if (this._contentHeight) {
            return this._contentHeight;
        } else {
            return this.presenterHeight;
        }
    }

    set contentHeight(value: number) {
        this._contentHeight = value;
    }

    /**
     * implicit set real content Height;
     * @returns {any}
     */
    @Input()
    get contentWidth() {
        if (this._contentWidth) {
            return this._contentWidth;
        } else {
            return this.presenterWidth;
        }
    }

    set contentWidth(value: number) {
        this._contentWidth = value;
    }

    @ViewChild(FakeScrollViewContentPresenter, {read: ElementRef})
    contentPresenterRef;

    @ViewChild(FakeScrollViewContentPresenter, {read: FakeScrollViewContentPresenter})
    contentPresenter;

    @Input()
    get horizontalScrollableMinimum() {
        return this._horizontalScrollableMinimum;
    }

    set horizontalScrollableMinimum(value: number) {
        this._horizontalScrollableMinimum = value;
    }

    @Input()
    get horizontalScrollableMaximum() {
        return this._horizontalScrollableMaximum;
    }

    set horizontalScrollableMaximum(value: number) {
        this._horizontalScrollableMaximum = value;
    }

    @Input()
    get verticalScrollableMinimum() {
        return this._verticalScrollableMinimum;
    }

    set verticalScrollableMinimum(value: number) {
        this._verticalScrollableMinimum = value;
    }

    @Input()
    get verticalScrollableMaximum() {
        return this._verticalScrollableMaximum;
    }

    set verticalScrollableMaximum(value: number) {
        this._verticalScrollableMaximum = value;
    }

    @Input()
    offsetPointPercent: Vector;

    @Input()
    horizontalOffset: number;

    @Input()
    horizontalOffsetPercent: number;

    @Input()
    verticalOffset: number;

    @Input()
    verticalOffsetPercent: number;

    @Output()
    offsetPointChange: EventEmitter = new EventEmitter;

    @Output()
    offsetPointPercentChange: EventEmitter = new EventEmitter;

    @Output()
    horizontalOffsetChange: EventEmitter = new EventEmitter;

    @Output()
    horizontalOffsetPercentChange: EventEmitter = new EventEmitter;

    @Output()
    verticalOffsetChange: EventEmitter = new EventEmitter;

    @Output()
    verticalOffsetPercentChange: EventEmitter = new EventEmitter;


    onOffsetPointChange(value: Point) {

        let realOffsetPoint = value.clone();
        realOffsetPoint.x   = this.realHorizontalOffset;
        realOffsetPoint.y   = this.realVerticalOffset;
        this.offsetPointChange.emit(realOffsetPoint);
    }

    onOffsetPointPercentChange(value: Vector) {
        this.offsetPointPercentChange.emit(value);
    }

    onHorizontalOffsetChange(value: number) {
        this.horizontalOffsetChange.emit(this.realHorizontalOffset);
    }

    onHorizontalOffsetPercentChange(value: number) {
        this.horizontalOffsetPercentChange.emit(value);
    }

    onVerticalOffsetChange(value: number) {
        this.verticalOffsetChange.emit(this.realVerticalOffset);
    }

    onVerticalOffsetPercentChange(value: number) {
        this.verticalOffsetPercentChange.emit(value);
    }

    // onContentWidthChange(value: number) {
    //     this._contentWidth = value;
    // }
    //
    // onContentHeightChange(value: number) {
    //     this._contentHeight = value;
    // }

    get realMaxHorizontalOffset() {
        if (this.contentWidth) {
            return Math.max(0, this.contentWidth - this.viewportWidth);
        } else {
            return this.contentPresenter.maxHorizontalOffset;
        }
    }

    get realMaxVerticalOffset() {
        if (this.contentHeight) {
            return Math.max(0, this.contentHeight - this.viewportHeight);
        } else {
            return this.contentPresenter.maxVerticalOffset;
        }
    }

    realPointMapToContent(point: Point) {
        return new Point(
            this.realHorizontalMapToContent(point.x),
            this.realVerticalMapToContent(point.y)
        );
    }

    realHorizontalMapToContent(offset: number) {
        return this.getHorizontalOffsetPercent(offset) * this.contentPresenter.maxHorizontalOffset;
    }

    realVerticalMapToContent(offset: number) {
        return this.getVerticalOffsetPercent(offset) * this.contentPresenter.maxVerticalOffset;
    }

    public getHorizontalOffsetPercent(offset: number) {
        if (isNumber(this.horizontalScrollableMinimum) && isNumber(this.horizontalScrollableMaximum)) {
            return clamp((offset - this.horizontalScrollableMinimum) / (this.horizontalScrollableMaximum - this.horizontalScrollableMinimum), 0, 1);
        } else {
            return offset / this.realMaxHorizontalOffset;
        }
    }

    public getVerticalOffsetPercent(offset: number) {
        if (isNumber(this.verticalScrollableMinimum) && isNumber(this.verticalScrollableMaximum)) {
            return clamp((offset - this.verticalScrollableMinimum) / (this.verticalScrollableMaximum - this.verticalScrollableMinimum), 0, 1);
        } else {
            return offset / this.realMaxVerticalOffset;
        }
    }

    get realHorizontalOffsetPercent() {
        return this.getHorizontalOffsetPercent(this.realHorizontalOffset);
    }

    get realVerticalOffsetPercent() {
        return this.getVerticalOffsetPercent(this.realVerticalOffset);
    }

    get horizontalDelta() {
        return this.realHorizontalOffsetPercent * this.contentPresenter.maxHorizontalOffset - this.realHorizontalOffset;
    }

    get verticalDelta() {
        return this.realVerticalOffsetPercent * this.contentPresenter.maxVerticalOffset - this.realVerticalOffset;
    }

    //region ng Methods
    ngOnInit() {
        // this.init();
    }

    ngAfterContentInit() {

    }

    ngAfterContentChecked() {

    }

    ngAfterViewInit() {

    }

    //endregion

    constructor(private cdRef: ChangeDetectorRef,
                private _ngZone: NgZone,
                private _cdRef: ChangeDetectorRef) {

    }

    //region test
    public onValueChange() {

    }

    //endregion
}
