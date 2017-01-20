import {HitTestInfo} from "../HitTestInfo";
import {CellRange} from "../CellRange";
import {CellRangeEventArgs} from "../CellRangeEventArgs";
import {Row, RowCol, GroupRow, Column} from "../RowColumn";
import {createElement, tryCast, setCss} from "../../../../core/index";
import {CellType} from "../enum/CellType";
import {SelectionMode} from "../enum/SelectionMode";
import {AllowDragging} from "../enum/AllowDragging";
import {AllowResizing} from "../enum/AllowResizing";
import {SortDescription} from "../../../../collections/SortDescription";
import {
    Inject, forwardRef, Directive, HostListener, HostBinding, Output, EventEmitter, Self,
    Input
} from "@angular/core";
import {FlexGridComponent} from "../FlexGridComponent";
import {asBoolean} from "../../../../core/src/util/asserts/asBoolean";
import {Rectangle} from "../../../../core/src/common/ui/rectangle";
import {FlexGridExtensionsService} from "../Extensions/flex-grid-extensions.service";
import {FlexGridIndicatorExtension} from "../Extensions/Extension/Indicator/flex-grid-indicator.extension";
import {ResizeHandlerDirective} from "./ResizeHandlerDirective";
import {SortHandlerDirective} from "./SortHandlerDirective";


/**
 * Handles the grid's mouse commands.
 */
@Directive(
    {
        selector: 'ar-flex-grid',
    }
)
export class MouseHandlerDirective {
    _g: FlexGridComponent;
    _htDown: HitTestInfo;
    _eMouse: MouseEvent;
    _lbSelState: boolean;
    _lbSelRows: Object;
    _szRowCol: RowCol;
    _szStart: number;
    _szArgs: CellRangeEventArgs;
    _dragSource: any;
    _dvMarker: HTMLElement;
    _rngTarget: CellRange;

    //steam
    private _mouseMoveStream;
    private _mouseUpStream;

    private indicator;

    /**
     * Initializes a new instance of a @see:_MouseHandler.
     *
     * @param grid
     * @param sortHandler
     * @param resizeHanlder
     * @param extensionsService
     */
    constructor(@Inject(forwardRef(() => FlexGridComponent)) grid: FlexGridComponent,
                @Self() @Inject(SortHandlerDirective) private sortHandler: SortHandlerDirective,
                @Self() @Inject(ResizeHandlerDirective) private resizeHanlder: ResizeHandlerDirective,
                @Self() @Inject(FlexGridExtensionsService) private extensionsService: FlexGridExtensionsService) {
        this._g = grid;

        this._mouseMoveStream = (e: MouseEvent) => {
            this._mouseMove(e);
        };
        this._mouseUpStream   = (e: MouseEvent) => {
            document.removeEventListener('mousemove', this._mouseMoveStream);
            document.removeEventListener('mouseup', this._mouseUpStream);
            this._mouseUp(e);
        };

        // create target indicator element
        // this._dvMarker = createElement('<div class="wj-marker">&nbsp;</div>');
    }

    @HostListener('mousedown', ['$event'])
    onMouseDown(e: MouseEvent) {
        if (e.button == 0) {
            document.addEventListener('mousemove', this._mouseMoveStream);
            document.addEventListener('mouseup', this._mouseUpStream);
            this._mouseDown(e);
        }
    }


    /**
     * Resets the mouse state.
     */
    resetMouseState() {

        // because dragEnd fires too late in FireFox...
        if (this._dragSource) {
            this._dragSource.style.opacity = 1;
        }
        this._showDragMarker(null);

        this._htDown        = null;
        this._lbSelRows     = null;
        this._szRowCol      = null;
        this._szArgs        = null;
        this._dragSource    = null;
        this._bindingCursor = 'default';
    }

