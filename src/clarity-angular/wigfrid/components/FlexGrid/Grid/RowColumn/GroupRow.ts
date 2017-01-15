import {CellRange} from "../CellRange";
import {tryCast, asInt, asBoolean} from "../../../../core/index";
import {Row} from "./Row";
import {CellRangeEventArgs} from "../CellRangeEventArgs";
import {RowColFlags} from "../enum/RowColFlags";


/**
 * Represents a row that serves as a header for a group of rows.
 */
export class GroupRow extends Row {
    _level = -1;

    /**
     * Initializes a new instance of a @see:GroupRow.
     */
    constructor() {
        super();
        this.isReadOnly = true; // group rows are read-only by default
    }
    /**
     * Gets or sets the hierarchical level of the group associated with the GroupRow.
     */
    get level(): number {
        return this._level;
    }
    set level(value: number) {
        asInt(value);
        if (value != this._level) {
            this._level = value;
            this.onPropertyChanged();
        }
    }
    /**
     * Gets a value that indicates whether the group row has child rows.
     */
    get hasChildren(): boolean {
        let rNext = null,
            gr = null;
        if (this.grid != null && this._list != null) {

            // get the next row
            this._list._update();
            if (this.index < this._list.length - 1) {
                rNext = this._list[this.index + 1];
            }

            // check if it's a group row
            gr = tryCast(rNext, GroupRow);

            // return true if there is a next row and it's a data row or a deeper group row
            return rNext && (gr == null || gr.level > this.level);
        }
        return true;
    }
    /**
     * Gets or sets a value that indicates whether the GroupRow is collapsed
     * (child rows are hidden) or expanded (child rows are visible).
     */
    get isCollapsed(): boolean {
        return this._getFlag(RowColFlags.Collapsed);
    }
    set isCollapsed(value: boolean) {
        asBoolean(value);
        if (value != this.isCollapsed && this._list != null) {
            this._setCollapsed(value);
        }
    }

    // sets the collapsed/expanded state of a group row
    _setCollapsed(collapsed: boolean) {
        let self = this,
            g = this.grid,
            rows = g.rows,
            rng = this.getCellRange(),
            e = new CellRangeEventArgs(g.cells, new CellRange(this.index, -1)),
            gr: GroupRow;

        // fire GroupCollapsedChanging
        g.onGroupCollapsedChanging(e);

        // if user canceled, or edits failed, bail out
        if (e.cancel) { // && TODO: grid.FinishEditing()) {
            return;
        }

        // apply new value
        g.deferUpdate(function () {

            // collapse/expand this group
            self._setFlag(RowColFlags.Collapsed, collapsed);
            for (let r = rng.topRow + 1; r <= rng.bottomRow && r > -1 && r < rows.length; r++) {

                // apply state to this row
                rows[r]._setFlag(RowColFlags.ParentCollapsed, collapsed);

                // if this is a group, skip range to preserve the original state
                gr = tryCast(rows[r], GroupRow);
                if (gr != null && gr.isCollapsed) {
                    r = gr.getCellRange().bottomRow;
                }
            }
        });

        // fire GroupCollapsedChanged
        g.onGroupCollapsedChanged(e);
    }

    /**
     * Gets a CellRange object that contains all of the rows in the group represented
     * by the GroupRow and all of the columns in the grid.
     */
    getCellRange(): CellRange {
        let rows = this._list,
            top = this.index,
            bottom = rows.length - 1;
        for (let r = top + 1; r <= bottom; r++) {
            let gr = tryCast(rows[r], GroupRow);
            if (gr != null && gr.level <= this.level) {
                bottom = r - 1;
                break;
            }
        }
        return new CellRange(top, 0, bottom, this.grid.columns.length - 1);
    }
}
