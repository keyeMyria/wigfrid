import { CellRange } from "../CellRange";
import { Row } from "./Row";
/**
 * Represents a row that serves as a header for a group of rows.
 */
export declare class GroupRow extends Row {
    _level: number;
    /**
     * Initializes a new instance of a @see:GroupRow.
     */
    constructor();
    /**
     * Gets or sets the hierarchical level of the group associated with the GroupRow.
     */
    level: number;
    /**
     * Gets a value that indicates whether the group row has child rows.
     */
    readonly hasChildren: boolean;
    /**
     * Gets or sets a value that indicates whether the GroupRow is collapsed
     * (child rows are hidden) or expanded (child rows are visible).
     */
    isCollapsed: boolean;
    _setCollapsed(collapsed: boolean): void;
    /**
     * Gets a CellRange object that contains all of the rows in the group represented
     * by the GroupRow and all of the columns in the grid.
     */
    getCellRange(): CellRange;
}