    // handles the mouse down event
    private _mouseDown(e: MouseEvent) {
        let g  = this._g,
            ht = g.hitTest(e);

        // ignore events that have been handled and clicks on unknown areas
        if (e.defaultPrevented || ht.cellType == CellType.None) {
            return;
        }

        // if the user clicked an active editor, let the editor handle things
        if (g.editRange && g.editRange.contains(ht.cellRange)) {
            return;
        }

        this.gridPointerDown.emit(ht);

        // check where the mouse is
        this._htDown = ht;
        this._eMouse = e;

        // unless the target has the focus, give it to the grid (TFS 81949, 102177)
        if (e.target != document.activeElement) {
            g.focus();
        }

        // handle resizing
        if (this._szRowCol != null) {
            this._handleResizing(e);
            return;
        }

        // starting cell selection? special handling for listbox mode
        switch (ht.cellType) {
            case CellType.Cell:
                if (e.ctrlKey && g.selectionMode == SelectionMode.ListBox) {
                    this._startListBoxSelection(ht.row);
                }
                this._mouseSelect(e, e.shiftKey);
                break;
            case CellType.RowHeader:
                if ((this._g.allowDragging & AllowDragging.Rows) == 0) {
                    if (e.ctrlKey && g.selectionMode == SelectionMode.ListBox) {
                        this._startListBoxSelection(ht.row);
                    }
                    this._mouseSelect(e, e.shiftKey);
                }
                break;
        }

        // handle collapse/expand (after selecting the cell)
        if (ht.cellType == CellType.Cell && ht.col == g.columns.firstVisibleIndex) {
            let gr = <GroupRow>tryCast(g.rows[ht.row], GroupRow);
            if (gr) {
                let icon = document.elementFromPoint(e.clientX, e.clientY);

            }
        }
    }

    // handles the mouse move event
    private _mouseMove(e: MouseEvent) {
        if (this._htDown != null) {
            this._eMouse = e;
            if (this._szRowCol) {
                this._handleResizing(e);
            } else {
                switch (this._htDown.cellType) {
                    case CellType.Cell:
                        this._mouseSelect(e, true);
                        break;
                    case CellType.RowHeader:
                        if (!(this._g.allowDragging & AllowDragging.Rows)) {
                            this._mouseSelect(e, true);
                        }
                        break;
                }
            }
        }
    }

    // handles the mouse up event
    private _mouseUp(e: MouseEvent) {

        console.log('mouse up event', e);
        // select all cells, finish resizing, sorting
        let htd = this._htDown,
            g   = this._g,
            ht  = g.hitTest(e);
        if (htd && htd.cellType == CellType.TopLeft && htd.row == 0 && htd.col == 0) {
            if (ht.cellType == CellType.TopLeft && ht.row == 0 && ht.col == 0) {
                g.select(new CellRange(0, 0, g.rows.length - 1, g.columns.length - 1));
            }
        } else if (this._szArgs) {
            this._finishResizing(e);
        } else {
            this.sortHandler.handleSort(ht, e);
            // this._handleSort(e);
        }

        // done with the mouse
        this.gridPointerUp.emit(ht);
        this.resetMouseState();
    }

