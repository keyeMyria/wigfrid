import {GridPanel} from "../GridPanel";
import {Component, Inject, Input, ElementRef, Host, Self, forwardRef} from "@angular/core";
import {FlexGridComponent} from "../FlexGridComponent";
import {CellType} from "../enum/CellType";
@Component({
    selector:   '[GridPanelTopLeft]',
    template:   `
        <div style="position: relative">
            <template let-cell ngFor [ngForOf] = "getItems()">
                <ar-flex-grid-cell [cell]="cell" >{{cell.content}}</ar-flex-grid-cell>
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
export class GridPanelTopLeft extends GridPanel {
    constructor( @Inject(forwardRef(() => FlexGridComponent)) grid,
                @Inject(ElementRef) public elementRef
    ) {
        super(grid, CellType.TopLeft);
        this.hostElement = elementRef.nativeElement;
    }

    @Input('rows')
    protected _rows;

    @Input('columns')
    protected _cols;

    @Input('scrollPosition')
    scrollPosition;
}
