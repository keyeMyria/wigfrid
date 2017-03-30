
import {RowColCollection} from "./RowColCollection";
import {tryCast} from "../../../../core/index";
import {GroupRow} from "./GroupRow";
import { Optional, Inject } from "@angular/core";
import { FlexGridComponent } from "../FlexGridComponent";


/**
 * Represents a collection of @see:Row objects in a @see:FlexGrid control.
 */
export class RowCollection extends RowColCollection {
    _maxLevel = -1;

    constructor(@Inject(FlexGridComponent) grid: FlexGridComponent,
                @Optional() defaultSize?: number) {
        super(grid, defaultSize);
    }

    /**
     * Gets the maximum group level in the grid.
     *
     * @return The maximum group level or -1 if the grid has no group rows.
     * @deprecated
     */
    get maxGroupLevel(): number {
        this._update();
        return this._maxLevel;
    }

    // override to keep track of the maximum group level
    _update(): boolean {
        if (super._update()) {
            this._maxLevel = -1;
            for (let i = 0; i < this.length; i++) {
                const gr = tryCast(this[i], GroupRow);
                if (gr && gr.level > this._maxLevel) {
                    this._maxLevel = gr.level;
                }
            }
            return true;
        }
        return false;
    }
}
