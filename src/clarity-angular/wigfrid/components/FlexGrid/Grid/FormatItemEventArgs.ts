import {CellRangeEventArgs} from "./CellRangeEventArgs";
import {GridPanel} from "./GridPanel";
import {CellRange} from "./CellRange";
import {asType} from "../../../core/index";


/**
 * Provides arguments for the @see:formatItem event.
 */
export class FormatItemEventArgs extends CellRangeEventArgs {
    _cell: HTMLElement;

    /**
     * Initializes a new instance of a @see:FormatItemEventArgs.
     *
     * @param panel @see:GridPanel that contains the range.
     * @param rng Range of cells affected by the event.
     * @param cell Element that represents the grid cell to be formatted.
     */
    constructor(panel: GridPanel, rng: CellRange, cell: HTMLElement) {
        super(panel, rng);
        this._cell = asType(cell, HTMLElement);
    }
    /**
     * Gets a reference to the element that represents the grid cell to be formatted.
     */
    get cell(): HTMLElement {
        return this._cell;
    }
}
