import { FlexGridComponent } from "../FlexGridComponent";
/**
 * Manages the new row template used to add rows to the grid.
 */
export declare class AddNewHandlerDirective {
    private _g;
    private _nrt;
    /**
     * Initializes a new instance of an @see:_AddNewHandler.
     *
     * @param grid @see:FlexGrid that owns this @see:_AddNewHandler.
     */
    constructor(grid: FlexGridComponent);
    /**
     * Update the new row template to ensure it's visible only if the grid is bound
     * to a data source that supports adding new items, and that it is in the
     * right position.
     */
    updateNewRowTemplate(): void;
    private _beginningEdit(e);
    private _rowEditEnded(e);
}
