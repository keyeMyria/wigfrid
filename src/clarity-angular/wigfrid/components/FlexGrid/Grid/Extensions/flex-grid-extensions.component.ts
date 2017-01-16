import {Component, Inject} from "@angular/core";
import {FlexGridComponent} from "../FlexGridComponent";
import {FlexGridExtensionsService} from "./flex-grid-extensions.service";
@Component(
    {
        selector: 'ar-flex-grid-extensions',
        template: `<ng-content></ng-content>`
    }
)
export class FlexGridExtensions {

    constructor(@Inject(FlexGridComponent) flexgrid: FlexGridComponent,
                @Inject(FlexGridExtensionsService) public flexgridExtendsService) {

        flexgridExtendsService.grid = flexgrid;


    }
}
