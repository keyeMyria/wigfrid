import {Directive, Output, EventEmitter} from "@angular/core";
import {CellRangeEventArgs} from "../CellRangeEventArgs";
import {asArray, copy} from "../../../../core/index";
@Directive({
    selector: 'ar-flex-grid'
           })
export class ClipHandlerDirective {
    constructor() {

    }

    //#region ng input output
    /**
     * Occurs when the user is copying the selection content to the
     * clipboard by pressing one of the clipboard shortcut keys
     * (see the {@link autoClipboard} property).
     *
     * The event handler may cancel the copy operation.
     */
    @Output()
    copying = new EventEmitter();

    /**
     * Raises the {@link copying} event.
     *
     * @param e {@link CellRangeEventArgs} that contains the event data.
     * @return True if the event was not canceled.
     */
    onCopying(e: CellRangeEventArgs): boolean {
        this.copying.emit(e);
        return !e.cancel;
    }

    /**
     * Occurs after the user has copied the selection content to the
     * clipboard by pressing one of the clipboard shortcut keys
     * (see the {@link autoClipboard} property).
     */
    @Output()
    copied = new EventEmitter();

    /**
     * Raises the {@link copied} event.
     *
     * @param e {@link CellRangeEventArgs} that contains the event data.
     */
    onCopied(e: CellRangeEventArgs) {
        this.copied.emit(e);
    }

    /**
     * Occurs when the user is pasting content from the clipboard
     * by pressing one of the clipboard shortcut keys
     * (see the {@link autoClipboard} property).
     *
     * The event handler may cancel the copy operation.
     */
    @Output()
    pasting = new EventEmitter();

    /**
     * Raises the {@link pasting} event.
     *
     * @param e {@link CellRangeEventArgs} that contains the event data.
     * @return True if the event was not canceled.
     */
    onPasting(e: CellRangeEventArgs): boolean {
        this.pasting.emit(e);
        return !e.cancel;
    }

    /**
     * Occurs after the user has pasted content from the
     * clipboard by pressing one of the clipboard shortcut keys
     * (see the {@link autoClipboard} property).
     */
    @Output()
    pasted = new EventEmitter();

    /**
     * Raises the {@link pasted} event.
     *
     * @param e {@link CellRangeEventArgs} that contains the event data.
     */
    onPasted(e: CellRangeEventArgs) {
        this.pasted.emit(e);
    }
    //#endregion


    /**
     * method used in JSON-style initialization
     * @param key
     * @param value
     * @returns {boolean}
     * @private
     * @deprecated
     */
    _copy(key: string, value: any): boolean {
        if (key == 'columns') {
            let arr = asArray(value);
            for (let i = 0; i < arr.length; i++) {
                let c = new Column(this.columns);
                copy(c, arr[i]);
                this.columns.push(c);
            }
            return true;
        }
        return false;
    }

    /**
     * Gets the content of a {@link CellRange} as a string suitable for
     * copying to the clipboard.
     *
     * Hidden rows and columns are not included in the clip string.
     *
     * @param rng {@link CellRange} to copy. If omitted, the current selection is used.
     */
    getClipString(rng?: CellRange): string {
        rng            = rng ? asType(rng, CellRange) : this.selection;
        let clipString = '';
        for (let r = rng.topRow; r <= rng.bottomRow; r++) {
            if (!this.rows[r].isVisible) continue;
            let first = true;
            if (clipString) clipString += '\n';
            for (let c = rng.leftCol; c <= rng.rightCol; c++) {
                if (!this.columns[c].isVisible) continue;
                if (!first) clipString += '\t';
                first    = false;
                let cell = this.cells.getCellData(r, c, true).toString();
                cell     = cell.replace(/\t/g, ' ');
                clipString += cell;
            }
        }
        return clipString;
    }

    /**
     * Parses a string into rows and columns and applies the content to a given range.
     *
     * Hidden rows and columns are skipped.
     *
     * @param text Tab and newline delimited text to parse into the grid.
     * @param rng {@link CellRange} to copy. If omitted, the current selection is used.
     */
    setClipString(text: string, rng?: CellRange) {

        // get target range
        let autoRange = rng == null;
        rng           = rng ? asType(rng, CellRange) : this.selection;
        // normalize text
        text          = asString(text).replace(/\r\n/g, '\n').replace(/\r/g, '\n');
        if (text && text[text.length - 1] == '\n') {
            text = text.substring(0, text.length - 1);
        }
        if (autoRange && !rng.isSingleCell) {
            text = this._expandClipString(text, rng);
        }
        // keep track of paste range to select later
        let rngPaste = new CellRange(rng.topRow, rng.leftCol);
        // copy lines to rows
        this.beginUpdate();
        let row   = rng.topRow,
            lines = text.split('\n'),
            e: CellRangeEventArgs;
        for (let i = 0; i < lines.length && row < this.rows.length; i++, row++) {

            // skip invisible row, keep clip line
            if (!this.rows[row].isVisible) {
                i--;
                continue;
            }
            // copy cells to columns
            let cells = lines[i].split('\t'),
                col   = rng.leftCol;
            for (let j = 0; j < cells.length && col < this.columns.length; j++, col++) {

                // skip invisible column, keep clip cell
                if (!this.columns[col].isVisible) {
                    j--;
                    continue;
                }
                // assign cell
                if (!this.columns[col].isReadOnly && !this.rows[row].isReadOnly) {

                    // raise edit events so user can cancel the assignment
                    e = new CellRangeEventArgs(this.cells, new CellRange(row, col));
                    if (this.onBeginningEdit(e)) {

                        // make the assignment
                        if (this.cells.setCellData(row, col, cells[j])) {

                            // raise post-edit events
                            this.onCellEditEnding(e);
                            this.onCellEditEnded(e);
                            // update paste range
                            rngPaste.row2 = Math.max(rngPaste.row2, row);
                            rngPaste.col2 = Math.max(rngPaste.col2, col);
                        }
                    }
                }
                // raise more post-edit events (for row validation)
                this.onRowEditEnding(e);
                this.onRowEditEnded(e);
            }
        }
        this.endUpdate();
        // done, refresh view to update sorting/filtering
        if (this.collectionView) {
            this.collectionView.refresh();
        }
        // select pasted range
        this.select(rngPaste);
    }

    // expand clip string to get Excel-like behavior
    _expandClipString(text: string, rng: CellRange): string {

        // sanity
        if (!text) return text;
        // get clip string dimensions and cells
        let lines   = text.split('\n'),
            srcRows = lines.length,
            srcCols = 0,
            rows    = [];
        for (let r = 0; r < srcRows; r++) {
            let cells = lines[r].split('\t');
            rows.push(cells);
            if (r > 1 && cells.length != srcCols) return text;
            srcCols = cells.length;
        }
        // expand if destination size is a multiple of source size (like Excel)
        let dstRows = rng.rowSpan,
            dstCols = rng.columnSpan;
        if (dstRows > 1 || dstCols > 1) {
            if (dstRows == 1) dstRows = srcRows;
            if (dstCols == 1) dstCols = srcCols;
            if (dstCols % srcCols == 0 && dstRows % srcRows == 0) {
                text = '';
                for (let r = 0; r < dstRows; r++) {
                    for (let c = 0; c < dstCols; c++) {
                        if (r > 0 && c == 0) text += '\n';
                        if (c > 0) text += '\t';
                        text += rows[r % srcRows][c % srcCols];
                    }
                }
            }
        }
        // done
        return text;
    }
}
