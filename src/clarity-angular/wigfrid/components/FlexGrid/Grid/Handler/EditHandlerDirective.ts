import {Directive, Self, HostListener, forwardRef, Inject, Output, EventEmitter} from "@angular/core";
import {FlexGridDirective} from "./../FlexGridDirective";
import {CellRangeEventArgs} from "../CellRangeEventArgs";
import {Key} from "../../../../enum/Key";
import {CellType} from "../enum/CellType";
import {HitTestInfo} from "../HitTestInfo";
import {CellRange} from "../CellRange";
import {SelectionMode} from "../enum/SelectionMode";
import {tryCast} from "../../../../core/index";
import {asNumber} from "../../../../core/index";


@Directive(
    {
        selector: 'ar-flex-grid'
    }
)
export class EditHandlerDirective {
    _g: FlexGridDirective;
    _rng: CellRange;
    _edt: HTMLInputElement;
    _htDown: HitTestInfo;
    _fullEdit = false;
    _evtInput: any;

    constructor(@Self() @Inject(forwardRef(() => FlexGridDirective)) private  grid: FlexGridDirective) {
        this._g = grid;

        // to raise input event when selecting from ListBox
        // http://stackoverflow.com/questions/2856513/how-can-i-trigger-an-onchange-event-manually
        this._evtInput = document.createEvent('HTMLEvents');
        this._evtInput.initEvent('input', true, false);

    }

    @HostListener('selectionChanging', ['$event'])
    gridOnSelectionChanging(event: CellRangeEventArgs) {
        let grid = this.grid;
        this.finishEditing();
        if (event.row != grid.selection.row) {
            this._commitRowEdits();
        }
    }

    @HostListener('blur', ['$event'])
    gridOnBlur() {
        let grid = this.grid;
        setTimeout(() => {

                       // if the grid lost focus, commit row edits (TFS 114960)
                       this._commitRowEdits();
                   }, 200
        ); // TFS 100250, 112599, 115816 (timeOut back to 200)
    }

    @HostListener('mousedown', ['$event'])
    gridOnMouseDown(e) {
        console.debug('mousedown from EditHandlerDirective');
        let grid = this.grid,
            sel  = grid.selection,
            ht   = grid.hitTest(e);

        this._htDown = null;
        if (ht.cellType != CellType.Cell && ht.cellType != CellType.None) {

        } else if (ht.cellType != CellType.None) {

            // start editing when clicking on checkboxes on this grid
            // if they are not the currently active editor
            let edt = <HTMLInputElement>tryCast(e.target, HTMLInputElement);

            // if this is the active editor, start editing now
            if (edt != this.activeEditor) {

                // we're handling this (required in Chrome)
                e.preventDefault();
                e.stopPropagation();

                // start editing the item that was clicked
                this.startEditing(false, ht.row, ht.col);

            } else {

                // this checkbox is the current editor, so finish editing now
                this.finishEditing();
            }


            // if the click was on the cursor cell, save the hit test info
            // to start editing when we get the click event later
            if (edt == null && ht.row == sel.row && ht.col == sel.col) {
                this._htDown = ht;
            }
        }
    }

    @HostListener('click', ['$event'])
    gridOnClick(e) {
        let grid = this.grid;
        if (this._htDown && !this.activeEditor) {
            let ht = grid.hitTest(e);
            if (ht.cellRange.equals(this._htDown.cellRange)) {
                this.startEditing(true, ht.row, ht.col);
            }
        }
    }

