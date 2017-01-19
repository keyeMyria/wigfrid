import {Clipboard, tryCast} from "../../../../core/index";
import {GroupRow} from "../RowColumn";
import {CellRange} from "../CellRange";
import {CellRangeEventArgs} from "../CellRangeEventArgs";
import {Key} from "../../../../enum/Key";
import {SelMove} from "../enum/SelMove";
import {IEditableCollectionView} from "../../../../collections/interface/IEditableCollectionView";
import {SelectionMode} from "../enum/SelectionMode";
import {Inject, Self, Directive, forwardRef, HostListener} from "@angular/core";
import {EditHandlerDirective} from "./EditHandlerDirective";
import {FlexGridComponent} from "../FlexGridComponent";

/**
 * Handles the grid's keyboard commands.
 */
@Directive({
    selector: 'ar-flex-grid'
})
export class KeyboardHandlerDirective {
    _g:FlexGridComponent;

    /**
     * Initializes a new instance of a @see:_KeyboardHandler.
     *
     * @param grid @see:FlexGrid that owns this @see:_KeyboardHandler.
     * @param editHandler
     */
    constructor(@Self() @Inject(forwardRef(() => FlexGridComponent))
                private grid:FlexGridComponent,
                @Self() @Inject(EditHandlerDirective)
                private editHandler:EditHandlerDirective,) {
        this._g = grid;

        console.debug('KeyboardHandlerDirective instantiate successly');
        // grid.addEventListener(grid.hostElement, 'keypress', this._keyPress.bind(this));
        // grid.addEventListener(grid.hostElement, 'keydown', this._keyDown.bind(this));
    }

    // handles the key down event (selection)
    @HostListener('keydown', ['$event'])
    private _keyDown(e:KeyboardEvent) {
        console.debug('keydown event from KeyboardHandlerDirective');
        const g       = this._g,
              sel     = g.selection,
              ctrl    = e.ctrlKey || e.metaKey;
        let shift     = e.shiftKey,
              handled = true;

        if (g.isRangeValid(sel) && !e.defaultPrevented) {

            // pre-process handle keys while editor is active
            if (g.activeEditor && this.editHandler._keyDown(e)) {
                return;
            }

            // get the variables we need
            const gr    = <GroupRow>tryCast(g.rows[sel.row], GroupRow),
                  ecv   = <IEditableCollectionView>tryCast(g.collectionView, 'IEditableCollectionView');
            let keyCode = e.keyCode;

            // handle clipboard
            if (g.autoClipboard) {

                // copy: ctrl+c or ctrl+Insert
                if (ctrl && (e.keyCode == 67 || e.keyCode == 45)) {
                    var args = new CellRangeEventArgs(g.cells, sel);
                    if (g.onCopying(args)) {
                        const text = g.getClipString();
                        Clipboard.copy(text);
                        g.onCopied(args);
                    }
                    e.stopPropagation();
                    return;
                }

                // paste: ctrl+v or shift+Insert
                if ((ctrl && e.keyCode == 86) || (shift && e.keyCode == 45)) {
                    if (!g.isReadOnly) {
                        var args = new CellRangeEventArgs(g.cells, sel);
                        if (g.onPasting(args)) {
                            Clipboard.paste(function (text) {
                                g.setClipString(text);
                                g.onPasted(args);
                            });
                        }
                    }
                    e.stopPropagation();
                    return;
                }
            }

            // reverse left/right keys when rendering in right-to-left
            if (g._rtl) {
                switch (keyCode) {
                    case Key.Left:
                        keyCode = Key.Right;
                        break;
                    case Key.Right:
                        keyCode = Key.Left;
                        break;
                }
            }

            // default key handling
            switch (keyCode) {
                case 65: // ctrl+A: select all
                    if (ctrl) {
                        g.select(new CellRange(0, 0, g.rows.length - 1, g.columns.length - 1));
                    } else {
                        handled = false;
                    }
                    break;
                case Key.Left:
                    if (sel.isValid && sel.col == 0 && gr != null && !gr.isCollapsed && gr.hasChildren) {
                        gr.isCollapsed = true;
                    } else {
                        this._moveSel(SelMove.None, ctrl ? SelMove.Home : SelMove.Prev, shift);
                    }
                    break;
                case Key.Right:
                    if (sel.isValid && sel.col == 0 && gr != null && gr.isCollapsed) {
                        gr.isCollapsed = false;
                    } else {
                        this._moveSel(SelMove.None, ctrl ? SelMove.End : SelMove.Next, shift);
                    }
                    break;
                case Key.Up:
                    this._moveSel(ctrl ? SelMove.Home : SelMove.Prev, SelMove.None, shift);
                    break;
                case Key.Down:
                    this._moveSel(ctrl ? SelMove.End : SelMove.Next, SelMove.None, shift);
                    break;
                case Key.PageUp:
                    this._moveSel(SelMove.PrevPage, SelMove.None, shift);
                    break;
                case Key.PageDown:
                    this._moveSel(SelMove.NextPage, SelMove.None, shift);
                    break;
                case Key.Home:
                    this._moveSel(ctrl ? SelMove.Home : SelMove.None, SelMove.Home, shift);
                    break;
                case Key.End:
                    this._moveSel(ctrl ? SelMove.End : SelMove.None, SelMove.End, shift);
                    break;
                case Key.Tab:
                    this._moveSel(SelMove.None, shift ? SelMove.PrevCell : SelMove.NextCell, false);
                    break;
                case Key.Enter:
                    this._moveSel(shift ? SelMove.Prev : SelMove.Next, SelMove.None, false);
                    if (!shift && ecv && ecv.currentEditItem != null) {
                        ecv.commitEdit(); // in case we're at the last row
                    }
                    break;
                case Key.Escape:
                    if (ecv) {
                        if (ecv.currentEditItem != null) {
                            ecv.cancelEdit();
                        }
                        if (ecv.currentAddItem != null) {
                            ecv.cancelNew();
                        }
                    }
                    g._mouseHdl.resetMouseState();
                    break;
                case Key.Delete:
                    handled = this._deleteSel();
                    break;
                case Key.F2:
                    handled = g.startEditing(true);
                    break;
                case Key.Space:
                    handled = g.startEditing(true);
                    if (handled) {
                        setTimeout(function () {
                            const edt = g.activeEditor;
                            if (edt) {
                                if (edt.type == 'checkbox') {
                                    edt.checked = !edt.checked;
                                    g.finishEditing();
                                } else {
                                    const len = edt.value.length;
                                    edt.setSelectionRange(len, len);
                                }
                            }
                        }, 0);
                    }
                    break;
                default:
                    handled = false;
                    break;
            }
            if (handled) {
                e.preventDefault();
                e.stopPropagation();
            }
        }
    }

