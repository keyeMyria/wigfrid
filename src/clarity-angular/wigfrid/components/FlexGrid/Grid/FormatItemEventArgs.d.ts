import { CellRangeEventArgs } from "./CellRangeEventArgs";
import { GridPanel } from "./GridPanel";
import { CellRange } from "./CellRange";
/**
 * Provides arguments for the @see:formatItem event.
 */
export declare class FormatItemEventArgs extends CellRangeEventArgs {
    _cell: HTMLElement;
    /**
     * Initializes a new instance of a @see:FormatItemEventArgs.
     *
     * @param panel @see:GridPanel that contains the range.
     * @param rng Range of cells affected by the event.
     * @param cell Element that represents the grid cell to be formatted.
     */
    constructor(panel: GridPanel, rng: CellRange, cell: HTMLElement);
    /**
     * Gets a reference to the element that represents the grid cell to be formatted.
     */
    readonly cell: HTMLElement;
}
