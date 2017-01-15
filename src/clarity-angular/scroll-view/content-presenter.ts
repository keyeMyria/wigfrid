import {
    Directive,
    ElementRef,
    Input,
    NgZone,
    EventEmitter,
    OnDestroy,
    ChangeDetectorRef,
    Renderer,
    Output,
    AfterViewInit
} from "@angular/core";
import {Point, clamp, Vector} from "../core/index";
import {SCROLL_LINE_DELTA, SCROLL_MOUSE_WHEEL_DELTA} from "./consts";

@Directive(
    {
        selector: 'content-presenter',
        host: {
            '[style.overflow-x]': "canHorizontallyScroll === true ? 'auto' : (canHorizontallyScroll === false ? 'hidden' : null)",
            '[style.overflow-y]': "canVerticallyScroll === true ? 'auto' : (canVerticallyScroll === false ? 'hidden' : null)"
        },
    }
)
export class ContentPresenter implements OnDestroy, AfterViewInit {
    // viewportSize: Size;
    // presenterSize: Size;
    lastOffsetPoint: Point;

    private _canHorizontallyScroll;
    private _canVerticallyScroll;

    //region methods

    movetoPoint(offsetPoint: Point) {
        if (!this.lastOffsetPoint || !this.lastOffsetPoint.equals(offsetPoint)) {
            this.offsetPointChange.emit(offsetPoint);
            this.offsetPointPercentChange.emit(this.offsetPercent);
            if (this.lastOffsetPoint.x != offsetPoint.x) {
                this.horizontalOffsetChange.emit(this.horizontalOffset);
                this.horizontalOffsetPercentChange.emit(this.horizontalOffsetPercent);
            }
            if (this.lastOffsetPoint.y != offsetPoint.y) {
                this.verticalOffsetChange.emit(this.verticalOffset);
                this.verticalOffsetPercentChange.emit(this.verticalOffsetPercent);
            }
            this.lastOffsetPoint = offsetPoint;
        }
    }

    lineUp() {
        this.setVerticalOffset(this.verticalOffset - SCROLL_LINE_DELTA);
    }

    lineDown() {
        this.setVerticalOffset(this.verticalOffset + SCROLL_LINE_DELTA);
    }

    lineLeft() {
        this.setHorizontalOffset(this.horizontalOffset - SCROLL_LINE_DELTA);
    }

    lineRight() {
        this.setHorizontalOffset(this.horizontalOffset + SCROLL_LINE_DELTA);
    }

    pageUp() {
        this.setVerticalOffset(this.verticalOffset - this.viewportHeight);
    }

    pageDown() {
        this.setVerticalOffset(this.verticalOffset + this.viewportHeight);
    }

    pageLeft() {
        this.setHorizontalOffset(this.horizontalOffset - this.viewportWidth);
    }

    pageRight() {
        this.setHorizontalOffset(this.horizontalOffset + this.viewportWidth);
    }

    mouseWheelUp() {
        this.setVerticalOffset(this.verticalOffset - SCROLL_MOUSE_WHEEL_DELTA);
    }

    mouseWheelDown() {
        this.setVerticalOffset(this.verticalOffset + SCROLL_MOUSE_WHEEL_DELTA);
    }

    mouseWheelLeft() {
        this.setHorizontalOffset(this.horizontalOffset - SCROLL_MOUSE_WHEEL_DELTA);
    }

    mouseWheelRight() {
        this.setHorizontalOffset(this.horizontalOffset + SCROLL_MOUSE_WHEEL_DELTA);
    }

    //endregion

    //region property

    get maxHorizontalOffset() {
        return this.presenterWidth - this.viewportWidth;
    }

    get maxVerticalOffset() {
        return this.presenterHeight - this.viewportHeight;
    }

    /**
     * canHorizontallyScroll
     */
    @Input()
    get canHorizontallyScroll() {
        if (this.presenterWidth > this.viewportWidth) {
            this._canHorizontallyScroll = true;
            return true;
        } else {
            return this._canHorizontallyScroll;
        }
    }

    set canHorizontallyScroll(value) {
        this._canHorizontallyScroll = value;
    }

    /**
     * canVerticallyScroll
     */
    @Input()
    get canVerticallyScroll() {
        if (this.presenterHeight > this.viewportHeight) {
            this._canVerticallyScroll = true;
            return true;
        } else {
            return this._canVerticallyScroll;
        }
    }

    set canVerticallyScroll(value) {
        this._canVerticallyScroll = value;
    }

    get presenterWidth() {
        return (<HTMLElement>this.elementRef.nativeElement).scrollWidth;
    }

    get presenterHeight() {
        return (<HTMLElement>this.elementRef.nativeElement).scrollHeight;
    }

    get viewportWidth() {
        return (<HTMLElement>this.elementRef.nativeElement).clientWidth;
    }

    get viewportHeight() {
        return (<HTMLElement>this.elementRef.nativeElement).clientHeight;
    }

