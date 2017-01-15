import {Component, ViewChild, EventEmitter, Input, Output, ChangeDetectionStrategy} from "@angular/core";
import {Orientation} from "./enum/orientation";
import {ScrollBarTrack} from "./scroll-bar-track";
import {DragDeltaEvent} from "./EventData/DragDeltaEvent";
import {DragStartedEvent} from "./EventData/DragStartedEvent";
import {ScrollEventType, ScrollEvent} from "./EventData/ScrollEvent";
import {ScrollBarThumb} from "./scroll-bar-thumb";
import {MAX_SCROLLBAR_SIZE} from "./const";
import {Point, clamp, isNumber, isPresent} from "../core/index";

@Component(
    {
        selector: "scroll-bar",
        template: `
    <template [ngIf]="orientation === 'Horizontal' && visibility">
        <!-- track -->
        <scroll-bar-track 
        [style.width.px]="viewportSize"
         style="height:7px; position:absolute; left:2px; right:2px; bottom: 2px; "
        >
             <scroll-bar-thumb
             [style.left.px]="scrollBarOffset"
            (dragStarted)="onThumbDragStarted($event)"
            (dragDelta)="onThumbDragDelta($event)"
            (dragCompleted)="onThumbDragCompleted($event)"
            [thumbLength] = "thumbLength"
            ></scroll-bar-thumb>
        </scroll-bar-track>
        <!-- thumb -->
       
    </template>
    <template [ngIf]="orientation === 'Vertical' && visibility">
        <!-- track -->
        <scroll-bar-track
        [style.height.px]="viewportSize"
         style="width:7px; position: absolute; right: 2px; top: 2px; bottom: 2px;"
        >
            <!-- thumb -->
            <scroll-bar-thumb
            [style.top.px]="scrollBarOffset"
            (dragStarted)="onThumbDragStarted($event)"
            (dragDelta)="onThumbDragDelta($event)"
            (dragCompleted)="onThumbDragCompleted($event)"
            [thumbLength]="thumbLength"
            ></scroll-bar-thumb>
        </scroll-bar-track>
        
    </template>
`,
        changeDetection: ChangeDetectionStrategy.OnPush,
        styles: [
            `scroll-bar-track {
                position: absolute;
                display: block;
                border-radius: 7px;
                background: palevioletred; 
                opacity: 0.2;
                z-index: 90;
            }`,
            `scroll-bar-thumb {
                background: rgb(0, 0, 0);
                /*width: 7px;*/
                position: absolute;
                /*top: 0px;*/
                /*opacity: 0.4;*/
                display: block;
                border-radius: 7px;
                z-index: 99;
                width: inherit;
                height: inherit;
                /*left: 1px;*/
                /*height: 65.9824px;*/
    
            }`,
            `:host {
            /*position:relative;*/
            /*display:block;*/
        }`],
    }
)
/**
 * Scroll should have four sub component,
 * track, thumb, increment button, decrement button.
 */
export class ScrollBar {


    constructor() {
        this._thumbOffset = new Point(0, 0);
    }

    _thumbOffset: Point;
    _hasScrolled: boolean;
    _previousOffset: number;

    private _minimum;
    private _maximum;

    /**
     * 获取或设置范围控件的当前值。
     */
    private _value = 0;
    get value() {
        return this._value;
    }

    @Input()
    set value(value) {
        if (isNumber(value) && this.track && this.thumb) {
            this._value = value = clamp(value, this._minimum, this._maximum);
            let trackLength, thumbLength;
            if (this.orientation == Orientation.Horizontal) {
                trackLength = this.track.trackWidth;
                thumbLength = this.thumb.thumbWidth;
            } else {
                trackLength = this.track.trackHeight;
                thumbLength = this.thumb.thumbHeight;
            }
            this._scrollBarOffset = clamp(
                value / Math.max(0, this._maximum - this._minimum) * (trackLength - thumbLength),
                0,
                trackLength - thumbLength
            );
        }
    }

    @Output()
    valueChange = new EventEmitter();

    /**
     * <b>minimum of the scroll value</b>
     * <p>
     * the scroll value is the content offset value
     * for example, a content initial with offset top 20px, height 100px, viewport height 40px,
     * then the range of content top offset is [20, 80].
     * </p>
     * <p>
     * another advance feature is that when content present huge of info,
     * its hard to control scrollbar to see the micro nearby content,
     * then you can change the minimum and maximum value(such of use case when user press the win/command with dragging the scrollbar)
     * then the user will only can control scrollbar in range [minimum, maximum].
     * </p>
     */
    @Input()
    get minimum(): number {
        if (!isNumber(this._minimum)) {
            throw new Error("the minimum of the scroll value must be set")
        }
        return this._minimum;
    }

    set minimum(value: number) {
        this._minimum = value;
    }

