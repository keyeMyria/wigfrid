import { MergeManager } from "../Grid/MergeManager";
import { CellRange } from "../Grid/CellRange";
import { GridPanel } from "../Grid/GridPanel";
import { FlexGridComponent } from "../Grid/FlexGridComponent";
/**
 * Merge manager class used by the @see:FlexGridDetailProvider class.
 *
 * The @see:DetailMergeManager merges detail cells (cells in a @see:DetailRow)
 * into a single detail cell that spans all grid columns.
 */
export declare class DetailMergeManager extends MergeManager {
    /**
     * Initializes a new instance of a @see:DetailMergeManager object.
     *
     * @param grid The @see:FlexGrid object that owns this @see:DetailMergeManager.
     */
    constructor(grid: FlexGridComponent);
    /**
     * Gets a @see:CellRange that specifies the merged extent of a cell
     * in a @see:GridPanel.
     *
     * @param panel The @see:GridPanel that contains the range.
     * @param r The index of the row that contains the cell.
     * @param c The index of the column that contains the cell.
     * @param clip Whether to clip the merged range to the grid's current view range.
     * @return A @see:CellRange that specifies the merged range, or null if the cell is not merged.
     */
    getMergedRange(panel: GridPanel, r: number, c: number, clip?: boolean): CellRange;
}
