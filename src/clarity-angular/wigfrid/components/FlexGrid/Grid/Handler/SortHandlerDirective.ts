import {Directive, HostListener, Self, Inject, forwardRef, Input, Output, EventEmitter} from "@angular/core";
import {ResizeHandlerDirective} from "./ResizeHandlerDirective";
import {FlexGridComponent} from "../FlexGridComponent";
import {FlexGridExtensionsService} from "../Extensions/flex-grid-extensions.service";
import {HitTestInfo} from "../HitTestInfo";
import {CellType} from "../enum/CellType";
import {asBoolean} from "../../../../core/index";
import {asNumber} from "../../../../core/src/util/asserts/asNumber";
import {CellRangeEventArgs} from "../CellRangeEventArgs";
import {CellRange} from "../CellRange";
import {SortDescription} from "../../../../collections/SortDescription";
@Directive(
    {
        selector: 'ar-flex-grid'
    }
)
export class SortHandlerDirective {
    private _g: FlexGridComponent;

    private _htDown: HitTestInfo;

    private _allowSorting    = true;
    private _showSort        = true;
    private _sortRowIndex: number;

    constructor(@Inject(forwardRef(() => FlexGridComponent)) grid: FlexGridComponent,
                @Self() @Inject(ResizeHandlerDirective) private resizeHanlder: ResizeHandlerDirective,
                @Self() @Inject(FlexGridExtensionsService) private extensionsService: FlexGridExtensionsService) {
        this._g = grid;
    }

    @HostListener('gridPointerDown', ['$event'])
    handlePointerDown(ht: HitTestInfo){
        this._htDown = ht;
    }

    handleSort(ht: HitTestInfo, e) {
        console.log('sort handler gridPointUp');
        let g  = this._g,
            dataSource = g.dataSource;

        if (this._htDown && ht.cellType == this._htDown.cellType && ht.col == this._htDown.col &&
            ht.cellType == CellType.ColumnHeader && !ht.edgeRight && ht.col > -1 &&
            dataSource /*&& dataSource.canSort*/ && this.allowSorting) {

            // get row that was clicked accounting for merging
            let rng = g.getMergedRange(g.columnHeaders, ht.row, ht.col),
                row = rng ? rng.bottomRow : ht.row;

            // if the click was on the sort row, sort
            if (row == this._getSortRowIndex()) {
                let col      = g.columns[ht.col],
                    currSort = this.currentSort(col),
                    sortOrder      = currSort == false || currSort == null;
                if (col.allowSorting && col.binding) {

                    // can't remove sort from unsorted column
                    if (!currSort && e.ctrlKey) return;

                    // raise sorting column
                    let args = new CellRangeEventArgs(g.columnHeaders, new CellRange(-1, ht.col));
                    this.onSortingColumn(args)

                    // update sort
                    // let sds = dataSource.sortDescriptions;
                    // if (e.ctrlKey) {
                    //     sds.clear();
                    // } else {
                    //     sds.splice(0, sds.length, new SortDescription(col._getBindingSort(), asc));
                    // }
                    dataSource.sort([{selector: col._getBindingSort(), desc: sortOrder}]);
                    dataSource.load().subscribe();
                    this._g._bindGrid(true);


                    // raise sorted column
                    this.onSortedColumn(args);
                }
            }
        }
    }

    currentSort(column): boolean {
        let dataSource = this._g.dataSource;
        if (dataSource) {
            var sds = dataSource._storeLoadOptions.sort || [];
            for (var i = 0; i < sds.length; i++) {
                if (sds[i].selector == column._getBindingSort()) {
                    return sds[i].desc ? true : false;
                }
            }
        }
        return null;
    }

    // gets the index of the sort row, with special handling for nulls
    _getSortRowIndex(): number {
        return this._sortRowIndex != null
            ? this._sortRowIndex
            : this._g.columnHeaders.rows.length - 1;
    }

    //region inputs and outputs

    /**
     * 获取或设置当单击列头时是否允许用户进行列排序
     */
    @Input()
    get allowSorting(): boolean {
        return this._allowSorting;
    }

    set allowSorting(value: boolean) {
        this._allowSorting = asBoolean(value);
    }

    /**
     * 获取或设置是否表格可以在列头中显示排序指示器
     */
    @Input()
    get showSort(): boolean {
        return this._showSort;
    }

    set showSort(value: boolean) {
        if (value != this._showSort) {
            this._showSort = asBoolean(value);
        }
    }

    /**
     * 获取或设置在列头面板中用于展示或改变排序的行索引
     * Gets or sets the index of row in the column header panel that
     * shows and changes the current sort.
     *
     * This property is set to null by default, causing the last row
     * in the {@link columnHeaders} panel to act as the sort row.
     */
    @Input()
    get sortRowIndex(): number {
        return this._sortRowIndex;
    }

    set sortRowIndex(value: number) {
        if (value != this._sortRowIndex) {
            this._sortRowIndex = asNumber(value, true);
        }
    }

    /**
     * 在用户通过点击列头开始排序时发出
     */
    @Output()
    sortingColumn = new EventEmitter();

    /**
     * Raises the {@link sortingColumn} event.
     *
     * @param e {@link CellRangeEventArgs} that contains the event data.
     */
    onSortingColumn(e: CellRangeEventArgs) {
        this.sortingColumn.emit(e);
    }

    /**
     * 在用户通过点击列头结束排序时发出
     */
    @Output()
    sortedColumn = new EventEmitter();

    /**
     * Raises the {@link sortedColumn} event.
     *
     * @param e {@link CellRangeEventArgs} that contains the event data.
     */
    onSortedColumn(e: CellRangeEventArgs) {
        this.sortedColumn.emit(e);
    }

}
