import {Component, Inject, forwardRef} from "@angular/core";
import {FlexGridComponent} from "../FlexGridComponent";
import {FlexGridExtensionsService} from "./flex-grid-extensions.service";
@Component(
    {
        selector: 'ar-flex-grid-extensions',
        template: `<ng-content></ng-content>`
    }
)
export class FlexGridExtensions {

    constructor(@Inject(forwardRef(() => FlexGridComponent)) flexgrid,
                @Inject(FlexGridExtensionsService) public flexgridExtendsService) {

        flexgridExtendsService.grid = flexgrid;


    }
}
