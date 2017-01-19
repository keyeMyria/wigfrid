import {Directive, HostListener, forwardRef, Inject, HostBinding} from "@angular/core";
import {FlexGridComponent} from "../FlexGridComponent";
import {createElement} from "../../../../core/index";
import {HitTestInfo} from "../HitTestInfo";
import {RowCol} from "../RowColumn/RowCol";
import {CellRangeEventArgs} from "../CellRangeEventArgs";
import {CellRange} from "../CellRange";
import {CellType} from "../enum/CellType";
import {AllowDragging} from "../enum/AllowDragging";
import {_NewRowTemplate} from "./_NewRowTemplate";
import {GroupRow} from "../RowColumn/GroupRow";
import {setCss} from "../../../../core/src/util/dom/set-css";
@Directive(
    {
        selector: 'ar-flex-grid'
    }
)
export class DragHandlerDirective {
    _g: FlexGridComponent;
    _htDown: HitTestInfo;
    _lbSelRows: Object;
    _szRowCol: RowCol;
    _szArgs: CellRangeEventArgs;
    _dragSource: any;
    _dvMarker: HTMLElement;
    _rngTarget: CellRange;

    constructor(@Inject(forwardRef(() => FlexGridComponent))
        grid: FlexGridComponent) {
        console.debug('MouseHandlerDirective instantiate successfully');
        this._g = grid;


        // create target indicator element
        this._dvMarker = createElement('<div class="wj-marker">&nbsp;</div>');
    }

    @HostListener('gridPointerDown', ['$event'])
    private onPointerDown(hit: HitTestInfo) {
        this._htDown = hit;
    }

    @HostListener('gridPointerUp')
    private onPointerUp() {
        this._htDown = null;
    }


    // drag-drop handling (dragging rows/columns)
    @HostListener('dragstart', ['$event'])
    private _dragStart(e: DragEvent) {
        let g  = this._g,
            ht = this._htDown;

        // make sure this is event is ours
        if (!ht) {
            return;
        }

        // get drag source element (if we're not resizing)
        this._dragSource = null;
        if (!this._szRowCol) {
            let args = new CellRangeEventArgs(g.cells, ht.cellRange);
            if (ht.cellType == CellType.ColumnHeader && (g.allowDragging & AllowDragging.Columns) &&
                ht.col > -1 && g.columns[ht.col].allowDragging) {
                if (g.onDraggingColumn(args)) {
                    this._dragSource = e.target;
                }
            } else if (ht.cellType == CellType.RowHeader && (g.allowDragging & AllowDragging.Rows) &&
                ht.row > -1 && g.rows[ht.row].allowDragging) {
                let row = g.rows[ht.row];
                if (!(row instanceof GroupRow) && !(row instanceof _NewRowTemplate)) {
                    if (g.onDraggingRow(args)) {
                        this._dragSource = e.target;
                    }
                }
            }
        }

        // if we have a valid source, set opacity; ow prevent dragging
        if (this._dragSource && e.dataTransfer) {
            e.dataTransfer.effectAllowed = 'move';
            e.dataTransfer.setData('text', ''); // required in FireFox (note: text/html will throw in IE!)
            this._dragSource.style.opacity = .5;
        } else {
            e.preventDefault();
        }
    }

    @HostListener('dragend', ['$event'])
    private _dragEnd(e: DragEvent) {
        this.resetMouseState();
    }

    @HostListener('dragover', ['$event'])
    @HostListener('dragleave', ['$event'])
    private _dragOver(e: DragEvent) {
        let g     = this._g,
            ht    = g.hitTest(e),
            valid = false;

        // check whether the move is valid
        if (this._htDown && ht.cellType == this._htDown.cellType) {
            if (ht.cellType == CellType.ColumnHeader) {
                valid = g.columns.canMoveElement(this._htDown.col, ht.col);
            } else if (ht.cellType == CellType.RowHeader) {
                valid = g.rows.canMoveElement(this._htDown.row, ht.row);
            }
        }

        // if valid, prevent default to allow drop
        if (valid) {
            e.dataTransfer.dropEffect = 'move';
            e.preventDefault();
            this._showDragMarker(ht);
        } else {
            this._showDragMarker(null);
        }
    }

    @HostListener('drop', ['$event'])
    private _drop(e: DragEvent) {
        let g    = this._g,
            ht   = g.hitTest(e),
            args = new CellRangeEventArgs(g.cells, ht.cellRange);

        // move the row/col to a new position
        if (this._htDown && ht.cellType == this._htDown.cellType) {
            let sel = g.selection;
            if (ht.cellType == CellType.ColumnHeader) {
                g.columns.moveElement(this._htDown.col, ht.col);
                g.select(sel.row, ht.col);
                g.onDraggedColumn(args);
            } else if (ht.cellType == CellType.RowHeader) {
                g.rows.moveElement(this._htDown.row, ht.row);
                g.select(ht.row, sel.col);
                g.onDraggedRow(args);
            }
        }
        this.resetMouseState();
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

        this._htDown                     = null;
        this._lbSelRows                  = null;
        this._szRowCol                   = null;
        this._szArgs                     = null;
        this._dragSource                 = null;
        this._bindingCursor = 'default';
    }


    // updates the marker to show the position where the row/col will be inserted
    private _showDragMarker(ht: HitTestInfo) {
        let g = this._g;

        // remove target indicator if no HitTestInfo
        let t = this._dvMarker;
        if (!ht) {
            if (t.parentElement) {
                t.parentElement.removeChild(t);
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

    //region input output binding

    @HostBinding('style.cursor')
    private _bindingCursor;

    //endregion
}
