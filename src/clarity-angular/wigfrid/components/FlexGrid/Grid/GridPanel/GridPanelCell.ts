import {GridPanel} from "../GridPanel";
import {Component, Inject, Input, ElementRef, Self, Host, forwardRef} from "@angular/core";
import {CellType} from "../enum/CellType";
import {FlexGridComponent} from "../FlexGridComponent";
@Component({
    selector: '[GridPanelCell]',
    template: `
    <template let-cell ngFor [ngForOf] = "getItems()">
        <ar-cell [cell]="cell" >
            <template 
            [ngTemplateOutlet]="cell.renderTemplate?.templateRef" 
            [ngOutletContext]="{$implicit: cell.column.cellTemplate, cell: cell}"></template>
            <template [ngIf]="!cell.column.cellTemplate">{{cell.content}}</template>
        </ar-cell>
    </template>
    `,
    styles: [
        `:host{
            position: relative;
            overflow:hidden;
        }`
    ]
})
export class GridPanelCell extends GridPanel {
    constructor( @Inject(forwardRef(() => FlexGridComponent)) grid,
                @Inject(ElementRef) public elementRef
    ) {
        super(grid, CellType.Cell);
        this.hostElement = elementRef.nativeElement;
    }

    @Input('rows')
    protected _rows;

    @Input('columns')
    protected _cols;

    /**
     * we need to know where we have scrolled, to calculate the range of present cell
     */
    @Input('scrollPosition')
    scrollPosition;
}
