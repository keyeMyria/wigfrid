import {Component, Inject, forwardRef, Self, Input, SkipSelf} from "@angular/core";
import {FlexGridComponent} from "../../../FlexGridComponent";
import {FlexGridExtensionsService} from "../../flex-grid-extensions.service";
import {FlexGridExtension} from "../flex-grid-extension";
@Component(
    {
        selector: 'ar-flex-grid-indicator',
        template: `<div *ngIf="enabled"
            style="position: absolute;
                   background-color: #0085c7;
                   opacity: 0.5;
                   pointer-events: none;"
            [style.left.px]   = "indicatorRectangle?.x"
            [style.top.px]    = "indicatorRectangle?.y"
            [style.width.px]  = "indicatorRectangle?.width"
            [style.height.px] = "indicatorRectangle?.height"
            ></div>`,
    }
)
export class FlexGridIndicatorExtension extends FlexGridExtension {

    public extensionName = "indicator";

    public enabled = true;

    constructor(@Inject(FlexGridExtensionsService) public flexGridExtensionsService: FlexGridExtensionsService) {
        super();
    }

    @Input()
    indicatorRectangle;


    register() {
        this.flexGridExtensionsService.register(this.extensionName, this);
    }

    unRegister() {
        this.flexGridExtensionsService.unRegister(this.extensionName);
    }

    ngOnInit() {
        this.register();
    }

    ngOnDestroy() {
        this.unRegister();
    }

}
