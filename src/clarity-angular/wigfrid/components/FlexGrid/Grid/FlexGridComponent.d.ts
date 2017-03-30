import { Size, Rectangle, Point } from "../../../core/index";
import { BaseControl } from "../../BaseControl";
import { GridPanel } from "./GridPanel";
import { MergeManager, AllowMerging } from "./MergeManager";
import { RowCollection, ColumnCollection } from "./RowColumn";
import { CellRange } from "./CellRange";
import { HitTestInfo } from "./HitTestInfo";
import { FormatItemEventArgs } from "./FormatItemEventArgs";
import { ICollectionView } from "../../../collections/interface/ICollectionView";
import { HeadersVisibility, AllowDragging, SelectedState, SelectionMode } from "./enum";
import { CellRangeEventArgs } from "./CellRangeEventArgs";
import { CancelEventArgs } from "../../../eventArgs/CancelEventArgs";
import { EventArgs } from "../../../eventArgs/EventArgs";
import { EventEmitter, ElementRef, ChangeDetectorRef, OnInit, AfterViewInit, Injector, DoCheck, OnDestroy, AfterContentInit, AfterContentChecked, AfterViewChecked } from "@angular/core";
import { DataSource } from "../../../data-source/DataSource";
export declare class FlexGridComponent extends BaseControl implements OnInit, DoCheck, OnDestroy, AfterViewInit, AfterContentInit, AfterContentChecked, AfterViewChecked {
    private elementRef;
    private injector;
    private _changeDetectionRef;
    private _scrollView;
    private _scrollViewElementRef;
    private _gpCells;
    private _gpCHdr;
    private _gpRHdr;
    private _gpTL;
    private _lastCount;
    _rtl: boolean;
    private _keyHdl;
    private _mouseHdl;
    private _selHdl;
    private _addHdl;
    private _mrgMgr;
    private _autoGenCols;
    private _autoClipboard;
    private _readOnly;
    private _indent;
    private _allowDragging;
    private _hdrVis;
    private _alAddNew;
    private _alDelete;
    private _alMerging;
    private _shGroups;
    private _gHdrFmt;
    private _rows;
    private _cols;
    private _hdrRows;
    private _hdrCols;
    private _itemFormatter;
    private _items;
    private _dataSource;
    private _childItemsPath;
    private _bndSortConverter;
    private _selectionMode;
    scrollPosition: Point;
    /**
     * Initializes a new instance of a {@link FlexGrid} control.
     *
     * @param elementRef The DOM element that will host the control, or a selector for the host element (e.g. '#theCtrl').
     * @param injector
     * @param _changeDetectionRef
     * @param _indicatorService
     * //@param  options JavaScript object containing initialization data for the control.
     */
    constructor(elementRef: ElementRef, injector: Injector, _changeDetectionRef: ChangeDetectorRef);
    viewportRectangle(): Rectangle;
    /**
     * Gets or sets a value that determines whether the row and column headers
     * are visible.
     */
    headersVisibility: HeadersVisibility;
    /**
     * Gets or sets whether the grid should generate columns automatically based on the {@link itemsSource.}
     */
    autoGenerateColumns: boolean;
    /**
     * Gets or sets whether the grid should handle clipboard shortcuts.
     *
     * The clipboard commands are as follows:
     *
     * <dl class="dl-horizontal">
     *   <dt>ctrl+C, ctrl+Ins</dt>    <dd>Copy grid selection to cliboard.</dd>
     *   <dt>ctrl+V, shift+Ins</dt>   <dd>Paste clipboard text to grid selection.</dd>
     * </dl>
     *
     * Only visible rows and columns are included in clipboard operations.
     *
     * Read-only cells are not affected by paste operations.
     */
    autoClipboard: boolean;
    /**
     * Gets or whether the user can edit the grid cells by typing into them.
     */
    isReadOnly: boolean;
    /**
     * Gets or sets a value that indicates whether the grid should provide a new row
     * template so users can add items to the source collection.
     *
     * The new row template will not be displayed if the {@link isReadOnly} property
     * is set to true.
     */
    allowAddNew: boolean;
    /**
     * Gets or sets a value that indicates whether the grid should delete
     * selected rows when the user presses the Delete key.
     *
     * Selected rows will not be deleted if the {@link isReadOnly} property
     * is set to true.
     */
    allowDelete: boolean;
    /**
     * Gets or sets which parts of the grid provide cell merging.
     */
    allowMerging: AllowMerging;
    /**
     * Gets or sets whether the grid should insert group rows to delimit data groups.
     *
     * Data groups are created by modifying the {@link groupDescriptions} property of the
     * {@link ICollectionView} object used as a the grid's {@link itemsSource.}
     */
    showGroups: boolean;
    /**
     * Gets or sets the format string used to create the group header content.
     *
     * The string may contain any text, plus the following replacement strings:
     * <ul>
     *   <li><b>{name}</b>: The name of the property being grouped on.</li>
     *   <li><b>{value}</b>: The value of the property being grouped on.</li>
     *   <li><b>{level}</b>: The group level.</li>
     *   <li><b>{count}</b>: The total number of items in this group.</li>
     * </ul>
     *
     * If a column is bound to the grouping property, the column header is used
     * to replace the {name} parameter, and the column's format and data maps are
     * used to calculate the {value} parameter. If no column is available, the
     * group information is used instead.
     *
     * You may add invisible columns bound to the group properties in order to
     * customize the formatting of the group header cells.
     *
     * The default value for this property is
     * '{name}: &lt;b&gt;{value}&lt;/b&gt;({count:n0} items)',
     * which creates group headers similar to
     * 'Country: <b>UK</b> (12 items)' or 'Country: <b>Japan</b> (8 items)'.
     */
    groupHeaderFormat: string;
    /**
     * Gets or sets whether users are allowed to drag rows and/or columns with the mouse.
     */
    allowDragging: AllowDragging;
    /**
     * Gets or sets the array or {@link ICollectionView} that contains items shown on the grid.
     * 数据相应的地方有:
     *  - store里的数据, 这个数据对表格而言几乎是不可见的
     *  - datasource里的数据, 这个应该是表格的基本数据
     *  - 可展示的数据
     *  - 处理后的数据, 如合并单元格
     *
     * Q&A:
     *  - Q: store里数据对于表格来说是不可见的, 那么当不可见的数据变更了. 表格如何展示到变更的数据上.
     *  - A: 什么情况下未展示的数据变更了, 要展示. 初始化时, 及当表单控制的数据源与表格分离.
     *      总的来说要直接展示到变更数据上. 但是由于数据不由datasource控制, store里更新了数据后有modified事件,
     *      可以通过服务获取到datasource里的store,并跟踪变化, 然后再通知表格附加组件中去, 让其去处理.
     *      因为多人编辑的话不可以两个都显示, 只能提示用户是否查看.
     *      默认初始化情况, 表格直接展示全部datasource数据(大量数据仍展示部分)
     *  - Q: 分页如何做
     *  - A: 当用store来做分页时可以轻松实现.
     *      但是当展示的数据大于视图所能展示的量时, 多余的dom将不会渲染, 这时scrollbar将控制展示数据.分页仍是由store控制
     *      由于分页不分页都会返回总数, 不分页时返回总数来计算表格虚拟高度. 分页时则直接取当前显示数
     *      结论: 表格不会提供任何的分页相关代码, 只会根据datasource当前数来计算
     *  - Q: 如何选择下一页的第二行
     *  - A: 表格不处理分页, 简单来说就是无法选择
     *  - Q: 可展示的数据与处理后的数据如何理解
     *  - A: 可展示的数据表示, 这些数据是存在的, 但是不会渲染成dom. 只有计算出来的行高,列宽渲染了
     *      处理后的数据是在可展示的数据之后的后一次处理, 具体表现在数据合并时, 左上或右上的单元格宽高变成其合并总和, 其余单元格不展示
     *      单元格的修改表现为其所有单元格的同步修改. 如某列同名合并, 有一同名列合并后被修改则其所有单元格将同步被修改, 修改后表现为相应行
     *      均被被修改, 变化检测后, 表格检测此列为同值合并列(具体计算在单元格里进行, 将标记其他单元格己被合并到此单元格, 此单元格己合并其他单元格)
     *      最后渲染单元格
     *  - Q: 分组数据是什么样的
     *  - A: 分组数据在须从HierarchyDataSource的store的group函数获取, 以GroupTuple元进行数据的格式化.
     *      这时表格将为hierarchyGrid.
     *  - Q: 数据都是通过load来获取的. 那么CollectionView与DataSource加载数据的不同之处有哪些
     *  - A: CollectionView: 直接获取items, 数据改变方式有refresh, 设置filter, sourceCollection, pageSize, moveToPage, deferUpdate
     *  而DataSource更新则必须调用.load().subscribe()
     *
     */
    itemsSource: any;
    /**
     * Gets the {@link ICollectionView} that contains the grid data.
     * @deprecated
     */
    readonly collectionView: ICollectionView;
    readonly dataSource: DataSource<any, any>;
    /**
     * Gets or sets the name of the property used to generate child rows in hierarchical grids.
     */
    childItemsPath: string;
    /**
     * Gets the {@link GridPanel} that contains the data cells.
     */
    readonly cells: GridPanel;
    /**
     * Gets the {@link GridPanel} that contains the column header cells.
     */
    readonly columnHeaders: GridPanel;
    /**
     * Gets the {@link GridPanel} that contains the row header cells.
     */
    readonly rowHeaders: GridPanel;
    /**
     * Gets the {@link GridPanel} that contains the top left cells.
     */
    readonly topLeftCells: GridPanel;
    /**
     * Gets the grid's row collection.
     */
    readonly rows: RowCollection;
    /**
     * Gets the grid's column collection.
     */
    columns: ColumnCollection;
    /**
     * Gets or sets the number of frozen rows.
     *
     * Frozen rows do not scroll, but the cells they contain
     * may be selected and edited.
     */
    frozenRows: number;
    /**
     * Gets or sets the number of frozen columns.
     *
     * Frozen columns do not scroll, but the cells they contain
     * may be selected and edited.
     */
    frozenColumns: number;
    readonly viewportOffset: Point;
    /**
     * Gets the client size of the control (control size minus headers and scrollbars).
     */
    readonly clientSize: Size;
    /**
     * Gets the bounding rectangle of the control in page coordinates.
     */
    readonly controlRect: Rectangle;
    /**
     * Gets the size of the grid content in pixels.
     * refactor no more heightBrowser
     */
    readonly scrollSize: Size;
    /**
     * Gets the range of cells currently in view.
     */
    readonly viewRange: CellRange;
    /**
     * Gets the {@link CellFactory} that creates and updates cells for this grid.
     * @deprecated
     */
    /**
     * Gets or sets a formatter function used to customize cells on this grid.
     *
     * The formatter function can add any content to any cell. It provides
     * complete flexibility over the appearance and behavior of grid cells.
     *
     * If specified, the function should take four parameters: the {@link GridPanel}
     * that contains the cell, the row and column indices of the cell, and the
     * HTML element that represents the cell. The function will typically change
     * the <b>innerHTML</b> property of the cell element.
     *
     * For example:
     * <pre>
     * flex.itemFormatter = function(panel, r, c, cell) {
         *   if (panel.cellType == CellType.Cell) {
         *     // draw sparklines in the cell
         *     let col = panel.columns[c];
         *     if (col.name == 'sparklines') {
         *       cell.innerHTML = getSparklike(panel, r, c);
         *     }
         *   }
         * }
     * </pre>
     *
     * Note that the FlexGrid recycles cells, so if your {@link itemFormatter}
     * modifies the cell's style attributes, you must make sure that it resets
     * these attributes for cells that should not have them. For example:
     *
     * <pre>
     * flex.itemFormatter = function(panel, r, c, cell) {
         *   // reset attributes we are about to customize
         *   let s = cell.style;
         *   s.color = '';
         *   s.backgroundColor = '';
         *   // customize color and backgroundColor attributes for this cell
         *   ...
         * }
     * </pre>
     *
     * If you have a scenario where multiple clients may want to customize the
     * grid rendering (for example when creating directives or re-usable libraries),
     * consider using the {@link formatItem} event instead. The event allows multiple
     * clients to attach their own handlers.
     * @deprecated
     */
    itemFormatter: Function;
    /**
     * Gets the value stored in a cell in the scrollable area of the grid.
     *
     * @param r Index of the row that contains the cell.
     * @param c Index of the column that contains the cell.
     * @param formatted Whether to format the value for display.
     */
    getCellData(r: number, c: number, formatted: boolean): any;
    /**
     * Gets a the bounds of a cell element in viewport coordinates.
     *
     * This method returns the bounds of cells in the {@link cells}
     * panel (scrollable data cells). To get the bounds of cells
     * in other panels, use the {@link getCellBoundingRect} method
     * in the appropriate {@link GridPanel} object.
     *
     * The returned value is a {@link Rectangle} object which contains the
     * position and dimensions of the cell in viewport coordinates.
     * The viewport coordinates are the same used by the
     * <a href="https://developer.mozilla.org/en-US/docs/Web/API/Element.getBoundingClientRect">getBoundingClientRect</a>
     * method.
     *
     * @param r Index of the row that contains the cell.
     * @param c Index of the column that contains the cell.
     */
    getCellBoundingRect(r: number, c: number): Rectangle;
    /**
     * Sets the value of a cell in the scrollable area of the grid.
     *
     * @param r Index of the row that contains the cell.
     * @param c Index, name, or binding of the column that contains the cell.
     * @param value Value to store in the cell.
     * @param coerce Whether to change the value automatically to match the column's data type.
     * @return True if the value was stored successfully, false otherwise.
     */
    setCellData(r: number, c: any, value: any, coerce?: boolean): boolean;
    /**
     * Gets a {@link HitTestInfo} object with information about a given point.
     *
     * For example:
     *
     * <pre>
     * // hit test a point when the user clicks on the grid
     * flex.hostElement.addEventListener('click', function (e) {
         *   let ht = flex.hitTest(e.pageX, e.pageY);
         *   console.log('you clicked a cell of type "' +
         *               wijmo.grid.CellType[ht.cellType] +
         *               '".');
         * });
     * </pre>
     *
     * @param pt {@link Point} to investigate, in page coordinates, or a MouseEvent object, or x coordinate of the point.
     * @param y Y coordinate of the point in page coordinates (if the first parameter is a number).
     * @return A {@link HitTestInfo} object with information about the point.
     */
    hitTest(pt: any, y?: number): HitTestInfo;
    /**
     * Disposes of the control by removing its association with the host element.
     */
    dispose(): void;
    ngOnDestroy(): void;
    /**
     * Gets or sets the indent used to offset row groups of different levels.
     */
    treeIndent: number;
    /**
     * Collapses all the group rows to a given level.
     *
     * @param level Maximum group level to show.
     * fixme
     */
    /**
     * Gets or sets the current selection mode.
     */
    selectionMode: SelectionMode;
    /**
     * Gets or sets the current selection.
     */
    selection: CellRange;
    /**
     * Selects a cell range and optionally scrolls it into view.
     *
     * @param rng Range to select.
     * @param show Whether to scroll the new selection into view.
     */
    select(rng: any, show?: any): void;
    /**
     * Gets a {@link SelectedState} value that indicates the selected state of a cell.
     *
     * @param r Row index of the cell to inspect.
     * @param c Column index of the cell to inspect.
     */
    getSelectedState(r: number, c: number): SelectedState;
    /**
     * Scrolls the grid to bring a specific cell into view.
     *
     * @param r Index of the row to scroll into view.
     * @param c Index of the column to scroll into view.
     * @return True if the grid scrolled.
     */
    scrollIntoView(r: number, c: number): boolean;
    /**
     * Checks whether a given CellRange is valid for this grid's row and column collections.
     *
     * @param rng Range to check.
     */
    isRangeValid(rng: CellRange): boolean;
    /**
     * Gets or sets the {@link MergeManager} object responsible for determining how cells
     * should be merged.
     */
    mergeManager: MergeManager;
    /**
     * Gets a {@link CellRange} that specifies the merged extent of a cell
     * in a {@link GridPanel.}
     *
     * @param panel {@link GridPanel} that contains the range.
     * @param r Index of the row that contains the cell.
     * @param c Index of the column that contains the cell.
     */
    getMergedRange(panel: GridPanel, r: number, c: number): CellRange;
    /**
     * Occurs after the grid has been bound to a new items source.
     */
    itemsSourceChanged: EventEmitter<{}>;
    /**
     * Raises the {@link itemsSourceChanged} event.
     */
    onItemsSourceChanged(): void;
    /**
     * Occurs after the control has scrolled.
     */
    scrollPositionChanged: EventEmitter<{}>;
    /**
     * Raises the {@link scrollPositionChanged} event.
     */
    onScrollPositionChanged(point: Point): void;
    /**
     * Occurs before selection changes.
     */
    selectionChanging: EventEmitter<{}>;
    /**
     * Raises the {@link selectionChanging} event.
     *
     * @param e {@link CellRangeEventArgs} that contains the event data.
     * @return True if the event was not canceled.
     */
    onSelectionChanging(e: CellRangeEventArgs): boolean;
    /**
     * Occurs after selection changes.
     */
    selectionChanged: EventEmitter<{}>;
    /**
     * Raises the {@link selectionChanged} event.
     *
     * @param e {@link CellRangeEventArgs} that contains the event data.
     * @return True if the event was not canceled.
     */
    onSelectionChanged(e: CellRangeEventArgs): boolean;
    /**
     * Occurs before the grid rows are bound to the data source.
     */
    loadingRows: EventEmitter<{}>;
    /**
     * Raises the {@link loadingRows} event.
     */
    onLoadingRows(e: CancelEventArgs): void;
    /**
     * Occurs after the grid rows have been bound to the data source.
     */
    loadedRows: EventEmitter<{}>;
    /**
     * Raises the {@link loadedRows} event.
     */
    onLoadedRows(e: EventArgs): void;
    /**
     * Occurs when the user starts dragging a column.
     */
    draggingColumn: EventEmitter<{}>;
    /**
     * Raises the {@link draggingColumn} event.
     *
     * @param e {@link CellRangeEventArgs} that contains the event data.
     * @return True if the event was not canceled.
     */
    onDraggingColumn(e: CellRangeEventArgs): boolean;
    /**
     * Occurs when the user finishes dragging a column.
     */
    draggedColumn: EventEmitter<{}>;
    /**
     * Raises the {@link draggedColumn} event.
     *
     * @param e {@link CellRangeEventArgs} that contains the event data.
     */
    onDraggedColumn(e: CellRangeEventArgs): void;
    /**
     * Occurs when the user starts dragging a row.
     */
    draggingRow: EventEmitter<{}>;
    /**
     * Raises the {@link draggingRow} event.
     *
     * @param e {@link CellRangeEventArgs} that contains the event data.
     * @return True if the event was not canceled.
     */
    onDraggingRow(e: CellRangeEventArgs): boolean;
    /**
     * Occurs when the user finishes dragging a row.
     */
    draggedRow: EventEmitter<{}>;
    /**
     * Raises the {@link draggedRow} event.
     *
     * @param e {@link CellRangeEventArgs} that contains the event data.
     */
    onDraggedRow(e: CellRangeEventArgs): void;
    /**
     * Occurs when a group is about to be expanded or collapsed.
     */
    groupCollapsedChanging: EventEmitter<{}>;
    /**
     * Raises the {@link groupCollapsedChanging} event.
     *
     * @param e {@link CellRangeEventArgs} that contains the event data.
     * @return True if the event was not canceled.
     */
    onGroupCollapsedChanging(e: CellRangeEventArgs): boolean;
    /**
     * Occurs after a group has been expanded or collapsed.
     */
    groupCollapsedChanged: EventEmitter<{}>;
    /**
     * Raises the {@link groupCollapsedChanged} event.
     *
     * @param e {@link CellRangeEventArgs} that contains the event data.
     */
    onGroupCollapsedChanged(e: CellRangeEventArgs): void;
    /**
     * Occurs when the user creates a new item by editing the new row template
     * (see the {@link allowAddNew} property).
     *
     * The event handler may customize the content of the new item or cancel
     * the new item creation.
     */
    rowAdded: EventEmitter<{}>;
    /**
     * Raises the {@link rowAdded} event.
     *
     * @param e {@link CellRangeEventArgs} that contains the event data.
     */
    onRowAdded(e: CellRangeEventArgs): void;
    /**
     * Occurs when the user is deleting a selected row by pressing the Delete
     * key (see the {@link allowDelete} property).
     *
     * The event handler may cancel the row deletion.
     */
    deletingRow: EventEmitter<{}>;
    /**
     * Raises the {@link deletingRow} event.
     *
     * @param e {@link CellRangeEventArgs} that contains the event data.
     */
    onDeletingRow(e: CellRangeEventArgs): void;
    /**
     * Occurs when an element representing a cell has been created.
     *
     * This event can be used to format cells for display. It is similar
     * in purpose to the {@link itemFormatter} property, but has the advantage
     * of allowing multiple independent handlers.
     *
     * For example, this code removes the 'wj-wrap' class from cells in
     * group rows:
     *
     * <pre>flex.formatItem.addHandler(function (s, e) {
         *   if (flex.rows[e.row] instanceof wijmo.grid.GroupRow) {
         *     wijmo.removeClass(e.cell, 'wj-wrap');
         *   }
         * });</pre>
     */
    formatItem: EventEmitter<{}>;
    /**
     * Raises the {@link formatItem} event.
     *
     * @param e {@link FormatItemEventArgs} that contains the event data.
     */
    onFormatItem(e: FormatItemEventArgs): void;
    _mappedColumns: any;
    private _sortConverter(sd, item, value, init);
    _bindGrid(full: boolean): void;
    private _cvCollectionChanged(e);
    /**
     * update selection to sync with data source
     * currentChanged 这是一个视图自动跟踪到数据的current指向上,
     * 比如,当列表某行数据改变时, 而这行恰好没有显示出来, 表格会自动滚动到变化的行上.
     * 这很有用,当用户在表单里更改了CollectionView里的某行数据时, 表格自动显示出来.
     * 但是如果出现多人编辑的情况, 那么表格可能就会滑来滑去.
     * 这里我决定要移除这个方法, 由一个服务/指令来控制数据显示
     *
     * 牵涉到的地方有:
     * 数据源抛出数据指向变更currentChanged, CollectionView有current,但是datasource没有
     * currentChanged变更情况有: moveCurrentToPosition, 分页时
     * 简单来说就是显示指向变化
     *
     * 由于数据层不再与视图层直接与视图相关, 也就是说视图改变必须同步到数据改变, 然后再同步到视图. 视图不可以自改变
     * 数据层将变成独立的, 不再含有任何视图相关代码.
     * 移除CollectionView相应功能有:
     *  - moveCurrentToPosition
     *  - currentItem
     *  - edit相关, commitNew, commitEdit, currentEditItem
     *
     */
    private _cvCurrentChanged(e);
    private _getRowIndex(index);
    _getCvIndex(index: number): number;
    private _findRow(data);
    private onScrollViewScroll(point);
    private _handleScrollPositionChanged(point);
    private _bindColumns();
    private _updateColumnTypes();
    private _bindRows();
    private _addGroup(g);
    private _addTreeNode(item, level);
    _hasAttribute(e: any, att: string): boolean;
    private static _maxCssHeight;
    private static _getMaxSupportedCssHeight();
    ngDoCheck(): void;
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngAfterContentInit(): void;
    ngAfterContentChecked(): void;
    ngAfterViewChecked(): void;
}
