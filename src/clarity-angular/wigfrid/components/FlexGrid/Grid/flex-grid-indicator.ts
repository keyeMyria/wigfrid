import {Component, Inject, forwardRef, Self, Input, SkipSelf} from "@angular/core";
import {FlexGridComponent} from "./FlexGridComponent";
import {IndicatorService} from "./Service/indicator-service";
@Component(
    {
        selector: 'ar-flex-grid-indicator',
        template:
            `<div 
            style="position: absolute;
                   background-color: #0085c7;
                   opacity: 0.5;
                   pointer-events: none;"
            [style.left.px]   = "getRectangle()?.x"
            [style.top.px]    = "getRectangle()?.y"
            [style.width.px]  = "getRectangle()?.width"
            [style.height.px] = "getRectangle()?.height"
            [innerHTML]       = "getIndicator()"
            ></div>`,
        host: {

        }
    }
)
export class FlexGridIndicator {

    constructor(@Inject(forwardRef(() => FlexGridComponent))
                private grid,
                @Inject(IndicatorService)
                private indicatorService: IndicatorService) {

    }

    @Input()
    indicatorHtml;

    getIndicator() {
        let serviceIndicatorHtml = this.indicatorService.indicatorHtml;
        if (serviceIndicatorHtml) {
            return serviceIndicatorHtml;
        } else {
            return this.indicatorHtml;
        }
    }

    @Input()
    indicatorRectangle;

    getRectangle() {
        let serviceRectangle = this.indicatorService.indicatorRectangle;
        if (serviceRectangle) {
            return serviceRectangle;
        } else {
            return this.indicatorRectangle;
        }
    }
}
