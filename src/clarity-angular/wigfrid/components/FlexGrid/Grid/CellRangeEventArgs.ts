import {GridPanel} from './GridPanel'
import {CellRange} from './CellRange'
import {CancelEventArgs} from "../../../eventArgs/CancelEventArgs";
import {asType} from "../../../core/index";


/**
 * Provides arguments for @see:CellRange events.
 */
export class CellRangeEventArgs extends CancelEventArgs {
    _panel: GridPanel;
    _rng: CellRange;

    /**
     * Initializes a new instance of a @see:CellRangeEventArgs.
     *
     * @param panel @see:GridPanel that contains the range.
     * @param rng Range of cells affected by the event.
     */
    constructor(panel: GridPanel, rng: CellRange) {
        super();
        this._panel = asType(panel, GridPanel);
        this._rng = asType(rng, CellRange);
    }
    /**
     * Gets the @see:GridPanel affected by this event.
     */
    get panel(): GridPanel {
        return this._panel;
    }
    /**
     * Gets the @see:CellRange affected by this event.
     */
    get cellRange(): CellRange {
        return this._rng.clone();
    }
    /**
     * Gets the row affected by this event.
     */
    get row(): number {
        return this._rng.row;
    }
    /**
     * Gets the column affected by this event.
     */
    get col(): number {
        return this._rng.col;
    }
}
