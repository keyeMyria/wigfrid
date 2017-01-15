import {MergeManager} from "../Grid/MergeManager";
import {CellRange} from "../Grid/CellRange";
import {DetailRow} from "./DetailRow";
import {CellType} from "../Grid/enum/CellType";
import {GridPanel} from "../Grid/GridPanel";
import {FlexGridDirective} from "../Grid/FlexGridDirective";


/**
 * Merge manager class used by the @see:FlexGridDetailProvider class.
 *
 * The @see:DetailMergeManager merges detail cells (cells in a @see:DetailRow)
 * into a single detail cell that spans all grid columns.
 */
export class DetailMergeManager extends MergeManager {

    /**
     * Initializes a new instance of a @see:DetailMergeManager object.
     *
     * @param grid The @see:FlexGrid object that owns this @see:DetailMergeManager.
     */
    constructor(grid: FlexGridDirective) {
        super(grid);
    }

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
    getMergedRange(panel: GridPanel, r: number, c: number, clip = true): CellRange {
        switch (panel.cellType) {

            // merge detail cells all the way across
            case CellType.Cell:
                if (panel.rows[r] instanceof DetailRow) {
                    return new CellRange(r, 0, r, panel.columns.length - 1);
                }
                break;

            // merge row headers for main and detail rows
            case CellType.RowHeader:
                if (panel.rows[r] instanceof DetailRow) {
                    return new CellRange(r - 1, c, r, c);
                } else if (r < panel.rows.length - 1 && panel.rows[r + 1] instanceof DetailRow) {
                    return new CellRange(r, c, r + 1, c);
                }
                break;
        }

        // allow base class
        return super.getMergedRange(panel, r, c, clip);
    }
}