    // offer to resize rows/columns
    @HostListener('mousemove', ['$event'])
    private _hover(e: MouseEvent) {
        // console.debug("mouse moving, hover!", e);

        // make sure we're hovering
        if (this._htDown == null) {
            let g      = this._g,
                ht     = g.hitTest(e),
                p      = ht.gridPanel,
                cursor = 'default';

            // find which row/column is being resized
            this._szRowCol = null;
            if (ht.cellType == CellType.ColumnHeader || ht.cellType == CellType.TopLeft) {
                if (this.resizeHanlder.allowResizing & AllowResizing.Columns) {
                    if (ht.edgeRight && p.columns[ht.col].allowResizing) {
                        this._szRowCol = p.columns[ht.col];
                    } else if (ht.col > 0 && ht.edgeLeft && p.columns[ht.col - 1].allowResizing) {
                        this._szRowCol = p.columns[ht.col - 1];
                    }
                }
            }
            if (ht.cellType == CellType.RowHeader || ht.cellType == CellType.TopLeft) {
                if (this.resizeHanlder.allowResizing & AllowResizing.Rows) {
                    if (ht.edgeBottom && p.rows[ht.row].allowResizing) {
                        this._szRowCol = p.rows[ht.row];
                    } else if (ht.row > 0 && ht.edgeTop && p.rows[ht.row - 1].allowResizing) {
                        this._szRowCol = p.rows[ht.row - 1];
                    }
                }
            }

            // keep track of element to resize and original size
            if (this._szRowCol instanceof Column) {
                cursor = 'col-resize';
            } else if (this._szRowCol instanceof Row) {
                cursor = 'row-resize';
            }
            this._szStart = this._szRowCol ? this._szRowCol.renderSize : 0;

            // update the cursor to provide user feedback
            this._bindingCursor = cursor;
        }
    }

    // handles mouse moves while the button is pressed on the cell area
    private _mouseSelect(e, extend) {
        if (this._htDown && this._htDown.gridPanel && this._g.selectionMode != SelectionMode.None) {
            let g  = this._g,
                ht = new HitTestInfo(this._htDown.gridPanel, e);

            // handle the selection
            e.preventDefault();
            this._handleSelection(ht, extend);
        }
    }

    // handle row and column resizing
    private _handleResizing(e: MouseEvent) {

        // prevent browser from selecting cell content
        e.preventDefault();

        // resizing column
        if (this._szRowCol instanceof Column) {
            let sz = Math.max(1, this._szStart + (e.pageX - this._htDown.point.x) * (this._g._rtl ? -1 : 1));
            if (this._szRowCol.renderSize != sz) {
                if (this._szArgs == null) {
                    this._szArgs = new CellRangeEventArgs(this._htDown.gridPanel, new CellRange(-1, this._szRowCol.index));
                }
                this.resizeHanlder.onResizingColumn(this._szArgs);
                if (this.resizeHanlder.deferResizing) {
                    this._showResizeMarker(sz);
                } else {
                    (<Column>this._szRowCol).width = Math.round(sz);
                }
            }
        }

        // resizing row
        if (this._szRowCol instanceof Row) {
            let sz = Math.max(1, this._szStart + (e.pageY - this._htDown.point.y));
            if (this._szRowCol.renderSize != sz) {
                if (this._szArgs == null) {
                    this._szArgs = new CellRangeEventArgs(this._htDown.gridPanel, new CellRange(this._szRowCol.index, -1));
                }
                this.resizeHanlder.onResizingRow(this._szArgs);
                if (this.resizeHanlder.deferResizing) {
                    this._showResizeMarker(sz);
                } else {
                    (<Row>this._szRowCol).height = Math.round(sz);
                }
            }
        }
    }

    // updates the marker to show the new size of the row/col being resized
    private _showResizeMarker(sz: number) {
        let g = this._g, indicator: FlexGridIndicatorExtension = <FlexGridIndicatorExtension>this.extensionsService.getExtensionByName('indicator');

        if (indicator) {
            indicator.enable();

            if (this._szRowCol instanceof Column) {
                indicator.indicatorRectangle = new Rectangle(
                    g._hdrCols.getTotalSize() + this._szRowCol.pos + sz - g.scrollPosition.x,
                    0,
                    2,
                    10000
                );
            } else {
                indicator.indicatorRectangle = new Rectangle(
                    0,
                    g._hdrRows.getTotalSize() + this._szRowCol.pos + sz - g.scrollPosition.y,
                    10000,
                    2
                )
            }
        }
    }