    /**
     * <b>maximum of the scroll value</b>
     * <p>
     * the scroll value is the content offset value
     * for example, a content initial with offset top 20px, height 100px, viewport height 40px,
     * then the range of content top offset is [20, 80].
     * </p>
     * <p>
     * another advance feature is that when content present huge of info,
     * its hard to control scrollbar to see the micro nearby content,
     * then you can change the minimum and maximum value(such of use case when user press the win/command with dragging the scrollbar)
     * then the user will only can control scrollbar in range [minimum, maximum].
     * </p>
     */
    @Input()
    get maximum(): number {
        if (!isNumber(this._maximum)) {
            throw new Error("the maximum of the scroll value must be set")
        }
        return this._maximum;
    }

    set maximum(value: number) {
        this._maximum = value;
    }

    /**
     * 可见内容
     *
     * the content viewport length, as same as the scrollbar length(the track length)
     */
    @Input()
    public viewportSize;

    /**
     * whether the scrollbar is visibility
     */
    @Input()
    visibility;

    /**
     * 水平显示还是垂直显示
     */
    @Input()
    public orientation: Orientation;

    @ViewChild(ScrollBarTrack, {read: ScrollBarTrack})
    public track;

    @ViewChild(ScrollBarThumb, {read: ScrollBarThumb})
    public thumb: ScrollBarThumb;


    public scrollEvent = new EventEmitter();

    protected onThumbDragStarted(e: DragStartedEvent) {
        this._hasScrolled = false;
        this._previousOffset = this._value;
    }

    protected onThumbDragDelta(e: DragDeltaEvent) {
        this._hasScrolled = true;
        console.log("horizontalChange:", e.HorizontalChange, "verticalChange", e.VerticalChange);
        this.updateValue(
            e.HorizontalChange + this._thumbOffset.x,
            e.VerticalChange + this._thumbOffset.y
        );

    }

    protected onThumbDragCompleted(thumbDragCompletedEvent) {
        if (!this._hasScrolled) {
            return;
        }
        this.finishDrag();
        this.raiseScrollEvent(ScrollEventType.EndScroll);
    }

    private finishDrag() {

    }

    private raiseScrollEvent(scrollType: ScrollEventType) {
        this.scrollEvent.emit(new ScrollEvent(scrollType, this._value));
        this.valueChange.emit(this._value);
    }

    maxPerpendicularDelta = 150;

    private updateValue(horizontalDragDelta: number, verticalDragDelta: number) {
        if (this.track) {
            let offsetDelta = this.track.valueFromDistance(horizontalDragDelta, verticalDragDelta);
            if (isFinite(offsetDelta) && offsetDelta != 0) {
                let currentOffset = this.scrollBarOffset;
                let newOffset = currentOffset + offsetDelta;

                let perpendicularDragDelta;
                if (this.orientation == Orientation.Horizontal) {
                    perpendicularDragDelta = Math.abs(horizontalDragDelta);
                } else {
                    perpendicularDragDelta = Math.abs(verticalDragDelta);
                }

                if (perpendicularDragDelta > this.maxPerpendicularDelta) {
                    newOffset = this._previousOffset;
                }

                this._hasScrolled = true;
                // this._value = clamp(newValue, this.minimum, this.maximum);
                this.scrollBarOffset = newOffset;
                this.raiseScrollEvent(ScrollEventType.ThumbTrack);
            }
        }

    }

    _scrollBarOffset = 0;

    get scrollBarOffset() {

        if (!this.track && !this.thumb) {
            return 0;
        }
        return this._scrollBarOffset;

        // let range = Math.max(0, this.maximum - this.minimum);
        // let offset = Math.min(range, this._value - this.minimum);
        //
        // let trackLength, thumbLength;
        // if (this.orientation == Orientation.Horizontal) {
        //     trackLength = this.track.trackWidth;
        //     thumbLength = this.thumb.thumbWidth;
        // } else {
        //     trackLength = this.track.trackHeight;
        //     thumbLength = this.thumb.thumbHeight;
        // }
        //
        // return (offset / range) * (trackLength - thumbLength);
    }

    set scrollBarOffset(value) {
        let trackLength, thumbLength;
        if (this.orientation == Orientation.Horizontal) {
            trackLength = this.track.trackWidth;
            thumbLength = this.thumb.thumbWidth;
        } else {
            trackLength = this.track.trackHeight;
            thumbLength = this.thumb.thumbHeight;
        }
        value = clamp(value, 0, trackLength - thumbLength);
        this._scrollBarOffset = value;
        this._value = value / (trackLength - thumbLength) * Math.max(0, this.maximum - this._minimum);
    }

    /**
     * the scroll content size
     * @returns {any}
     */
    get presenterSize() {
        return this.maximum - this._minimum + this.viewportSize;
    }

    get thumbLength() {
        return Math.max(this.viewportSize * this.viewportSize / this.presenterSize, MAX_SCROLLBAR_SIZE);
    }

    decrease() {
        if (!this._hasScrolled) {
            this.onThumbDragStarted(new DragStartedEvent(0, 0));
        }
        this.onThumbDragDelta(new DragDeltaEvent(-10, -10));

    }

    increase() {
        if (!this._hasScrolled) {
            this.onThumbDragStarted(new DragStartedEvent(0, 0));
        }
        this.onThumbDragDelta(new DragDeltaEvent(10, 10));

    }

    ngOnChanges(change) {

    }

}
