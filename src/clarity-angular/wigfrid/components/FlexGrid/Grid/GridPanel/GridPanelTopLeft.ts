import { GridPanel } from "../GridPanel";
import {Component, forwardRef, Inject, Input, ElementRef} from "@angular/core";
import { FlexGridDirective } from "../FlexGridDirective";
import { CellType } from "../enum/CellType";
@Component({
    selector:   '[GridPanelTopLeft]',
    template:   `
        <div style="position: relative">
            <template let-cell ngFor [ngForOf] = "getItems()">
                <ar-cell [cell]="cell" >{{cell.content}}</ar-cell>
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
    constructor(@Inject(forwardRef(() => FlexGridDirective)) grid,
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
