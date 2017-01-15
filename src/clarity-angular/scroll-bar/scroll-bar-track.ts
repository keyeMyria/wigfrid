import {Directive, ContentChild, forwardRef, Inject, ElementRef, OnChanges, Input} from "@angular/core";
import {ScrollBarThumb} from "./scroll-bar-thumb";
import {ScrollBar} from "./scroll-bar";
import {Point} from "../core/index";
import {Orientation} from "./enum/orientation";

@Directive(
    {
        selector: "scroll-bar-track",
    }
)
export class ScrollBarTrack implements OnChanges{


    constructor(protected elementRef: ElementRef,
                @Inject(forwardRef(() => ScrollBar))
                protected scrollbar) {

    }

    public decreaseRepeatButton;

    private _thumb;
    get thumb(): ScrollBarThumb {
        return this._thumb;
    }

    @ContentChild(forwardRef(() => ScrollBarThumb))
    set thumb(value) {
        this.calculatePosition();
        this._thumb = value;
    }


    public increaseRepeatButton;

    @Input()
    public value;

    public horizontalViewportSizeviewportSize;

    public isDirectionReversed: boolean;

    public density;

    // public ThumbCenterOffset: number;

    public valueFromPoint(pt: Point) {

    }

    public valueFromDistance(horizontal, vertical) {
        if (this.scrollbar.orientation == Orientation.Horizontal) {
            return horizontal /** this.density*/;
        } else {
            return vertical /** this.density*/;
        }

    }

    private calculatePosition() {


    }

    get trackWidth() {
        let element = this.elementRef.nativeElement;
        return element.offsetWidth;

    }

    get trackHeight() {
        let element = this.elementRef.nativeElement;
        return element.offsetHeight;
    }


    //region ng
    ngOnChanges() {
        let element = this.elementRef.nativeElement;
        (this.trackWidth - this.thumb.thumbLength)
    }
    //endregion

}
