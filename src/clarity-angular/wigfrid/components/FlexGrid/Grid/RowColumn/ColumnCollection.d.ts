import { RowColCollection } from "./RowColCollection";
import { Column } from "./Column";
import { FlexGridComponent } from "../FlexGridComponent";
export declare class ColumnCollection extends RowColCollection {
    _firstVisible: number;
    constructor(grid: FlexGridComponent, defaultSize?: number);
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
    getColumn(name: string): Column;
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
    indexOf(name: any): number;
    /**
     * Gets the index of the first visible column (where the outline tree is displayed).
     */
    readonly firstVisibleIndex: number;
    _update(): boolean;
    _updateStarSizes(szAvailable: number): boolean;
}
