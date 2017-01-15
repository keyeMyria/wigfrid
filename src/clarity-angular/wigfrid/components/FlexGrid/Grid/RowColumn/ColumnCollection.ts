import { RowColCollection } from "./RowColCollection";
import { Column } from "./Column";
import { FlexGridComponent } from "../FlexGridComponent";
export class ColumnCollection extends RowColCollection {
    _firstVisible = -1;

    constructor(grid: FlexGridComponent,
                defaultSize?: number) {
        super(grid, defaultSize);
    }

    /**
     * Gets a column by name or by binding.
     *
     * The method searches the column by name. If a column with the given name
     * is not found, it searches by binding. The searches are case-sensitive.
     *
     * @param name The name or binding to find.
     * @return The column with the specified name or binding, or null if not found.
     * @deprecated
     */
    getColumn(name: string): Column {
        let index = this.indexOf(name);
        return index > -1 ? this[index] : null;
    }

    /**
     * Gets the index of a column by name or binding.
     *
     * The method searches the column by name. If a column with the given name
     * is not found, it searches by binding. The searches are case-sensitive.
     *
     * @param name The name or binding to find.
     * @return The index of column with the specified name or binding, or -1 if not found.
     * @deprecated
     */
    indexOf(name: any): number {

        // direct lookup
        if (name instanceof Column) {
            return super.indexOf(name);
        }
        // by name
        for (let i = 0; i < this.length; i++) {
            if ((<Column>this[i]).name == name) {
                return i;
            }
        }
        // by binding
        for (let i = 0; i < this.length; i++) {
            if ((<Column>this[i]).binding == name) {
                return i;
            }
        }
        return -1;
    }

    /**
     * Gets the index of the first visible column (where the outline tree is displayed).
     */
    get firstVisibleIndex() {
        this._update();
        return this._firstVisible;
    }

    // override to keep track of first visible column (and later to handle star sizes)
    _update(): boolean {
        if (super._update()) {
            this._firstVisible = -1;
            for (let i = 0; i < this.length; i++) {
                if (<Column>(this[i]).visible) {
                    this._firstVisible = i;
                    break;
                }
            }
            return true;
        }
        return false;
    }

    // update the width of the columns with star sizes
    _updateStarSizes(szAvailable: number): boolean {
        let starCount = 0,
            col: Column,
            lastStarCol: Column,
            lastWidth: number;
        // count stars, remove fixed size columns from available size
        for (let i = 0; i < this.length; i++) {
            col = this[i];
            if (col.isVisible) {
                if (col._szStar) {
                    starCount += Column._parseStarSize(col._szStar);
                    lastStarCol = col;
                } else {
                    szAvailable -= col.renderWidth;
                }
            }
        }
        // update width of star columns
        if (lastStarCol != null) {
            lastWidth = szAvailable;
            for (let i = 0; i < this.length; i++) {
                col = this[i];
                if (col.isVisible) {
                    if (col._szStar) {
                        if (col == lastStarCol) {
                            col._sz = lastWidth; // to avoid round-off errors...
                        } else {
                            col._sz = Math.max(0, Math.round(Column._parseStarSize(col._szStar) / starCount * szAvailable));
                            lastWidth -= col.renderWidth;
                        }
                    }
                }
            }
            this._update();
            return true;
        }
        // no star sizes...
        return false;
    }
}