    // updates the marker to show the position where the row/col will be inserted
    private _showDragMarker(ht: HitTestInfo) {
        let g                                     = this._g,
            indicator: FlexGridIndicatorExtension = <FlexGridIndicatorExtension>this.extensionsService.getExtensionByName('indicator');

        // remove target indicator if no HitTestInfo
        let t = this._dvMarker;
        if (!ht) {
            //remove indicator
            if (indicator) {
                indicator.disable();
            }
            this._rngTarget = null;
            return;
        }

        // avoid work/flicker
        if (ht.cellRange.equals(this._rngTarget)) {
            return;
        }
        this._rngTarget = ht.cellRange;

        // add marker element to panel
        if (!t.parentElement) {
            ht.gridPanel.hostElement.appendChild(t);
        }

        // update marker position
        let css: any = {
            left: 0,
            top: 0,
            width: 6,
            height: 6
        };
        switch (ht.cellType) {
            case CellType.ColumnHeader:
                css.height = ht.gridPanel.height;
                let col    = g.columns[ht.col];
                css.left   = col.pos - css.width / 2;
                if (ht.col > this._htDown.col) {
                    css.left += col.renderWidth;
                }
                if (g._rtl) {
                    css.left = t.parentElement.clientWidth - css.left - css.width;
                }
                break;
            case CellType.RowHeader:
                css.width = ht.gridPanel.width;
                let row   = g.rows[ht.row];
                css.top   = row.pos - css.height / 2;
                if (ht.row > this._htDown.row) {
                    css.top += row.renderHeight;
                }
                break;
        }

        // update marker
        setCss(t, css);
    }

    // raises the ResizedRow/Column events and
    // applies the new size to the selection if the control key is pressed
    private _finishResizing(e: MouseEvent) {
        let g    = this._g,
            sel  = g.selection,
            ctrl = this._eMouse.ctrlKey,
            args = this._szArgs,
            rc: number,
            sz;

        // finish row sizing
        if (args && args.row > -1) {

            // apply new size, fire event
            rc                = args.row;
            sz                = Math.max(1, this._szStart + (e.pageY - this._htDown.point.y));
            g.rows[rc].height = Math.round(sz);
            this.resizeHanlder.onResizedRow(args);

            // apply new size to selection if the control key is pressed
            if (ctrl && this._htDown.cellType != CellType.TopLeft && sel.containsRow(rc)) {
                for (let r = sel.topRow; r <= sel.bottomRow; r++) {
                    if (g.rows[r].allowResizing && r != rc) {
                        args = new CellRangeEventArgs(g.cells, new CellRange(r, -1));
                        this.resizeHanlder.onResizingRow(args);
                        if (!args.cancel) {
                            g.rows[r].size = g.rows[rc].size;
                            this.resizeHanlder.onResizedRow(args);
                        }
                    }
                }
            }
        }

        // finish column sizing
        if (args && args.col > -1) {

            // apply new size, fire event
            rc                  = args.col;
            sz                  = Math.max(1, this._szStart + (e.pageX - this._htDown.point.x) * (this._g._rtl ? -1 : 1));
            g.columns[rc].width = Math.round(sz);
            this.resizeHanlder.onResizedColumn(args);

            // apply new size to selection if the control key is pressed
            if (ctrl && this._htDown.cellType != CellType.TopLeft && sel.containsColumn(rc)) {
                for (let c = sel.leftCol; c <= sel.rightCol; c++) {
                    if (g.columns[c].allowResizing && c != rc) {
                        args = new CellRangeEventArgs(g.cells, new CellRange(-1, c));
                        this.resizeHanlder.onResizingColumn(args);
                        if (!args.cancel) {
                            g.columns[c].size = g.columns[rc].size;
                            this.resizeHanlder.onResizedColumn(args);
                        }
                    }
                }
            }
        }
    }

    // start listbox selection by keeping track of which rows were selected
    // when the action started
    private _startListBoxSelection(row: number) {
        let rows         = this._g.rows;
        this._lbSelState = !rows[row].isSelected;
        this._lbSelRows  = {};
        for (let r = 0; r < rows.length; r++) {
            if (rows[r].isSelected) {
                this._lbSelRows[r] = true;
            }
        }
    }

