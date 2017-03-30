import { EditHandlerDirective } from "./EditHandlerDirective";
import { FlexGridComponent } from "../FlexGridComponent";
/**
 * Handles the grid's keyboard commands.
 */
export declare class KeyboardHandlerDirective {
    private grid;
    private editHandler;
    _g: FlexGridComponent;
    /**
     * Initializes a new instance of a @see:_KeyboardHandler.
     *
     * @param grid @see:FlexGrid that owns this @see:_KeyboardHandler.
     * @param editHandler
     */
    constructor(grid: FlexGridComponent, editHandler: EditHandlerDirective);
    private _keyDown(e);
    private _keyPress(e);
    private _moveSel(rowMove, colMove, extend);
    private _deleteSel();
}
