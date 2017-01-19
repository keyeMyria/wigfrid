import {
    Directive,
    EventEmitter,
    HostListener,
    Output,
    ElementRef,
    HostBinding,
    Inject,
    forwardRef,
    Input,
    OnChanges
} from "@angular/core";
import {ThumbState} from "./enum/thumb-state";
import {DragCompletedEvent} from "./EventData/DragCompleteEvent";
import {DragDeltaEvent} from "./EventData/DragDeltaEvent";
import {ScrollBarTrack} from "./scroll-bar-track";
import {ScrollBar} from "./scroll-bar";
import {Orientation} from "./enum/orientation";
import {Point} from "../core/index";
@Directive(
    {
        selector: "scroll-bar-thumb",
    }
)
export class ScrollBarThumb implements OnChanges {


    public thumbState: ThumbState;

    public isDragging: boolean;

    /**
     * 开始拖拽点
     */
    private _originThumbPoint: Point;

    private _originScreenCoordPosition: Point;

    private _previousScreenCoordPosition: Point;

    @Output()
    public dragStarted = new EventEmitter();

    @Output()
    public dragDelta = new EventEmitter();

    @Output()
    public dragCompleted = new EventEmitter();

    public cancelDrag() {
        //no dragging do nothing;

        //release dragCompleted event
    }

    constructor(private elementRef: ElementRef,
                @Inject(forwardRef(() => ScrollBarTrack))
                protected track,
                @Inject(forwardRef(() => ScrollBar))
                protected scrollbar) {
        console.log(track);
        console.log(scrollbar);

    }

    @HostListener("mousedown", ["$event"])
    public onMouseLeftButtonDown(e: MouseEvent) {
        console.log("onMouseLeftButtonDown", e);
        //no dragging then do
        if (!this.isDragging) {
            //focus me, dragging true,
            this.isDragging = true;
            this._originThumbPoint = new Point(e.x, e.y);
            this._previousScreenCoordPosition = this._originScreenCoordPosition = new Point(e.pageX, e.pageY);
            // this.dragStarted.emit(new DragStartedEvent(this._originThumbPoint.x, this._originThumbPoint.y));
            this.dragStarted.emit();
            this._mouseObservable = (() => {
                let mouseMoveFunc = this.onMouseMove.bind(this);
                let mouseUpFunc = this.onMouseLeftButtonUp.bind(this);
                document.addEventListener("mousemove", mouseMoveFunc, true);
                document.addEventListener("mouseup", mouseUpFunc, true);
                return () => {
                    document.removeEventListener("mousemove", mouseMoveFunc, true);
                    document.removeEventListener("mouseup", mouseUpFunc, true);
                }
            })();

        }

    }

    _mouseObservable;

    public onMouseLeftButtonUp(e: MouseEvent) {
        console.log("onMouseLeftButtonUp", e);
        //is dragging clear isDragging
        if (this.isDragging) {
            this.isDragging = false;
            //取消事件侦听
            this._mouseObservable();
            // let completeScreenPoint = new Point(e.pageX, e.pageY);
            this.dragCompleted.emit(new DragCompletedEvent(
                                        e.pageX - this._originScreenCoordPosition.x,
                                        e.pageY - this._originScreenCoordPosition.y,
                false
                                    )
            );

        }

        //﻿DragCompletedEventArgs
    }

    /**
     * if want to runOutsideAngular use zone.runOutsideAngular
     */
    public onMouseMove(e: MouseEvent) {
        console.log("onMouseMove", e);
        //no dragging do nothing;
        if (!this.isDragging) {
            return;
        }
        e.preventDefault();
        e.stopImmediatePropagation();
        e.stopPropagation();
        //mouse left button pressed, raise ﻿DragDeltaEvent
        if (e.button === 0) {
            let screen = new Point(e.pageX, e.pageY);
            if (screen.equals(this._previousScreenCoordPosition)) {
                return;
            }
            this.dragDelta.emit(
                new DragDeltaEvent(
                    // e.x - this._originThumbPoint.x,
                    // e.y - this._originThumbPoint.y
                    screen.x - this._previousScreenCoordPosition.x,
                    screen.y - this._previousScreenCoordPosition.y
                )
            );
            this._previousScreenCoordPosition = screen;
        } else {
            //do nothing, or reset
            this.isDragging = false;
            this._originThumbPoint.x = 0;
            this._originThumbPoint.y = 0;
        }


    }

    @HostBinding("attr.style.height")
    bindingHeight() {

    }

    bindingWidth() {

    }

    private _thumbLength;
    @Input()
    get thumbLength() {
        return this._thumbLength;
    }

    set thumbLength(value) {
        this._thumbLength = value;
    }

    @HostBinding("style.width.px")
    public thumbWidth;

    @HostBinding("style.height.px")
    public thumbHeight;

    ngOnChanges() {
        if (this.scrollbar.orientation === Orientation.Horizontal) {
            this.thumbWidth = this._thumbLength;
        } else {
            this.thumbHeight = this._thumbLength;
        }
    }
}
