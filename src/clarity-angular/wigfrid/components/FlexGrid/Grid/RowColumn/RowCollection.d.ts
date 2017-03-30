import { RowColCollection } from "./RowColCollection";
import { FlexGridComponent } from "../FlexGridComponent";
/**
 * Represents a collection of @see:Row objects in a @see:FlexGrid control.
 */
export declare class RowCollection extends RowColCollection {
    _maxLevel: number;
    constructor(grid: FlexGridComponent, defaultSize?: number);
    /**
     * Gets the maximum group level in the grid.
     *
     * @return The maximum group level or -1 if the grid has no group rows.
     * @deprecated
     */
    readonly maxGroupLevel: number;
    _update(): boolean;
}
