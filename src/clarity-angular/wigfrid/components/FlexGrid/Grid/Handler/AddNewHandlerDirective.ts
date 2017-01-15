import {tryCast} from "../../../../core/index";
import {CellRangeEventArgs} from "../CellRangeEventArgs";
import {IEditableCollectionView} from "../../../../collections/interface/IEditableCollectionView";
import {RowColFlags} from "../enum/RowColFlags";
import {_NewRowTemplate} from "./_NewRowTemplate";
import {Directive, Inject, forwardRef, HostListener} from "@angular/core";
import {FlexGridComponent} from "../FlexGridComponent";


/**
 * Manages the new row template used to add rows to the grid.
 */
@Directive({
    selector: 'ar-flex-grid'
})
export class AddNewHandlerDirective {
    private _g: FlexGridComponent;
    private _nrt = new _NewRowTemplate();

    /**
     * Initializes a new instance of an @see:_AddNewHandler.
     *
     * @param grid @see:FlexGrid that owns this @see:_AddNewHandler.
     */
    constructor(
        @Inject(forwardRef(() => FlexGridComponent))
        grid: FlexGridComponent
    ) {
        console.debug('AddNewHandlerDirective instantiate successfully');
        this._g = grid;
    }

    /**
     * Update the new row template to ensure it's visible only if the grid is bound
     * to a data source that supports adding new items, and that it is in the
     * right position.
     */
    @HostListener('loadedRows', ['$event'])
    updateNewRowTemplate() {

        // get variables
        let ecv = <IEditableCollectionView>tryCast(this._g.collectionView, 'IEditableCollectionView'),
            g = this._g,
            rows = g.rows;

        // see if we need a new row template
        let needTemplate = ecv && ecv.canAddNew && g.allowAddNew && !g.isReadOnly;

        // get current template index
        let index = rows.indexOf(this._nrt);

        // update template position
        if (!needTemplate && index > -1) { // not needed but present, remove it
            rows.removeAt(index);
        } else if (needTemplate) {
            if (index < 0) { // needed but not present, add it now
                rows.push(this._nrt);
            } else if (index != rows.length - 1) { // position template
                rows.removeAt(index);
                rows.push(this._nrt);
            }

            // make sure the new row template is not collapsed
            if (this._nrt) {
                this._nrt._setFlag(RowColFlags.ParentCollapsed, false);
            }
        }
    }

    // ** implementation

    // beginning edit, add new item if necessary
    @HostListener('beginningEdit', ['$event'])
    private _beginningEdit(e: CellRangeEventArgs) {
        if (!e.cancel) {
            let row = this._g.rows[e.row];
            if (tryCast(row, _NewRowTemplate)) {
                let ecv = <IEditableCollectionView>tryCast(this._g.collectionView, 'IEditableCollectionView');
                if (ecv && ecv.canAddNew) {

                    // start adding new row
                    let newItem = ecv.isAddingNew ? ecv.currentAddItem : ecv.addNew();
                    ecv.moveCurrentTo(newItem);
                    this.updateNewRowTemplate();

                    // update now to ensure the editor will get a fresh layout (TFS 96705)
                    this._g.refresh(true);

                    // fire row added event (user can customize the new row or cancel)
                    this._g.onRowAdded(e);
                    if (e.cancel) {
                        ecv.cancelNew();
                    }
                }
            }
        }
    }

    // row has been edited, commit if this is the new row
    @HostListener('rowEditEnded', ['$event'])
    private _rowEditEnded(e: CellRangeEventArgs) {
        let ecv = <IEditableCollectionView>tryCast(this._g.collectionView, 'IEditableCollectionView');
        if (ecv && ecv.isAddingNew) {
            ecv.commitNew();
        }
    }
}
