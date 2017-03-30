import { GridPanel } from './GridPanel';
import { CellRange } from './CellRange';
import { CancelEventArgs } from "../../../eventArgs/CancelEventArgs";
/**
 * Provides arguments for @see:CellRange events.
 */
export declare class CellRangeEventArgs extends CancelEventArgs {
    _panel: GridPanel;
    _rng: CellRange;
    /**
     * Initializes a new instance of a @see:CellRangeEventArgs.
     *
     * @param panel @see:GridPanel that contains the range.
     * @param rng Range of cells affected by the event.
     */
    constructor(panel: GridPanel, rng: CellRange);
    /**
     * Gets the @see:GridPanel affected by this event.
     */
    readonly panel: GridPanel;
    /**
     * Gets the @see:CellRange affected by this event.
     */
    readonly cellRange: CellRange;
    /**
     * Gets the row affected by this event.
     */
    readonly row: number;
    /**
     * Gets the column affected by this event.
     */
    readonly col: number;
}
