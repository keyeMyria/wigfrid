export class DragStartedEvent {
    private _horizontalOffset: number;
    private _verticalOffset: number;

    public get HorizontalOffset() {
        return this._horizontalOffset;
    }

    public get VerticalOffset() {
        return this._verticalOffset;
    }

    public constructor(horizontalOffset, verticalOffset) {
        this._horizontalOffset = horizontalOffset;
        this._verticalOffset = verticalOffset;
    }
}
