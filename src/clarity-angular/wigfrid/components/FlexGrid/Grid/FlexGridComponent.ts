import {
    asType,
    isNumber,
    asInt,
    asNumber,
    isInt,
    assert,
    getType,
    asFunction,
    asEnum,
    asBoolean,
    isPrimitive,
    asString,
    tryCast,
    Size,
    Rectangle,
    Point,
    getElementRect,
    DataType,
    maxCssHeight,
    asDataSource
} from "../../../core/index";
import {BaseControl} from "../../BaseControl";
import {GridPanel} from "./GridPanel";
import {MergeManager, AllowMerging} from "./MergeManager";
import {Row, RowCollection, GroupRow, Column, ColumnCollection} from "./RowColumn";
import {CellRange} from "./CellRange";
import {HitTestInfo} from "./HitTestInfo";
import {FormatItemEventArgs} from "./FormatItemEventArgs";
import {DataMap} from "./DataMap";
import {CollectionViewGroup} from "../../../collections/CollectionViewGroup";
import {ICollectionView} from "../../../collections/interface/ICollectionView";
import {
    HeadersVisibility,
    AllowResizing,
    AutoSizeMode,
    AllowDragging,
    SelectedState,
    SelectionMode,
    RowColFlags
} from "./enum";
import {CellRangeEventArgs} from "./CellRangeEventArgs";
import {CancelEventArgs} from "../../../eventArgs/CancelEventArgs";
import {EventArgs} from "../../../eventArgs/EventArgs";
import {NotifyCollectionChangedEventArgs} from "../../../collections/eventArgs/NotifyCollectionChangedEventArgs";
import {NotifyCollectionChangedAction} from "../../../enum/collections/NotifyCollectionChangedAction";
import {SortDescription} from "../../../collections/SortDescription";
import {
    EventEmitter,
    Component,
    Inject,
    ElementRef,
    ChangeDetectorRef,
    ViewChild,
    OnInit,
    AfterViewInit,
    Input,
    Injector,
    DoCheck,
    OnDestroy,
    ContentChild,
    forwardRef,
    AfterContentInit,
    AfterContentChecked,
    AfterViewChecked,
    Output, Self
} from "@angular/core";
import {KeyboardHandlerDirective} from "./Handler/KeyboardHandlerDirective";
import {MouseHandlerDirective} from "./Handler/MouseHandlerDirective";
import {SelectionHandlerDirective} from "./Handler/SelectionHandlerDirective";
import {AddNewHandlerDirective} from "./Handler/AddNewHandlerDirective";
import {GridPanelCell} from "./GridPanel/GridPanelCell";
import {GridPanelColumnHeader} from "./GridPanel/GridPanelColumnHeader";
import {GridPanelRowHeader} from "./GridPanel/GridPanelRowHeader";
import {GridPanelTopLeft} from "./GridPanel/GridPanelTopLeft";
import {ColumnsDefinition} from "./Definition/ColumnsDefinition";
import {RowColCollection} from "./RowColumn/RowColCollection";
import {DataSource} from "../../../data-source/DataSource";
import {FakeScrollView} from "../../../../fake-scroll-view/fake-scroll-view";
import {FlexGridExtensionsService} from "./Extensions/flex-grid-extensions.service";