    // handles the key press event (start editing or try auto-complete)
    @HostListener('keypress', ['$event'])
    private _keyPress(e) {
        console.debug('keypress event from KeyBoardHandlerDirective');
        const g = this._g;
        if (g.activeEditor) {
            this.editHandler._keyPress(e);
        } else if (e.charCode > Key.Space) {
            if (g.startEditing(false) && g.activeEditor) {
                if (!g.columns[g.editRange.col].mask) { // don't mess up the mask
                    setTimeout(() => {
                        const edt = g.activeEditor;
                        if (edt && edt.type != 'checkbox') {
                            edt.value = String.fromCharCode(e.charCode); // FireFox needs this...
                            edt.setSelectionRange(1, 1);
                            this.editHandler._keyPress(e); // start auto-complete
                        }
                    }, 0);
                }
            }
        }
        e.stopPropagation();
    }

    // move the selection
    private _moveSel(rowMove:SelMove, colMove:SelMove, extend:boolean) {
        if (this._g.selectionMode != SelectionMode.None) {
            this._g._selHdl.moveSelection(rowMove, colMove, extend);
        }
    }

    // delete the selected rows
    private _deleteSel():boolean {
        const g       = this._g,
              ecv     = <IEditableCollectionView>tryCast(g.collectionView, 'IEditableCollectionView'),
              sel     = g.selection,
              rows    = g.rows,
              selRows = [];

        // if g.allowDelete and ecv.canRemove, and not editing/adding, (TFS 87718)
        // and the grid allows deleting items, then delete selected rows
        if (g.allowDelete && !g.isReadOnly &&
            (ecv == null || (ecv.canRemove && !ecv.isAddingNew && !ecv.isEditingItem))) {

            // get selected rows
            switch (g.selectionMode) {
                case SelectionMode.CellRange:
                    if (sel.leftCol == 0 && sel.rightCol == g.columns.length - 1) {
                        for (var i = sel.topRow; i > -1 && i <= sel.bottomRow; i++) {
                            selRows.push(rows[i]);
                        }
                    }
                    break;
                case SelectionMode.ListBox:
                    for (var i = 0; i < rows.length; i++) {
                        if (rows[i].isSelected) {
                            selRows.push(rows[i]);
                        }
                    }
                    break;
                case SelectionMode.Row:
                    if (sel.topRow > -1) {
                        selRows.push(rows[sel.topRow]);
                    }
                    break;
                case SelectionMode.RowRange:
                    for (var i = sel.topRow; i > -1 && i <= sel.bottomRow; i++) {
                        selRows.push(rows[i]);
                    }
                    break;
            }
        }

        // finish with row deletion
        if (selRows.length > 0) {

            // begin updates
            if (ecv) ecv.beginUpdate();
            g.beginUpdate();

            // delete selected rows
            const rng = new CellRange(),
                  e   = new CellRangeEventArgs(g.cells, rng);
            for (var i = selRows.length - 1; i >= 0; i--) {
                const r = selRows[i];
                rng.row = rng.row2 = r.index;
                g.onDeletingRow(e);
                if (!e.cancel) {
                    if (ecv && r.dataItem) {
                        ecv.remove(r.dataItem);
                    } else {
                        g.rows.removeAt(r.index);
                    }
                }
            }

            // finish updates
            g.endUpdate();
            if (ecv) ecv.endUpdate();

            // make sure one row is selected in ListBox mode (TFS 82683)
            if (g.selectionMode == SelectionMode.ListBox) {
                const index = g.selection.row;
                if (index > -1 && index < g.rows.length) {
                    g.rows[index].isSelected = true;
                }
            }

            // handle childItemsPath (TFS 87577)
            if (g.childItemsPath && g.collectionView) {
                g.collectionView.refresh();
            }

            // all done
            return true;
        }

        // delete cell content (if there is any) (TFS 94178)
        if (!g.isReadOnly && selRows.length == 0 && sel.isSingleCell) {
            if (g.getCellData(sel.row, sel.col, true)) {
                if (this.editHandler.startEditing(false, sel.row, sel.col)) {
                    this.editHandler.finishEditing(true);
                    if (g.setCellData(sel.row, sel.col, '', true)) {
                        g.invalidate();
                        return true;
                    }
                }
            }
        }

        // no deletion
        return false;
    }
}
