import { EventEmitter } from "@angular/core";
import { Orientation } from "./enum/orientation";
import { DragDeltaEvent } from "./EventData/DragDeltaEvent";
import { DragStartedEvent } from "./EventData/DragStartedEvent";
import { ScrollBarThumb } from "./scroll-bar-thumb";
import { Point } from "../core/index";
export declare class ScrollBar {
    constructor();
    _thumbOffset: Point;
    _hasScrolled: boolean;
    _previousOffset: number;
    private _minimum;
    private _maximum;
    /**
     * 获取或设置范围控件的当前值。
     */
    private _value;
    value: number;
    valueChange: EventEmitter<{}>;
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
    minimum: number;
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
    maximum: number;
    /**
     * 可见内容
     *
     * the content viewport length, as same as the scrollbar length(the track length)
     */
    viewportSize: any;
    /**
     * whether the scrollbar is visibility
     */
    visibility: any;
    /**
     * 水平显示还是垂直显示
     */
    orientation: Orientation;
    track: any;
    thumb: ScrollBarThumb;
    scrollEvent: EventEmitter<{}>;
    protected onThumbDragStarted(e: DragStartedEvent): void;
    protected onThumbDragDelta(e: DragDeltaEvent): void;
    protected onThumbDragCompleted(thumbDragCompletedEvent: any): void;
    private finishDrag();
    private raiseScrollEvent(scrollType);
    maxPerpendicularDelta: number;
    private updateValue(horizontalDragDelta, verticalDragDelta);
    _scrollBarOffset: number;
    scrollBarOffset: number;
    /**
     * the scroll content size
     * @returns {any}
     */
    readonly presenterSize: any;
    readonly thumbLength: number;
    decrease(): void;
    increase(): void;
    ngOnChanges(change: any): void;
}