@Component(
    {
        selector: 'ar-flex-grid',
        template: `
<div class="ar-flexgrid ar-control ar-content datagrid-wrapper" #flexgrid style="position:relative;width:100%;height:100%;max-height:inherit;overflow:hidden" tabindex="-1">
    <fake-scroll-view
     [contentWidth]="_cols.getTotalSize() + _hdrCols.getTotalSize()"
     [contentHeight]="_rows.getTotalSize() + _hdrRows.getTotalSize()"
     (offsetPointChange)="onScrollViewScroll($event)"
     [viewportHeight]="flexgrid.clientHeight"
     [viewportWidth]="flexgrid.clientWidth"
    >
        <!--  cell container -->
        <div GridPanelCell
        [rows] = "_rows"
        [columns] = "_cols"
        [scrollPosition]="scrollPosition"
        [style.top.px]="_hdrRows?.getTotalSize()" 
        [style.left.px]="_hdrCols?.getTotalSize()" 
        [style.width.px]="_gpCells?.width"
        [style.height.px]="_rows.getTotalSize()">
        </div>
    </fake-scroll-view>
    <div GridPanelTopLeft
    [rows] = "_hdrRows"
    [columns] = "_hdrCols"
    [scrollPosition]="scrollPosition"
    [style.top.px]="0" 
    [style.left.px]="0" 
    [style.width.px]="_hdrCols?.getTotalSize()" 
    [style.height.px]="_hdrRows?.getTotalSize()">
    </div>
    <div GridPanelColumnHeader
    [rows] = "_hdrRows" 
    [columns] = "_cols"
    [scrollPosition]="scrollPosition"
    [style.top.px]="0" 
    [style.left.px]="_hdrCols?.getTotalSize()" 
    [style.height.px]="_hdrRows?.getTotalSize()" 
    [style.width.px]="viewportRectangle().width">
    </div>
    <div GridPanelRowHeader
    [rows] = "_rows"
    [columns] = "_hdrCols"
    [scrollPosition]="scrollPosition"
    [style.top.px]="_hdrRows?.getTotalSize()" 
    [style.left.px]="0" 
    [style.height.px]="viewportRectangle().height" 
    [style.width.px]="_hdrCols?.getTotalSize()">
    </div>
    <div #partSz wj-part="sz">
    <!-- auto sizing -->
    </div>
    <ar-flex-grid-extensions>
        <ar-flex-grid-indicator></ar-flex-grid-indicator>
        <!-- another extension will be writen here -->
    </ar-flex-grid-extensions>
</div>
<form>
   <section class="form-block">
        <div class="form-group">
              <label for="aForm_1">Scroll Position</label>
              <input type="text" id="aForm_1" placeholder="Enter value here" size="45" [ngModel]="scrollPosition.x"  [ngModelOptions]="{standalone: true}">
              <input type="text" id="aForm_1" placeholder="Enter value here" size="45" [ngModel]="scrollPosition.y"  [ngModelOptions]="{standalone: true}">
        </div>
   </section>
</form>

`,
        styles: [
            `:host fake-scroll-view {
                position:absolute;
                width:100%;
                height:100%;
                max-height: inherit;
                max-width: inherit;
                overflow:auto;
                -webkit-overflow-scrolling:touch;
                box-sizing:content-box
            }
            `,
        ],
        providers: [
            MergeManager,
            FlexGridExtensionsService

        ]
    }
)
export class FlexGridComponent extends BaseControl implements OnInit,
                                                              DoCheck,
                                                              OnDestroy,
                                                              AfterViewInit,
                                                              AfterContentInit,
                                                              AfterContentChecked,
                                                              AfterViewChecked {
    @ViewChild(FakeScrollView)
    private _scrollView: FakeScrollView;
    @ViewChild(FakeScrollView, {read: ElementRef})
    private _scrollViewElementRef: ElementRef;

    // child panels
    @ViewChild(GridPanelCell)
    private _gpCells: GridPanel;
    @ViewChild(GridPanelColumnHeader)
    private _gpCHdr: GridPanel;
    @ViewChild(GridPanelRowHeader)
    private _gpRHdr: GridPanel;
    @ViewChild(GridPanelTopLeft)
    private _gpTL: GridPanel;


    // private stuff
    //remove
    // private _rcBounds: Rectangle;
    private _lastCount: number;

    /*private*/
    _rtl = false; // accessible to cell factory
    // selection/key/mouse handlers
    private _keyHdl: KeyboardHandlerDirective;
    /*private*/
    private _mouseHdl: MouseHandlerDirective; // accessible to key handler
    /*private*/
    // _edtHdl:_EditHandler; // accessible to key handler
    /*private*/
    private _selHdl: SelectionHandlerDirective; // accessible to key handler
    private _addHdl: AddNewHandlerDirective;
    private _mrgMgr: MergeManager;
    // property storage
    private _autoGenCols   = true;
    private _autoClipboard = true;
    private _readOnly      = false;
    private _indent        = 14;
    private _allowResizing = AllowResizing.Columns;
    private _autoSizeMode  = AutoSizeMode.Both;
    private _allowDragging = AllowDragging.Columns;
    private _hdrVis        = HeadersVisibility.All;
    private _alSorting     = true;
    private _alAddNew      = false;
    private _alDelete      = false;
    private _alMerging     = AllowMerging.None;
    private _shSort        = true;
    private _shGroups      = true;
    private _gHdrFmt: string;
    private _rows: RowCollection;
    private _cols: ColumnCollection;
    private _hdrRows: RowCollection;
    private _hdrCols: ColumnCollection;
    // private _cf: CellFactory;
    private _itemFormatter: Function;
    private _items: any; // any[] or ICollectionView
    private _dataSource: DataSource<any, any>;
    private _childItemsPath: string;
    private _sortRowIndex: number;

    private _bndSortConverter;
    private _selectionMode: SelectionMode;

    public scrollPosition = new Point();

    /**
     * Initializes a new instance of a {@link FlexGrid} control.
     *
     * @param elementRef The DOM element that will host the control, or a selector for the host element (e.g. '#theCtrl').
     * @param injector
     * @param _changeDetectionRef
     * @param _indicatorService
     * //@param  options JavaScript object containing initialization data for the control.
     */
    constructor(@Inject(ElementRef) private elementRef: ElementRef,
                @Inject(Injector) private injector: Injector,
                @Inject(ChangeDetectorRef) private _changeDetectionRef: ChangeDetectorRef,
                // @Inject('options') private options?
    ) {
        super(elementRef, null, true);
        console.count('flexgrid instantiate time');


    }

    viewportRectangle() {
        return new Rectangle(this.viewportOffset.x, this.viewportOffset.y,
            this._scrollView.viewportWidth, this._scrollView.viewportHeight
        )
    }

    // handleScroll() {
    //     debugger;
    //     // finish editing when scrolling
    //     // (or edits will be lost when the grid refreshes)
    //     this.finishEditing();
    //
    //     // update grid's scrollPosition to match element's
    //     if (this._updateScrollPosition()) {
    //         this._updateContent(true);
    //     }
    // }

    //--------------------------------------------------------------------------
    //region ** object model
    /**
     * Gets or sets a value that determines whether the row and column headers
     * are visible.
     */
    @Input()
    get headersVisibility(): HeadersVisibility {
        return this._hdrVis;
    }

    set headersVisibility(value: HeadersVisibility) {
        if (value != this._hdrVis) {
            this._hdrVis = asEnum(value, HeadersVisibility);
            // this.invalidate();
        }
    }

    /**
     * Gets or sets whether the grid should generate columns automatically based on the {@link itemsSource.}
     */
    @Input()
    get autoGenerateColumns(): boolean {
        return this._autoGenCols;
    }

    set autoGenerateColumns(value: boolean) {
        this._autoGenCols = asBoolean(value);
    }

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
    get autoClipboard(): boolean {
        return this._autoClipboard;
    }

    @Input()
    set autoClipboard(value: boolean) {
        this._autoClipboard = asBoolean(value);
    }

    /**
     * Gets or whether the user can edit the grid cells by typing into them.
     */
    get isReadOnly(): boolean {
        return this._readOnly;
    }

    @Input()
    set isReadOnly(value: boolean) {
        if (value != this._readOnly) {
            this._readOnly = asBoolean(value);
            // this.invalidate();
        }
    }

    /**
     * Gets or sets whether users may resize rows and/or columns
     * with the mouse.
     *
     * If resizing is enabled, users can resize columns by dragging
     * the right edge of column header cells, or rows by dragging the
     * bottom edge of row header cells.
     *
     * Users may also double-click the edge of the header cells to
     * automatically resize rows and columns to fit their content.
     * The autosize behavior can be customized using the {@link autoSizeMode}
     * property.
     */
    @Input()
    get allowResizing(): AllowResizing {
        return this._allowResizing;
    }

    set allowResizing(value: AllowResizing) {
        this._allowResizing = asEnum(value, AllowResizing);
    }

    /**
     * Gets or sets which cells should be taken into account when auto-sizing a
     * row or column.
     *
     * This property controls what happens when users double-click the edge of
     * a column header.
     *
     * By default, the grid will automatically set the column width based on the
     * content of the header and data cells in the column. This property allows
     * you to change that to include only the headers or only the data.
     */
    @Input()
    get autoSizeMode(): AutoSizeMode {
        return this._autoSizeMode;
    }

    set autoSizeMode(value: AutoSizeMode) {
        this._autoSizeMode = asEnum(value, AutoSizeMode);
    }

    /**
     * Gets or sets whether users are allowed to sort columns by clicking the column header cells.
     */
    @Input()
    get allowSorting(): boolean {
        return this._alSorting;
    }

    set allowSorting(value: boolean) {
        this._alSorting = asBoolean(value);
    }

    /**
     * Gets or sets a value that indicates whether the grid should provide a new row
     * template so users can add items to the source collection.
     *
     * The new row template will not be displayed if the {@link isReadOnly} property
     * is set to true.
     */
    @Input('allowAddNew')
    get allowAddNew(): boolean {
        return this._alAddNew;
    }

    set allowAddNew(value: boolean) {
        if (value != this._alAddNew) {
            this._alAddNew = asBoolean(value);
            this._addHdl.updateNewRowTemplate();
        }
    }

    /**
     * Gets or sets a value that indicates whether the grid should delete
     * selected rows when the user presses the Delete key.
     *
     * Selected rows will not be deleted if the {@link isReadOnly} property
     * is set to true.
     */
    @Input('allowDelete')
    get allowDelete(): boolean {
        return this._alDelete;
    }

    set allowDelete(value: boolean) {
        if (value != this._alDelete) {
            this._alDelete = asBoolean(value);
        }
    }

    /**
     * Gets or sets which parts of the grid provide cell merging.
     */
    @Input()
    get allowMerging(): AllowMerging {
        return this._alMerging;
    }

    set allowMerging(value: AllowMerging) {
        if (value != this._alMerging) {
            this._alMerging = asEnum(value, AllowMerging);
            //mark remove me
            // this.invalidate();
        }
    }

    /**
     * Gets or sets whether the grid should display sort indicators in the column headers.
     *
     * Sorting is controlled by the {@link sortDescriptions} property of the
     * {@link ICollectionView} object used as a the grid's {@link itemsSource.}
     */
    @Input()
    get showSort(): boolean {
        return this._shSort;
    }

    set showSort(value: boolean) {
        if (value != this._shSort) {
            this._shSort = asBoolean(value);
            //mark remove me
            this.invalidate();
        }
    }

    /**
     * Gets or sets whether the grid should insert group rows to delimit data groups.
     *
     * Data groups are created by modifying the {@link groupDescriptions} property of the
     * {@link ICollectionView} object used as a the grid's {@link itemsSource.}
     */
    @Input()
    get showGroups(): boolean {
        return this._shGroups;
    }

    set showGroups(value: boolean) {
        if (value != this._shGroups) {
            this._shGroups = asBoolean(value);
            this._bindGrid(false);
        }
    }

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
    @Input()
    get groupHeaderFormat(): string {
        return this._gHdrFmt;
    }

    set groupHeaderFormat(value: string) {
        if (value != this._gHdrFmt) {
            this._gHdrFmt = asString(value);
            this._bindGrid(false);
        }
    }

    /**
     * Gets or sets whether users are allowed to drag rows and/or columns with the mouse.
     */
    @Input()
    get allowDragging(): AllowDragging {
        return this._allowDragging;
    }

    set allowDragging(value: AllowDragging) {
        if (value != this._allowDragging) {
            this._allowDragging = asEnum(value, AllowDragging);
            // this.invalidate(); // to re-create row/col headers
        }
    }

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
    @Input()
    get itemsSource(): any {
        return this._items;
    }

    set itemsSource(value: any) {
        if (this._items != value) {

            // unbind current collection view
            //fixme how to handle this._cv have been defined
            if (this._dataSource) {
                // let cv = tryCast(this._cv, CollectionView);
                let cv = tryCast(this._dataSource, DataSource);
                if (cv && cv.sortConverter == this._bndSortConverter) {
                    cv.sortConverter = null;
                }
                // this._cv.currentChanged.subscribe(this._cvCurrentChanged.bind(this));
                // this._dataSource.store().modified.unsubscribe();
                // this._cv.collectionChanged.subscribe(this._cvCollectionChanged.bind(this));
                // this._dataSource.changed.unsubscribe();
                this._dataSource.dispose();
                this._dataSource = null;
            }
            // save new data source and collection view
            this._items      = value;
            this._dataSource = asDataSource(value);
            this._lastCount  = 0;
            // bind new collection view
            if (this._dataSource != null) {
                //push data change
                // this._cv.
                // this._cv.currentChanged.subscribe(this._cvCurrentChanged.bind(this));
                this._dataSource.store().modified.subscribe(this._cvCurrentChanged.bind(this));
                this._dataSource.changed.subscribe(this._cvCollectionChanged.bind(this));
                //mark removeme
                // let cv = tryCast(this._dataSource, CollectionView);
                // if (cv && cv.sortConverter == null) {
                //     cv.sortConverter = this._bndSortConverter;
                // }
            }
            this._dataSource.load().subscribe();
            // bind grid
            this._bindGrid(true);
            // raise itemsSourceChanged
            this.onItemsSourceChanged();
        }
        // this._changeDetectionRef.detectChanges();
    }

    /**
     * Gets the {@link ICollectionView} that contains the grid data.
     */
    get collectionView(): ICollectionView {
        return <ICollectionView>this._dataSource;
    }

    get dataSource(): DataSource {
        return this._dataSource;
    }

    /**
     * Gets or sets the name of the property used to generate child rows in hierarchical grids.
     */
    @Input()
    get childItemsPath(): string {
        return this._childItemsPath;
    }

    set childItemsPath(value: string) {
        if (value != this._childItemsPath) {
            this._childItemsPath = value;
            this._bindGrid(true);
        }
    }

    /**
     * Gets the {@link GridPanel} that contains the data cells.
     */
    get cells(): GridPanel {
        return this._gpCells;
    }

    /**
     * Gets the {@link GridPanel} that contains the column header cells.
     */
    get columnHeaders(): GridPanel {
        return this._gpCHdr;
    }

    /**
     * Gets the {@link GridPanel} that contains the row header cells.
     */
    get rowHeaders(): GridPanel {
        return this._gpRHdr;
    }

    /**
     * Gets the {@link GridPanel} that contains the top left cells.
     */
    get topLeftCells(): GridPanel {
        return this._gpTL;
    }

    /**
     * Gets the grid's row collection.
     */
    get rows(): RowCollection {
        return this._rows;
    }

    /**
     * Gets the grid's column collection.
     */
    @ContentChild(forwardRef(() => ColumnsDefinition))
    get columns(): ColumnCollection {
        return this._cols;
    }

    set columns(value) {
        if (value instanceof RowColCollection) {
            this._cols = value;
        }
    }

    /**
     * Gets or sets the number of frozen rows.
     *
     * Frozen rows do not scroll, but the cells they contain
     * may be selected and edited.
     */
    @Input()
    get frozenRows(): number {
        return this.rows.frozen;
    }

    set frozenRows(value: number) {
        this.rows.frozen = value;
    }

    /**
     * Gets or sets the number of frozen columns.
     *
     * Frozen columns do not scroll, but the cells they contain
     * may be selected and edited.
     */
    @Input()
    get frozenColumns(): number {
        return this.columns.frozen;
    }

    set frozenColumns(value: number) {
        this.columns.frozen = value;
    }

    /**
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
            // this.invalidate();
        }
    }

    // /**
    //  * Gets or sets a {@link Point} that represents the value of the grid's scrollbars.
    //  */
    // get scrollPosition(): Point {
    //     // return this.gridScroll.scrollPosition;
    //     return this._ptScrl.clone();
    // }
    //
    // set scrollPosition(pt: Point) {
    //     let root = this._root,
    //         left = -pt.x;
    //     // IE/Chrome/FF handle scrollLeft differently under RTL:
    //     // Chrome reverses direction, FF uses negative values, IE does the right thing (nothing)
    //     if (this._rtl) {
    //         switch (FlexGridComponent._getRtlMode()) {
    //             case RtlMode.Reverse:
    //                 left = (root.scrollWidth - root.clientWidth) + pt.x;
    //                 break;
    //             case RtlMode.Negative:
    //                 left = pt.x;
    //                 break;
    //             default:
    //                 left = -pt.x;
    //                 break;
    //         }
    //     }
    //     if (root.scrollLeft != left) {
    //         root.scrollLeft = left;
    //     }
    //     if (root.scrollTop != -pt.y) {
    //         root.scrollTop = -pt.y;
    //     }
    // }
    get viewportOffset() {
        return new Point(this._hdrCols.getTotalSize(), this._hdrRows.getTotalSize());
    }

    /**
     * Gets the client size of the control (control size minus headers and scrollbars).
     */
    get clientSize(): Size {
        let viewport = this.viewportRectangle();
        return new Size(viewport.width, viewport.height);
    }

    /**
     * Gets the bounding rectangle of the control in page coordinates.
     */
    get controlRect(): Rectangle {
        //we must use newest reactangle because we dont know whether outer page scroll have changed.
        return getElementRect(this._scrollViewElementRef.nativeElement);
    }

    /**
     * Gets the size of the grid content in pixels.
     * refactor no more heightBrowser
     */
    get scrollSize(): Size {
        return new Size(this._gpCells.width, this._rows.getTotalSize());
    }

    /**
     * Gets the range of cells currently in view.
     */
    get viewRange(): CellRange {
        return this._gpCells.viewRange;
    }

    /**
     * Gets the {@link CellFactory} that creates and updates cells for this grid.
     * @deprecated
     */
    // get cellFactory(): CellFactory {
    //   return this._cf;
    // }
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
    @Input()
    get itemFormatter(): Function {
        return this._itemFormatter;
    }

    set itemFormatter(value: Function) {
        if (value != this._itemFormatter) {
            this._itemFormatter = asFunction(value);
            // this.invalidate();
        }
    }

    /**
     * Gets the value stored in a cell in the scrollable area of the grid.
     *
     * @param r Index of the row that contains the cell.
     * @param c Index of the column that contains the cell.
     * @param formatted Whether to format the value for display.
     */
    getCellData(r: number, c: number, formatted: boolean): any {
        return this.cells.getCellData(r, c, formatted);
    }

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
    getCellBoundingRect(r: number, c: number): Rectangle {
        return this.cells.getCellBoundingRect(r, c);
    }

    /**
     * Sets the value of a cell in the scrollable area of the grid.
     *
     * @param r Index of the row that contains the cell.
     * @param c Index, name, or binding of the column that contains the cell.
     * @param value Value to store in the cell.
     * @param coerce Whether to change the value automatically to match the column's data type.
     * @return True if the value was stored successfully, false otherwise.
     */
    setCellData(r: number, c: any, value: any, coerce = true): boolean {
        return this.cells.setCellData(r, c, value, coerce);
    }

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
    hitTest(pt: any, y?: number): HitTestInfo {
        if (isNumber(pt) && isNumber(y)) { // accept hitTest(x, y) as well
            pt = new Point(pt, y);
        }
        return new HitTestInfo(this, pt);
    }

    /**
     * Disposes of the control by removing its association with the host element.
     */
    dispose() {

        // remove itemsSource so it doesn't have references to our
        // change event handlers that would prevent the grid from being
        // garbage-collected.
        this.itemsSource = null;
        // allow base class
        // super.dispose();
    }

    ngOnDestroy() {
        this.dispose();
    }

    /**
     * Gets or sets the indent used to offset row groups of different levels.
     */
    @Input()
    get treeIndent(): number {
        return this._indent;
    }

    set treeIndent(value: number) {
        if (value != this._indent) {
            this._indent = asNumber(value, false, true);
            this.columns.onCollectionChanged();
        }
    }

    /**
     * Collapses all the group rows to a given level.
     *
     * @param level Maximum group level to show.
     * fixme
     */
    // collapseGroupsToLevel(level: number) {
    //
    //     // finish editing first (this may change the collection)
    //     if (this.finishEditing()) {
    //
    //         // set collapsed state for all rows in the grid
    //         let rows = this.rows;
    //         rows.deferUpdate(
    //             function () {
    //                 for (let r = 0; r < rows.length; r++) {
    //                     let gr = tryCast(rows[r], GroupRow);
    //                     if (gr) {
    //                         gr.isCollapsed = gr.level >= level;
    //                     }
    //                 }
    //             }
    //         );
    //     }
    // }

    /**
     * Gets or sets the current selection mode.
     */
    @Input()
    get selectionMode(): SelectionMode {
        return this._selectionMode;
    }

    set selectionMode(value: SelectionMode) {
        if (value != this._selectionMode) {
            this._selectionMode = asEnum(value, SelectionMode);
            // this._selHdl.selectionMode = asEnum(value, SelectionMode);
            //todo remove me
            this.invalidate();
        }
    }

    /**
     * Gets or sets the current selection.
     */
    get selection(): CellRange {
        return this._selHdl.selection.clone();
    }

    set selection(value: CellRange) {
        this._selHdl.selection = value;
    }

    /**
     * Selects a cell range and optionally scrolls it into view.
     *
     * @param rng Range to select.
     * @param show Whether to scroll the new selection into view.
     */
    select(rng: any, show: any = true) {
        if (isInt(rng) && isInt(show)) { // accept select(r, c) as well
            rng  = new CellRange(rng, show);
            show = true;
        }
        rng = asType(rng, CellRange);
        this._selHdl.select(rng, show);
    }

    /**
     * Gets a {@link SelectedState} value that indicates the selected state of a cell.
     *
     * @param r Row index of the cell to inspect.
     * @param c Column index of the cell to inspect.
     */
    getSelectedState(r: number, c: number): SelectedState {
        return this._selHdl.getSelectedState(asInt(r), asInt(c));
    }

    /**
     * Scrolls the grid to bring a specific cell into view.
     *
     * @param r Index of the row to scroll into view.
     * @param c Index of the column to scroll into view.
     * @return True if the grid scrolled.
     */
    scrollIntoView(r: number, c: number): boolean {

        // make sure our dimensions are set and up-to-date
        // this._updateLayout();

        // and go to work
        let sp           = this.scrollPosition,
            viewportRectangle = this.viewportRectangle(),
            viewportWidth          = viewportRectangle.width,
            viewportHeight          = viewportRectangle.height,
            ptFrz        = this.cells._getFrozenPos();
        // scroll to show row
        r         = asInt(r);
        if (r > -1 && r < this._rows.length && r >= this._rows.frozen) {
            let row  = <Row>this._rows[r];
            if (row.pos + row.renderSize > sp.y + viewportHeight) {
                sp.y = Math.min(row.pos, (row.pos + row.renderSize) - viewportHeight);
            }
            if (row.pos - ptFrz.y < sp.y) {
                sp.y = (row.pos - ptFrz.y);
            }
        }
        // scroll to show column
        c = asInt(c);
        if (c > -1 && c < this._cols.length && c >= this._cols.frozen) {
            let col = <Column>this._cols[c];
            if (col.pos + col.renderSize > sp.x + viewportWidth) {
                sp.x = Math.min(col.pos, (col.pos + col.renderSize) - viewportWidth);
            }
            if (col.pos - ptFrz.x < sp.x) {
                sp.x = (col.pos - ptFrz.x);
            }
        }
        // update scroll position
        if (!sp.equals(this.scrollPosition)) {
            this.scrollPosition = sp;
            return true;
        }
        // no change
        return false;
    }

    /**
     * Checks whether a given CellRange is valid for this grid's row and column collections.
     *
     * @param rng Range to check.
     */
    isRangeValid(rng: CellRange): boolean {
        return rng.isValid && rng.bottomRow < this.rows.length && rng.rightCol < this.columns.length;
    }

    /**
     * Gets or sets the {@link MergeManager} object responsible for determining how cells
     * should be merged.
     */
    @Input()
    get mergeManager(): MergeManager {
        return this._mrgMgr;
    }

    set mergeManager(value: MergeManager) {
        if (value != this._mrgMgr) {
            this._mrgMgr = asType(value, 'IMergeManager', true);
            //todo remove me
            // this.invalidate();
        }
    }

    /**
     * Gets a {@link CellRange} that specifies the merged extent of a cell
     * in a {@link GridPanel.}
     *
     * @param panel {@link GridPanel} that contains the range.
     * @param r Index of the row that contains the cell.
     * @param c Index of the column that contains the cell.
     */
    getMergedRange(panel: GridPanel, r: number, c: number): CellRange {
        return this._mrgMgr ? this._mrgMgr.getMergedRange(panel, r, c) : null;
    }

    //endregion
    //--------------------------------------------------------------------------
    //region ** events
    /**
     * Occurs after the grid has been bound to a new items source.
     */
    @Output()
    itemsSourceChanged = new EventEmitter();

    /**
     * Raises the {@link itemsSourceChanged} event.
     */
    onItemsSourceChanged() {
        this.itemsSourceChanged.emit(null);
    }

    /**
     * Occurs after the control has scrolled.
     */
    @Output()
    scrollPositionChanged = new EventEmitter();

    /**
     * Raises the {@link scrollPositionChanged} event.
     */
    onScrollPositionChanged(point: Point) {
        this.scrollPositionChanged.emit(point);
    }

    /**
     * Occurs before selection changes.
     */
    @Output()
    selectionChanging = new EventEmitter();

    /**
     * Raises the {@link selectionChanging} event.
     *
     * @param e {@link CellRangeEventArgs} that contains the event data.
     * @return True if the event was not canceled.
     */
    onSelectionChanging(e: CellRangeEventArgs): boolean {
        this.selectionChanging.emit(e);
        return !e.cancel;
    }

    /**
     * Occurs after selection changes.
     */
    @Output()
    selectionChanged = new EventEmitter();

    /**
     * Raises the {@link selectionChanged} event.
     *
     * @param e {@link CellRangeEventArgs} that contains the event data.
     * @return True if the event was not canceled.
     */
    onSelectionChanged(e: CellRangeEventArgs): boolean {
        this.selectionChanged.emit(e);
        return !e.cancel;
    }

    /**
     * Occurs before the grid rows are bound to the data source.
     */
    @Output()
    loadingRows = new EventEmitter();

    /**
     * Raises the {@link loadingRows} event.
     */
    onLoadingRows(e: CancelEventArgs) {
        this.loadingRows.emit(e);
    }

    /**
     * Occurs after the grid rows have been bound to the data source.
     */
    @Output()
    loadedRows = new EventEmitter();

    /**
     * Raises the {@link loadedRows} event.
     */
    onLoadedRows(e: EventArgs) {
        this.loadedRows.emit(e);
    }



    /**
     * Occurs when the user starts dragging a column.
     */
    @Output()
    draggingColumn = new EventEmitter();

    /**
     * Raises the {@link draggingColumn} event.
     *
     * @param e {@link CellRangeEventArgs} that contains the event data.
     * @return True if the event was not canceled.
     */
    onDraggingColumn(e: CellRangeEventArgs): boolean {
        this.draggingColumn.emit(e);
        return !e.cancel;
    }

    /**
     * Occurs when the user finishes dragging a column.
     */
    @Output()
    draggedColumn = new EventEmitter();

    /**
     * Raises the {@link draggedColumn} event.
     *
     * @param e {@link CellRangeEventArgs} that contains the event data.
     */
    onDraggedColumn(e: CellRangeEventArgs) {
        this.draggedColumn.emit(e);
    }

    /**
     * Occurs when the user starts dragging a row.
     */
    @Output()
    draggingRow = new EventEmitter();

    /**
     * Raises the {@link draggingRow} event.
     *
     * @param e {@link CellRangeEventArgs} that contains the event data.
     * @return True if the event was not canceled.
     */
    onDraggingRow(e: CellRangeEventArgs): boolean {
        this.draggingRow.emit(e);
        return !e.cancel;
    }

    /**
     * Occurs when the user finishes dragging a row.
     */
    @Output()
    draggedRow = new EventEmitter();

    /**
     * Raises the {@link draggedRow} event.
     *
     * @param e {@link CellRangeEventArgs} that contains the event data.
     */
    onDraggedRow(e: CellRangeEventArgs) {
        this.draggedRow.emit(e);
    }

    /**
     * Occurs when a group is about to be expanded or collapsed.
     */
    @Output()
    groupCollapsedChanging = new EventEmitter();

    /**
     * Raises the {@link groupCollapsedChanging} event.
     *
     * @param e {@link CellRangeEventArgs} that contains the event data.
     * @return True if the event was not canceled.
     */
    onGroupCollapsedChanging(e: CellRangeEventArgs): boolean {
        this.groupCollapsedChanging.emit(e);
        return !e.cancel;
    }

    /**
     * Occurs after a group has been expanded or collapsed.
     */
    @Output()
    groupCollapsedChanged = new EventEmitter();

    /**
     * Raises the {@link groupCollapsedChanged} event.
     *
     * @param e {@link CellRangeEventArgs} that contains the event data.
     */
    onGroupCollapsedChanged(e: CellRangeEventArgs) {
        this.groupCollapsedChanged.emit(e);
    }

    /**
     * Occurs before the user applies a sort by clicking on a column header.
     */
    @Output()
    sortingColumn = new EventEmitter();

    /**
     * Raises the {@link sortingColumn} event.
     *
     * @param e {@link CellRangeEventArgs} that contains the event data.
     * @return True if the event was not canceled.
     */
    onSortingColumn(e: CellRangeEventArgs): boolean {
        this.sortingColumn.emit(e);
        return !e.cancel;
    }

    /**
     * Occurs after the user applies a sort by clicking on a column header.
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

    /**
     * Occurs when the user creates a new item by editing the new row template
     * (see the {@link allowAddNew} property).
     *
     * The event handler may customize the content of the new item or cancel
     * the new item creation.
     */
    @Output()
    rowAdded = new EventEmitter();

    /**
     * Raises the {@link rowAdded} event.
     *
     * @param e {@link CellRangeEventArgs} that contains the event data.
     */
    onRowAdded(e: CellRangeEventArgs) {
        this.rowAdded.emit(e);
    }

    /**
     * Occurs when the user is deleting a selected row by pressing the Delete
     * key (see the {@link allowDelete} property).
     *
     * The event handler may cancel the row deletion.
     */
    @Output()
    deletingRow = new EventEmitter();

    /**
     * Raises the {@link deletingRow} event.
     *
     * @param e {@link CellRangeEventArgs} that contains the event data.
     */
    onDeletingRow(e: CellRangeEventArgs) {
        this.deletingRow.emit(e);
    }

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
    @Output()
    formatItem = new EventEmitter();

    /**
     * Raises the {@link formatItem} event.
     *
     * @param e {@link FormatItemEventArgs} that contains the event data.
     */
    onFormatItem(e: FormatItemEventArgs) {
        this.formatItem.emit(e);
    }

    //endregion
    //--------------------------------------------------------------------------
    //region ** implementation
    // gets the index of the sort row, with special handling for nulls
    _getSortRowIndex(): number {
        return this._sortRowIndex != null
            ? this._sortRowIndex
            : this.columnHeaders.rows.length - 1;
    }

    // sort converter used to sort mapped columns by display value
    _mappedColumns = null;

    private _sortConverter(sd: SortDescription, item: any, value: any, init: boolean) {
        let col: Column;
        // initialize mapped column dictionary
        if (init) {
            this._mappedColumns = null;
            if (this.collectionView) {
                let sds = this.collectionView.sortDescriptions;
                for (let i = 0; i < sds.length; i++) {
                    col = this.columns.getColumn(sds[i].property);
                    if (col && col.dataMap) {
                        if (!this._mappedColumns) {
                            this._mappedColumns = {};
                        }
                        this._mappedColumns[col.binding] = col.dataMap;
                    }
                }
            }
            // prioritize the column that was clicked
            // (in case multiple columns map the same property)
            if (this._mouseHdl._htDown && this._mouseHdl._htDown.col > -1) {
                col = this.columns[this._mouseHdl._htDown.col];
                if (col.dataMap) {
                    this._mappedColumns[col.binding] = col.dataMap;
                }
            }
        }
        // convert value if we have a map
        if (this._mappedColumns) {
            let map = <DataMap>this._mappedColumns[sd.property];
            if (map) {
                value = map.getDisplayValue(value);
            }
        }
        // return the value to use for sorting
        return value;
    }

    // binds the grid to the current data source.
    _bindGrid(full: boolean) {
        let sel: CellRange;
        // this.deferUpdate(
        //     () => {
        // do a full binding if we didn't have any data when we did it the first time
        if (this._lastCount == 0 && this._dataSource && this._dataSource.items && this._dataSource.items.length) {
            full = true;
        }
        // save selected items
        let selectedItems = [];
        if (this.selectionMode == SelectionMode.ListBox) {
            for (let i = 0; i < this.rows.length; i++) {
                let row = this.rows[i];
                if (row.isSelected && row.dataItem) {
                    selectedItems.push(row.dataItem);
                }
            }
        }
        // update rows
        // this.rows.deferUpdate(
        //     () => {
        this._bindRows();
        //     }
        // );
        // update columns
        if (full) {
            // this.columns.deferUpdate(
            //     () => {
            this._bindColumns();
            // }
            // );
        }
        // restore/initialize listbox selection
        let cnt = 0;
        if (selectedItems.length) {
            for (let i = 0; i < this.rows.length && cnt < selectedItems.length; i++) {
                if (selectedItems.indexOf(this.rows[i].dataItem) > -1) {
                    this.rows[i].isSelected = true;
                    cnt++;
                }
            }
        }
        // failed to restore listbox selection by object, update by index
        if (this.selectionMode == SelectionMode.ListBox && cnt == 0) {
            sel = this.selection;
            for (let i = sel.topRow; i <= sel.bottomRow && i > -1 && i < this.rows.length; i++) {
                this.rows[i].isSelected = true;
            }
        }
        // save item count for next time
        if (!this._lastCount && this._dataSource && this._dataSource.items) {
            this._lastCount = this._dataSource.items.length;
        }
        //    }
        // );
        // update selection
        if (this.collectionView) {
            this._cvCurrentChanged(EventArgs.empty);
        }
    }

    // updates grid rows to sync with data source
    private _cvCollectionChanged(e: NotifyCollectionChangedEventArgs) {
        if (this.autoGenerateColumns && this.columns.length == 0) {

            // bind rows and columns
            this._bindGrid(true);
        } else {

            // synchronize grid with updated CollectionView
            let index: number;
            switch (e.action) {

                // an item has changed, invalidate the grid to show the changes
                case NotifyCollectionChangedAction.Change:
                    // this.invalidate();
                    return;

                // an item has been added, insert a row
                case NotifyCollectionChangedAction.Add:
                    throw new Error('not implemented yet');
                    // if (e.index == this.collectionView.items.length - 1) {
                    //     index = this.rows.length;
                    //     // if (this.rows[index - 1] instanceof _NewRowTemplate) {
                    //     //     index--;
                    //     // }
                    //     this.rows.insert(index, new Row(e.item));
                    //     return;
                    // }
                    // assert(false, 'added item should be the last one.');
                    break;

                // an item has been removed, delete the row
                case NotifyCollectionChangedAction.Remove:
                    throw new Error('not implemented yet');
                    // let index = this._findRow(e.item);
                    // if (index > -1) {
                    //     this.rows.removeAt(index);
                    //     this._cvCurrentChanged(e);
                    //     return;
                    // }
                    // assert(false, 'removed item not found in grid.');
                    break;
            }
            // reset (sort, new source, etc): re-create all rows
            this._bindGrid(false);
        }
    }

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
    private _cvCurrentChanged(e) {
        if (this.collectionView) {
            let sel   = this.selection,
                index = this._getRowIndex(this.collectionView.currentPosition);
            if (sel.row != index) {

                // update selection
                sel.row = sel.row2 = index;
                this.select(sel, false);
                // scroll selected row into view (keep column)
                this.scrollIntoView(sel.row, -1);
            }
        }
    }

    // convert CollectionView index to row index
    private _getRowIndex(index: number): number {
        if (this.collectionView) {

            // look up item, then scan rows to find it
            if (index > -1) {
                let item = this.collectionView.items[index];
                for (; index < this.rows.length; index++) {
                    if (this.rows[index].dataItem === item) {
                        return index;
                    }
                }
                return -1; // item not found, shouldn't happen!
            } else {

                // no item to look up, so return current unbound row (group header)
                // or - 1 (no selection)
                let index = this.selection.row,
                    row   = index > -1 ? this.rows[index] : null;
                return row && (row instanceof GroupRow || row.dataItem == null)
                    ? index
                    : -1;
            }
        }
        // not bound
        return this.selection.row;
    }

    // convert row index to CollectionView index
    _getCvIndex(index: number): number {
        if (index > -1 && this.collectionView) {
            let item = this.rows[index].dataItem;
            index    = Math.min(index, this.collectionView.items.length);
            for (; index > -1; index--) {
                if (this.collectionView.items[index] === item) {
                    return index;
                }
            }
        }
        return -1;
    }

    // gets the index of the row that represents a given data item
    private _findRow(data: any): number {
        for (let i = 0; i < this.rows.length; i++) {
            if (this.rows[i].dataItem == data) {
                return i;
            }
        }
        return -1;
    }

    private onScrollViewScroll(point) {
        this._handleScrollPositionChanged(point);
    }

    private _handleScrollPositionChanged(point) {
        this.scrollPosition = point;
        this.onScrollPositionChanged(point);
        // this.finishEditing();
        // this._updateContent(true);
    }

    // bind columns
    private _bindColumns() {

        // remove old auto-generated columns
        for (let i = 0; i < this.columns.length; i++) {
            let col = this.columns[i];
            if (col._getFlag(RowColFlags.AutoGenerated)) {
                this.columns.removeAt(i);
                i--;
            }
        }
        // get first item to infer data types
        let item = null,
            cv   = this.collectionView;
        if (cv && cv.items && cv.items.length) {
            item = cv.items[0];
        }
        // auto-generate new columns
        // (skipping unwanted types: array and object)
        if (item && this.autoGenerateColumns) {
            for (let key in item) {
                if (isPrimitive(item[key])) {
                    let col = new Column(this.columns);
                    col._setFlag(RowColFlags.AutoGenerated, true);
                    col.binding = col.name = key;
                    col.dataType = getType(item[key]);
                    let pdesc    = Object.getOwnPropertyDescriptor(item, key);
                    if (pdesc && !pdesc.writable) {
                        col._setFlag(RowColFlags.ReadOnly, true);
                    }
                    if (col.dataType == DataType.Number) {
                        col.width = 80;
                    }
                    this.columns.push(col);
                }
            }
        }
        // update missing column types
        if (item) {
            this._updateColumnTypes();
        }
        // REVIEW: add onColumnsCreated()?
    }

    // update missing column types to match data
    private _updateColumnTypes() {
        let cv = this.collectionView;
        if (cv && cv.items && cv.items.length) {
            let item = cv.items[0],
                col: Column;
            for (let i = 0; i < this.columns.length; i++) {
                col = this.columns[i];
                if (col.dataType == null && col.binding) {
                    col.dataType = getType(item[col.binding]);
                }
            }
        }
    }

    // bind rows
    private _bindRows() {

        // raise loading rows event
        let e = new CancelEventArgs();
        this.onLoadingRows(e);
        if (e.cancel) {
            return;
        }
        // clear rows
        this.rows.clear();
        // re-populate
        if (this.collectionView && this.collectionView.items) {
            let list   = this.collectionView.items;
            let groups = this.collectionView.groups;
            // bind to hierarchical sources (childItemsPath)
            if (this.childItemsPath) {
                for (let i = 0; i < list.length; i++) {
                    this._addTreeNode(list[i], 0)
                }
                // bind to grouped sources
            } else if (groups != null && groups.length > 0 && this.showGroups) {
                for (let i = 0; i < groups.length; i++) {
                    this._addGroup(groups[i]);
                }
                // bind to regular sources
            } else {
                for (let i = 0; i < list.length; i++) {
                    let r = new Row(this.rows, list[i]);
                    this.rows.push(r);
                }
            }
        }
        // done binding rows
        this.onLoadedRows(e);
    }

    private _addGroup(g: CollectionViewGroup) {

        // add group row
        let gr      = new GroupRow();
        gr.level    = g.level;
        gr.dataItem = g;
        this.rows.push(gr);
        // add child rows
        if (g.isBottomLevel) {
            for (let i = 0; i < g.items.length; i++) {
                let r = new Row(g.items[i]);
                this.rows.push(r);
            }
        } else {
            for (let i = 0; i < g.groups.length; i++) {
                this._addGroup(g.groups[i]);
            }
        }
    }

    private _addTreeNode(item: any, level: number) {
        let gr       = new GroupRow(),
            children = item[this.childItemsPath];
        // add main node
        gr.dataItem  = item;
        gr.level     = level;
        this.rows.push(gr);
        // add child nodes
        if (children) {
            for (let i = 0; i < children.length; i++) {
                this._addTreeNode(children[i], level + 1);
            }
        }
    }

    // checks whether an element or any of its ancestors contains an attribute
    _hasAttribute(e: any, att: string) {
        for (; e; e = e.parentNode) {
            if (e.getAttribute && e.getAttribute(att) != null) return true;
        }
        return false;
    }

    // get max supported element height (adapted from SlickGrid)
    // IE limits it to about 1.5M, FF to 6M, Chrome to 30M
    private static _maxCssHeight: number;

    private static _getMaxSupportedCssHeight(): number {
        if (!FlexGridComponent._maxCssHeight) {
            FlexGridComponent._maxCssHeight = maxCssHeight();
        }
        return FlexGridComponent._maxCssHeight;
    }
    //endregion

    //region ng
    ngDoCheck() {
        if (this._selHdl.selectionMode != this._selectionMode) {
            this._selHdl.selectionMode = this._selectionMode;
        }


    }

    //ngInit run after all input have been set
    ngOnInit() {

        // this._cf = this.injector.get(CellFactory);
        this._keyHdl   = this.injector.get(KeyboardHandlerDirective);
        this._mouseHdl = this.injector.get(MouseHandlerDirective);
        // this._edtHdl   = this.injector.get(_EditHandler);
        this._selHdl   = this.injector.get(SelectionHandlerDirective);
        this._addHdl   = this.injector.get(AddNewHandlerDirective);
        this._mrgMgr   = this.injector.get(MergeManager);
        //#load items

        if (!this._rows && this.autoGenerateColumns) {
            this._cols = new ColumnCollection(this);
        }
        // rows is the real data, items is controlled
        this._rows    = new RowCollection(this);
        // header row will always be one row (column header)
        this._hdrRows = new RowCollection(this);
        // header col will always be one column (row header)
        this._hdrCols = new ColumnCollection(this);

    }

    ngAfterViewInit() {
        let e         = this.elementRef.nativeElement,
            csh       = getComputedStyle(e),
            csb       = getComputedStyle(document.body),
            defRowHei = parseInt(csh.fontSize ? csh.fontSize : csb.fontSize) * 2;
        // make 100% sure we have a default row height!
        if (defRowHei <= 0 || isNaN(defRowHei)) {
            defRowHei = 28;
        }

        this._rows.defaultSize    = defRowHei;
        this._cols.defaultSize    = 4 * defRowHei;
        this._hdrRows.defaultSize = defRowHei;
        this._hdrCols.defaultSize = Math.round(1.25 * defRowHei);
        // add row and column headers
        this._hdrRows.push(new Row(this._hdrRows));
        this._hdrCols.push(new Column(this._hdrCols));
        this._hdrCols[0].align = 'center';

        this._bndSortConverter = this._sortConverter.bind(this);
    }

    ngAfterContentInit() {

    }

    ngAfterContentChecked() {

    }

    ngAfterViewChecked() {

    }

    //endregion
}
