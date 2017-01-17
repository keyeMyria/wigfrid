import { GridPanel } from "../GridPanel";
import {Component, Host, Inject, forwardRef, Input, Self} from "@angular/core";
import { FlexGridComponent } from "../FlexGridComponent";
import { CellType } from "../enum/CellType";
import {AllowDragging} from "../enum/AllowDragging";
@Component({
    selector:   '[GridPanelRowHeader]',
    template:   `
        <div style="position: relative" [style.top.px]="-scrollPosition.y">
            <template let-cell ngFor [ngForOf]         = "getItems()">
                <ar-cell [cell]="cell" >
                    <template 
                    [ngTemplateOutlet]="cell.column.cellTemplate?.templateRef" 
                    [ngOutletContext]="{$implicit: cell.column.columnHeader, cell: cell}"></template>
                    <template [ngIf]="!cell.column.cellTemplate"></template>
                </ar-cell>
            </template>
        </div>
    `,
    styles: [
        `:host{
            position:absolute;
            overflow:hidden
        }`,
        `:host {
            max-height:inherit;
            outline:none;
        }`
    ]
})
export class GridPanelRowHeader extends GridPanel {
    constructor(@Self() @Inject(forwardRef(() => FlexGridComponent)) grid) {
        super(grid, CellType.RowHeader)
    }

    @Input('rows')
    protected _rows;

    @Input('columns')
    protected _cols;

    @Input('scrollPosition')
    scrollPosition;

    get draggable(): boolean {
        if ((this.grid.allowDragging & AllowDragging.Rows) != 0) {
            return true;
        }
    }
}
