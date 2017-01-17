import {Directive, Self, Inject} from "@angular/core";
import {CellComponent} from "../../../CellComponent";
@Directive(
    {
        selector: 'ar-flex-grid-cell'
    }
)
export class FlexGridAutoResizeBindCell {

    constructor(@Self() @Inject(CellComponent) private cellComponent) {
        console.log('i have get binding cell component', cellComponent);
    }
}
