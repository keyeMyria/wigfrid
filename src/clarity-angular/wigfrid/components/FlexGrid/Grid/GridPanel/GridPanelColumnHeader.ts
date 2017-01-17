import { GridPanel } from "../GridPanel";
import {Component, forwardRef, Inject, Input, ElementRef, Host, Self} from "@angular/core";
import { FlexGridComponent } from "../FlexGridComponent";
import { CellType } from "../enum/CellType";
import {AllowDragging} from "../enum/AllowDragging";
@Component({
    selector:   '[GridPanelColumnHeader]',
    template:   `
        <div style="position: relative" [style.left.px]="-scrollPosition.x">
            <template let-cell ngFor [ngForOf]         = "getItems()">
                <ar-cell [cell]="cell" >
                    <template 
                    [ngTemplateOutlet]="cell.renderTemplate?.templateRef" 
                    [ngOutletContext]="{$implicit: cell.renderTemplate, cell: cell}"></template>
                    <template [ngIf]="!cell.renderTemplate">{{cell.content}}</template>
                </ar-cell>
            </template>
        </div>
    `,
    styles: [
        `:host {
            position:absolute;
            overflow:hidden
        }`,
        `:host {
            max-height:inherit;
            outline:none;
        }`
    ]
})
export class GridPanelColumnHeader extends GridPanel {
    constructor( @Inject(forwardRef(() => FlexGridComponent)) grid,
                @Inject(ElementRef) public elementRef
    ) {
        super(grid, CellType.ColumnHeader);
        this.hostElement = elementRef.nativeElement;
    }

    @Input('rows')
    protected _rows;

    @Input('columns')
    protected _cols;

    @Input('scrollPosition')
    scrollPosition;

    get draggable(): boolean {
        if ((this.grid.allowDragging & AllowDragging.Columns) != 0) {
            return true;
        }
    }
}
