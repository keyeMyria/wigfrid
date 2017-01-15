export class DragDeltaEvent {
    private _horizontalChange: number;
    private _verticalChange: number;

    public get HorizontalChange(): number {
        return this._horizontalChange;
    }

    public get VerticalChange(): number {
        return this._verticalChange;
    }

    constructor(horizontalChange, verticalChange) {
        this._horizontalChange = horizontalChange;
        this._verticalChange = verticalChange;
    }

}