    /**
     * Starts editing a given cell.
     *
     * @param fullEdit Whether to stay in edit mode when the user presses the cursor keys. Defaults to false.
     * @param r Index of the row to be edited. Defaults to the currently selected row.
     * @param c Index of the column to be edited. Defaults to the currently selected column.
     * @param focus Whether to give the editor the focus. Defaults to true.
     * @return True if the edit operation started successfully.
     */
    startEditing(fullEdit = true, r?: number, c?: number, focus?: boolean): boolean {

        // default row/col to current selection
        let g = this._g;
        r     = asNumber(r, true, true);
        c     = asNumber(c, true, true);
        if (r == null) {
            r = g.selection.row;
        }
        if (c == null) {
            c = g.selection.col;
        }

        // default focus to true
        if (focus == null) {
            focus = true;
        }

        // check that the cell is editable
        if (!this._allowEditing(r, c)) {
            return false;
        }

        // get edit range
        let rng = g.getMergedRange(g.cells, r, c);
        if (!rng) {
            rng = new CellRange(r, c);
        }

        // get item to be edited
        let item = g.rows[r].dataItem;

        // make sure cell is selected
        g.select(rng, true);

        // check that we still have the same item after moving the selection (TFS 110143)
        if (!g.rows[r] || item != g.rows[r].dataItem) {
            return false;
        }

        // no work if we are already editing this cell
        if (rng.equals(this._rng)) {
            return true;
        }

        // start editing cell
        let e = new CellRangeEventArgs(g.cells, rng);
        if (!this.onBeginningEdit(e)) {
            return false;
        }

        // start editing item
        let ecv = tryCast(g.collectionView, 'IEditableCollectionView');
        if (ecv) {
            item = g.rows[r].dataItem;
            ecv.editItem(item);
        }

        // save editing parameters
        this._fullEdit = fullEdit;
        this._rng      = rng;

        let edt = this._edt;
        if (edt) {
            if (edt.type == 'checkbox') {
                this._fullEdit = false; // no full edit on checkboxes...
            } else if (focus) {
                edt.setSelectionRange(0, edt.value.length);
            }
            this.onPrepareCellForEdit(e);

            // give the editor the focus in case it doesn't have it
            // NOTE: this happens on Android, it's strange...
            edt = this._edt;
            if (edt && focus) {
                edt.focus();
            }
        }

        // done
        return true;
    }

    /*
     * Commits any pending edits and exits edit mode.
     *
     * @param cancel Whether pending edits should be canceled or committed.
     * @return True if the edit operation finished successfully.
     */
    finishEditing(cancel = false): boolean {

        // always get rid of drop-down

        // make sure we're editing
        let edt = this._edt;
        if (!edt) {
            return true;
        }

        // get parameters
        let g     = this._g,
            rng   = this._rng,
            e     = new CellRangeEventArgs(g.cells, rng),
            focus = this._g.containsFocus();

        // edit ending
        e.cancel = cancel;
        this.onCellEditEnding(e);

        // apply edits
        if (!e.cancel) {
            let value: any = edt.type == 'checkbox' ? edt.checked : edt.value;
            for (let r = rng.topRow; r <= rng.bottomRow && r < g.rows.length; r++) {
                for (let c = rng.leftCol; c <= rng.rightCol && c < g.columns.length; c++) {
                    g.cells.setCellData(r, c, value, true);
                }
            }
        }

        // dispose of editor
        this._edt = null;
        this._rng = null;

        // restore focus // TFS 107464
        if (focus && !this._g.containsFocus()) {
            this._g.focus();
        }

        // edit ended
        this.onCellEditEnded(e);

        // done
        return true;
    }

    /*
     * Gets the <b>HTMLInputElement</b> that represents the cell editor currently active.
     */
    get activeEditor(): HTMLInputElement {
        return this._edt;
    }

    /*
     * Gets a @see:CellRange that identifies the cell currently being edited.
     */
    get editRange(): CellRange {
        return this._rng;
    }

    // ** implementation

    // checks whether a cell can be edited
    private _allowEditing(r: number, c: number) {
        let g = this._g;
        if (g.isReadOnly || g.selectionMode == SelectionMode.None) return false;
        if (r < 0 || r >= g.rows.length || g.rows[r].isReadOnly || !g.rows[r].isVisible) return false;
        if (c < 0 || c >= g.columns.length || g.columns[c].isReadOnly || !g.columns[c].isVisible) return false;
        return true;
    }

    // finish editing the current item
    private _commitRowEdits() {
        this.finishEditing();
        let grid = this._g,
            ecv  = tryCast(grid.collectionView, 'IEditableCollectionView');
        if (ecv && ecv.currentEditItem) {
            let e = new CellRangeEventArgs(grid.cells, grid.selection);
            this.onRowEditEnding(e);
            ecv.commitEdit();
            this.onRowEditEnded(e);
        }
    }