    get horizontalOffset() {
        return (<HTMLElement>this.elementRef.nativeElement).scrollLeft;
    }

    set horizontalOffset(value) {
        this._renderer.setElementProperty(<HTMLElement>this.elementRef.nativeElement, 'scrollLeft', value);
    }

    get verticalOffset() {
        return (<HTMLElement>this.elementRef.nativeElement).scrollTop;
    }

    set verticalOffset(value) {
        this._renderer.setElementProperty(<HTMLElement>this.elementRef.nativeElement, 'scrollTop', value);
    }

    @Input()
    get offsetPoint() {
        return new Point(this.horizontalOffset, this.verticalOffset);
    }

    set offsetPoint(offsetPoint: Point) {
        if (this.horizontalOffset != offsetPoint.x) {
            this.setHorizontalOffset(offsetPoint.x);
        } else if (this.verticalOffset != offsetPoint.y) {
            this.setVerticalOffset(offsetPoint.y);
        }
    }

    get offsetPercent() {
        return new Vector(this.horizontalOffsetPercent, this.verticalOffsetPercent);
    }

    get horizontalOffsetPercent() {
        if (this.maxHorizontalOffset > 0) {
            return clamp(this.horizontalOffset / this.maxHorizontalOffset, 0, 1);
        }
        return 0;
    }

    @Input()
    set horizontalOffsetPercent(value) {
        value = clamp(value, 0, 1);
        this.setHorizontalOffset(value * this.maxHorizontalOffset);
    }

    get verticalOffsetPercent() {
        if (this.maxVerticalOffset > 0) {
            return clamp(this.verticalOffset / this.maxVerticalOffset, 0, 1);
        }
        return 0;
    }

    @Input()
    set verticalOffsetPercent(value) {
        value = clamp(value, 0, 1);
        this.setVerticalOffset(value * this.maxVerticalOffset);
    }

    //endregion

    private setHorizontalOffset(offset: number) {
        if (this.canHorizontallyScroll) {
            offset = clamp(offset, 0, this.maxHorizontalOffset);
            this.horizontalOffset = offset;
            this.offsetPointChange.emit(this.offsetPoint);
            this.offsetPointPercentChange.emit(this.offsetPercent);
            this.horizontalOffsetChange.emit(offset);
            this.horizontalOffsetPercentChange.emit(this.horizontalOffsetPercent);
            this._cdRef.markForCheck();
        }
    }

    private setVerticalOffset(offset) {
        if (this.canVerticallyScroll) {
            offset = clamp(offset, 0, this.maxVerticalOffset);
            this.verticalOffset = offset;
            this.offsetPointChange.emit(this.offsetPoint);
            this.offsetPointPercentChange.emit(this.offsetPercent);
            this.verticalOffsetChange.emit(offset);
            this.verticalOffsetPercentChange.emit(this.verticalOffsetPercent);
            this._cdRef.markForCheck();
        }
    }

    //region event

    @Output()
    offsetPointChange: EventEmitter<any> = new EventEmitter();

    @Output()
    offsetPointPercentChange: EventEmitter<any> = new EventEmitter();

    @Output()
    horizontalOffsetChange: EventEmitter<any> = new EventEmitter();

    @Output()
    horizontalOffsetPercentChange: EventEmitter<any> = new EventEmitter();

    @Output()
    verticalOffsetChange: EventEmitter<any> = new EventEmitter();

    @Output()
    verticalOffsetPercentChange: EventEmitter<any> = new EventEmitter();

    //endregion

    //region internal methods
    init() {
        this._scrollChangeSubscribe = this.offsetPointChange.subscribe((offsetPoint) => this.onScrollChange(offsetPoint));
        this._scrollListenerSubscribe = this.addScrollListener();

    }

    private _scrollListenerSubscribe;

    private addScrollListener() {
        let scrollElement = <HTMLElement>this.elementRef.nativeElement;
        if (!scrollElement) {
            return;
        }

        let handler = this.onScroll.bind(this);
        scrollElement.addEventListener('scroll', handler);

        return () => {
            scrollElement.removeEventListener('scroll', handler);
        };
    }

    onScroll(e: MouseEvent) {
        this.movetoPoint(this.offsetPoint);
    }

    private _scrollChangeSubscribe;

    onScrollChange(scrollPoint) {
        this.lastOffsetPoint = scrollPoint;
    }

    //endregion


    //region ng

    ngOnInit() {
        this.init();
    }

    ngAfterViewInit() {
        this.movetoPoint(new Point(0, 0));
    }

    ngOnDestroy() {
        this._scrollChangeSubscribe.unsubscribe();
        this._scrollListenerSubscribe();
    }

    //endregion


    constructor(private elementRef: ElementRef,
                private _ngZone: NgZone,
                private _cdRef: ChangeDetectorRef,
                private _renderer: Renderer) {

    }

    async [Symbol.iterator]() {
        await 1;
    }

    [Symbol.hasInstance](instance) {
        // return instance instanceof ScrollInfo;
    }
}
