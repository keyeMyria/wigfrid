export declare class DragCompletedEvent {
    private _horizontalChange;
    private _verticalChange;
    private _wasCanceled;
    readonly HorizontalChange: number;
    readonly VerticalChange: number;
    readonly Canceled: boolean;
    constructor(horizontalChange: number, verticalChange: number, canceled: boolean);
}
