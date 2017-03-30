import { EventEmitter } from "@angular/core";
import { ResizeHandlerDirective } from "./ResizeHandlerDirective";
import { FlexGridComponent } from "../FlexGridComponent";
import { FlexGridExtensionsService } from "../Extensions/flex-grid-extensions.service";
import { HitTestInfo } from "../HitTestInfo";
import { CellRangeEventArgs } from "../CellRangeEventArgs";
export declare class SortHandlerDirective {
    private resizeHanlder;
    private extensionsService;
    private _g;
    private _htDown;
    private _allowSorting;
    private _showSort;
    private _sortRowIndex;
    constructor(grid: FlexGridComponent, resizeHanlder: ResizeHandlerDirective, extensionsService: FlexGridExtensionsService);
    handlePointerDown(ht: HitTestInfo): void;
    handleSort(ht: HitTestInfo, e: any): void;
    currentSort(column: any): boolean;
    _getSortRowIndex(): number;
    /**
     * 获取或设置当单击列头时是否允许用户进行列排序
     */
    allowSorting: boolean;
    /**
     * 获取或设置是否表格可以在列头中显示排序指示器
     */
    showSort: boolean;
    /**
     * 获取或设置在列头面板中用于展示或改变排序的行索引
     * Gets or sets the index of row in the column header panel that
     * shows and changes the current sort.
     *
     * This property is set to null by default, causing the last row
     * in the {@link columnHeaders} panel to act as the sort row.
     */
    sortRowIndex: number;
    /**
     * 在用户通过点击列头开始排序时发出
     */
    sortingColumn: EventEmitter<{}>;
    /**
     * Raises the {@link sortingColumn} event.
     *
     * @param e {@link CellRangeEventArgs} that contains the event data.
     */
    onSortingColumn(e: CellRangeEventArgs): void;
    /**
     * 在用户通过点击列头结束排序时发出
     */
    sortedColumn: EventEmitter<{}>;
    /**
     * Raises the {@link sortedColumn} event.
     *
     * @param e {@link CellRangeEventArgs} that contains the event data.
     */
    onSortedColumn(e: CellRangeEventArgs): void;
}
