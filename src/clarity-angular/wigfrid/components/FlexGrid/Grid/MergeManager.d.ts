import { GridPanel } from './GridPanel';
import { CellRange } from './CellRange';
import { FlexGridComponent } from "./FlexGridComponent";
/**
 * Specifies constants that define which areas of the grid support cell merging.
 */
export declare enum AllowMerging {
    /** No merging. */
    None = 0,
    /** Merge scrollable cells. */
    Cells = 1,
    /** Merge column headers. */
    ColumnHeaders = 2,
    /** Merge row headers. */
    RowHeaders = 4,
    /** Merge column and row headers. */
    AllHeaders = 6,
    /** Merge all areas. */
    All = 7,
}
/**
 * Defines the @see:FlexGrid's cell merging behavior.
 *
 * An instance of this class is automatically created and assigned to
 * the grid's @see:mergeManager property to implement the grid's default
 * merging behavior.
 *
 * If you want to customize the default merging behavior, create a class
 * that derives from @see:MergeManager and override the @see:getMergedRange method.
 */
export declare class MergeManager {
    _g: FlexGridComponent;
    /**
     * Initializes a new instance of a @see:MergeManager object.
     *
     * @param grid The @see:FlexGrid object that owns this @see:MergeManager.
     */
    constructor(grid: FlexGridComponent);
    /**
     * Gets a @see:CellRange that specifies the merged extent of a cell
     * in a @see:GridPanel.
     *
     * @param panel The @see:GridPanel that contains the range.
     * @param r The index of the row that contains the cell.
     * @param c The index of the column that contains the cell.
     * @return A @see:CellRange that specifies the merged range, or null if the cell is not merged.
     */
    getMergedRange(panel: GridPanel, r: number, c: number): CellRange;
    /**
     * Returns true if the caller queries for a supported interface.
     *
     * @param interfaceName Name of the interface to look for.
     * @return True if the caller queries for a supported interface.
     */
    implementsInterface(interfaceName: string): boolean;
}