    // handles keyDown events while editing
    // returns true if the key was handled, false if the grid should handle it
    _keyDown(e): boolean {
        switch (e.keyCode) {

            // F2 toggles edit mode
            case Key.F2:
                this._fullEdit = !this._fullEdit;
                e.preventDefault();
                return true;

            // space toggles checkboxes
            case Key.Space:
                let edt = this._edt;
                if (edt && edt.type == 'checkbox') {
                    edt.checked = !edt.checked;
                    this.finishEditing();
                    e.preventDefault();
                }
                return true;

            // enter, tab, escape finish editing
            case Key.Enter:
            case Key.Tab:
                this.finishEditing();
                return false;
            case Key.Escape:
                this.finishEditing(true);
                return true;

            // cursor keys finish editing if not in full edit mode
            case Key.Up:
            case Key.Down:
            case Key.Left:
            case Key.Right:
            case Key.PageUp:
            case Key.PageDown:
            case Key.Home:
            case Key.End:
                if (!this._fullEdit) {
                    this.finishEditing();
                    return false;
                }
        }

        // return true to let editor handle the key (not the grid)
        return true;
    }

    //region ng input output
    /**
     * Occurs before a cell enters edit mode.
     */
    @Output()
    beginningEdit = new EventEmitter();

    /**
     * Raises the {@link beginningEdit} event.
     *
     * @param e {@link CellRangeEventArgs} that contains the event data.
     * @return True if the event was not canceled.
     */
    onBeginningEdit(e: CellRangeEventArgs): boolean {
        this.beginningEdit.emit(e);
        return !e.cancel;
    }

    /**
     * Occurs when an editor cell is created and before it becomes active.
     */
    @Output()
    prepareCellForEdit = new EventEmitter();

    /**
     * Raises the {@link prepareCellForEdit} event.
     *
     * @param e {@link CellRangeEventArgs} that contains the event data.
     */
    onPrepareCellForEdit(e: CellRangeEventArgs) {
        this.prepareCellForEdit.emit(e);
    }

    /**
     * Occurs when a cell edit is ending.
     */
    @Output()
    cellEditEnding = new EventEmitter();

    /**
     * Raises the {@link cellEditEnding} event.
     *
     * You can use this event to perform validation and prevent invalid edits.
     * For example, the code below prevents users from entering values that
     * do not contain the letter 'a'. The code demonstrates how you can obtain
     * the old and new values before the edits are applied.
     *
     * <pre>function cellEditEnding (sender, e) {
         *   // get old and new values
         *   let flex = sender,
         *   oldVal = flex.getCellData(e.row, e.col),
         *   newVal = flex.activeEditor.value;
         *   // cancel edits if newVal doesn't contain 'a'
         *   e.cancel = newVal.indexOf('a') &lt; 0;
         * }</pre>
     *
     * @param e {@link CellRangeEventArgs} that contains the event data.
     * @return True if the event was not canceled.
     */
    onCellEditEnding(e: CellRangeEventArgs): boolean {
        this.cellEditEnding.emit(e);
        return !e.cancel;
    }

    /**
     * Occurs when a cell edit has been committed or canceled.
     */
    @Output()
    cellEditEnded = new EventEmitter();

    /**
     * Raises the {@link cellEditEnded} event.
     *
     * @param e {@link CellRangeEventArgs} that contains the event data.
     */
    onCellEditEnded(e: CellRangeEventArgs) {
        this.cellEditEnded.emit(e);
    }

    /**
     * Occurs when a row edit is ending, before the changes are committed or canceled.
     */
    @Output()
    rowEditEnding = new EventEmitter();

    /**
     * Raises the {@link rowEditEnding} event.
     *
     * @param e {@link CellRangeEventArgs} that contains the event data.
     */
    onRowEditEnding(e: CellRangeEventArgs) {
        this.rowEditEnding.emit(e);
    }

    /**
     * Occurs when a row edit has been committed or canceled.
     */
    @Output()
    rowEditEnded = new EventEmitter();

    /**
     * Raises the {@link rowEditEnded} event.
     *
     * @param e {@link CellRangeEventArgs} that contains the event data.
     */
    onRowEditEnded(e: CellRangeEventArgs) {
        this.rowEditEnded.emit(e);
    }
    //endregion
}
