import {SCROLL_LINE_DELTA, SCROLL_MOUSE_WHEEL_DELTA, SCROLL_PAGE_SMOOTH_DELTA_PERCENT} from "./consts";

export abstract class AbstractContentPresenter {
    verticalOffset: number;
    horizontalOffset: number;

    viewportHeight: number;
    viewportWidth: number;

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

    pageUp(smooth: boolean = false) {
        let offset;
        if (smooth) {
            offset = this.verticalOffset - (1 - SCROLL_PAGE_SMOOTH_DELTA_PERCENT) * this.viewportHeight
        } else {
            offset = this.verticalOffset - this.viewportHeight
        }
        this.setVerticalOffset(offset);
    }

    pageDown(smooth: boolean = false) {
        let offset;
        if (smooth) {
            offset = this.verticalOffset - (1 - SCROLL_PAGE_SMOOTH_DELTA_PERCENT) * this.viewportHeight
        } else {
            offset = this.verticalOffset - this.viewportHeight
        }
        this.setVerticalOffset(offset);
    }

    pageLeft(smooth: boolean = false) {
        let offset;
        if (smooth) {
            offset = this.horizontalOffset - (1 - SCROLL_PAGE_SMOOTH_DELTA_PERCENT) * this.viewportWidth
        } else {
            offset = this.horizontalOffset - this.viewportWidth;
        }
        this.setHorizontalOffset(offset);
    }

    pageRight(smooth: boolean = false) {
        let offset;
        if (smooth) {
            offset = this.horizontalOffset + (1 - SCROLL_PAGE_SMOOTH_DELTA_PERCENT) * this.viewportWidth
        } else {
            offset = this.horizontalOffset - this.viewportWidth;
        }
        this.setHorizontalOffset(offset);
    }

    /**
     * the mouse wheel delta should be positive
     * @param wheelDelta
     */
    mouseWheelUp(wheelDelta) {
        if (wheelDelta) {
            this.setVerticalOffset(this.verticalOffset - Math.abs(wheelDelta));
        } else {
            this.setVerticalOffset(this.verticalOffset - SCROLL_MOUSE_WHEEL_DELTA);
        }
    }

    /**
     * the mouse wheel delta should be positive
     * @param wheelDelta
     */
    mouseWheelDown(wheelDelta) {
        if (wheelDelta) {
            this.setVerticalOffset(this.verticalOffset + Math.abs(wheelDelta));
        } else {
            this.setVerticalOffset(this.verticalOffset + SCROLL_MOUSE_WHEEL_DELTA);
        }
    }

    mouseWheelLeft(wheelDelta) {
        if (wheelDelta) {
            this.setHorizontalOffset(this.horizontalOffset - Math.abs(wheelDelta))
        } else {
            this.setHorizontalOffset(this.horizontalOffset - SCROLL_MOUSE_WHEEL_DELTA);
        }
    }

    mouseWheelRight(wheelDelta) {
        if (wheelDelta) {
            this.setHorizontalOffset(this.horizontalOffset + Math.abs(wheelDelta))
        } else {
            this.setHorizontalOffset(this.horizontalOffset + SCROLL_MOUSE_WHEEL_DELTA);
        }
    }

    protected abstract  setHorizontalOffset(offset: number);

    protected abstract setVerticalOffset(offset: number);

}