    // handle mouse selection
    private _handleSelection(ht: HitTestInfo, extend: boolean) {
        let self = this,
            g    = this._g,
            rows = g.rows,
            sel  = g.selection,
            rng  = new CellRange(ht.row, ht.col),
            selected: boolean,
            e: CellRangeEventArgs;

        // check that the selection is valid
        if (ht.row > -1 && ht.col > -1) {
            if (this._lbSelRows != null) {

                // special handling for listbox mode
                rng = new CellRange(ht.row, ht.col, self._htDown.row, self._htDown.col);
                for (let r = 0; r < rows.length; r++) {
                    selected = rng.containsRow(r) ? self._lbSelState : self._lbSelRows[r] != null;
                    if (selected != rows[r].isSelected) {
                        e = new CellRangeEventArgs(g.cells, new CellRange(r, sel.col, r, sel.col2));
                        if (g.onSelectionChanging(e)) {
                            rows[r].isSelected = selected;
                            g.onSelectionChanged(e);
                        }
                    }
                }
                g.scrollIntoView(ht.row, ht.col);

            } else {

                // row headers, select the whole row
                if (ht.cellType == CellType.RowHeader) {
                    rng.col  = 0;
                    rng.col2 = g.columns.length - 1;
                }

                // extend range if that was asked
                if (extend) {
                    rng.row2 = sel.row2;
                    rng.col2 = sel.col2;
                }

                // select
                g.select(rng);
            }
        }
    }

    // // handle mouse sort
    // private _handleSort(e: MouseEvent) {
    //     let g  = this._g,
    //         cv = g.collectionView,
    //         ht = g.hitTest(e);
    //
    //     if (this._htDown && ht.cellType == this._htDown.cellType && ht.col == this._htDown.col &&
    //         ht.cellType == CellType.ColumnHeader && !ht.edgeRight && ht.col > -1 &&
    //         cv && cv.canSort && g.allowSorting) {
    //
    //         // get row that was clicked accounting for merging
    //         let rng = g.getMergedRange(g.columnHeaders, ht.row, ht.col),
    //             row = rng ? rng.bottomRow : ht.row;
    //
    //         // if the click was on the sort row, sort
    //         if (row == this._getSortRowIndex()) {
    //             let col      = g.columns[ht.col],
    //                 currSort = col.currentSort,
    //                 asc      = currSort != '+';
    //             if (col.allowSorting && col.binding) {
    //
    //                 // can't remove sort from unsorted column
    //                 if (!currSort && e.ctrlKey) return;
    //
    //                 // raise sorting column
    //                 let args = new CellRangeEventArgs(g.columnHeaders, new CellRange(-1, ht.col));
    //                 if (g.onSortingColumn(args)) {
    //
    //                     // update sort
    //                     let sds = cv.sortDescriptions;
    //                     if (e.ctrlKey) {
    //                         sds.clear();
    //                     } else {
    //                         sds.splice(0, sds.length, new SortDescription(col._getBindingSort(), asc));
    //                     }
    //
    //                     // raise sorted column
    //                     g.onSortedColumn(args);
    //                 }
    //             }
    //         }
    //     }
    // }


//region input output binding

    @HostBinding('style.cursor')
    private _bindingCursor;


    @Output()
    public gridPointerDown: EventEmitter < HitTestInfo > = new EventEmitter();

    @Output()
    public gridPointerMove: EventEmitter < HitTestInfo > = new EventEmitter();

    @Output()
    public gridPointerUp: EventEmitter < HitTestInfo > = new EventEmitter();


    @Output()
    public gridDragStart: EventEmitter <HitTestInfo> = new EventEmitter();

    @Output()
    public gridDraging: EventEmitter <HitTestInfo> = new EventEmitter();

    @Output()
    public gridDragEnd: EventEmitter<HitTestInfo> = new EventEmitter();


    //endregion

}
