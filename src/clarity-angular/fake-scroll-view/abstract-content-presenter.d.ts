export declare abstract class AbstractContentPresenter {
    verticalOffset: number;
    horizontalOffset: number;
    viewportHeight: number;
    viewportWidth: number;
    lineUp(): void;
    lineDown(): void;
    lineLeft(): void;
    lineRight(): void;
    pageUp(smooth?: boolean): void;
    pageDown(smooth?: boolean): void;
    pageLeft(smooth?: boolean): void;
    pageRight(smooth?: boolean): void;
    /**
     * the mouse wheel delta should be positive
     * @param wheelDelta
     */
    mouseWheelUp(wheelDelta: any): void;
    /**
     * the mouse wheel delta should be positive
     * @param wheelDelta
     */
    mouseWheelDown(wheelDelta: any): void;
    mouseWheelLeft(wheelDelta: any): void;
    mouseWheelRight(wheelDelta: any): void;
    protected abstract setHorizontalOffset(offset: number): any;
    protected abstract setVerticalOffset(offset: number): any;
}
