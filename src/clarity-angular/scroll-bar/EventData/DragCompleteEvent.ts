export class DragCompletedEvent {
    private _horizontalChange: number;
    private _verticalChange: number;
    private _wasCanceled: boolean;

    public get HorizontalChange() {
        return this._horizontalChange;
    }

    public get VerticalChange() {
        return this._verticalChange;
    }

    public get Canceled() {
        return this._wasCanceled;
    }

    public constructor(horizontalChange: number, verticalChange: number, canceled: boolean) {
        this._horizontalChange = horizontalChange;
        this._verticalChange = verticalChange;
        this._wasCanceled = canceled;
    }
}
