import {Directive, Self, Inject, OnDestroy} from "@angular/core";
import {CellComponent} from "../../../CellComponent";
import {GridPanelContainer} from "./grid-panel-container";
import {CellType} from "../../../enum/CellType";
@Directive(
    {
        selector: 'ar-flex-grid-cell'
    }
)
export class FlexGridAutoResizeBindingCell implements OnDestroy {

    constructor(@Self() @Inject(CellComponent) private cellComponent: CellComponent,
                @Inject(GridPanelContainer) private container: GridPanelContainer) {

        container.bindingCell = this;
        console.log('i have get binding cell component', cellComponent);
    }

    ngOnInit() {
        const {cell} = this.cellComponent;
        this.container.insert(cell);
    }

    ngOnDestroy() {
        const {cell} = this.cellComponent;
        this.container.remove(cell);
        console.debug('cell have been destory');
    }
}
