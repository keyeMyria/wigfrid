import {Directive, Self, Inject, SkipSelf, Input} from "@angular/core";
import {IndicatorService} from "../../../../../clarity-angular/wigfrid/components/FlexGrid/Grid/Service/indicator-service";
import {MouseHandlerDirective} from "../../../../../clarity-angular/wigfrid/components/FlexGrid/Grid/Handler/MouseHandlerDirective";
@Directive(
    {
        selector: "ar-flex-grid",
    }
)
export class IndicatorHandlerTools {

    constructor(
        @Self() @Inject(IndicatorService) private indicatorService: IndicatorService,
        @Self() @Inject(MouseHandlerDirective) private mouseHandler: MouseHandlerDirective
    ) {
        console.log('indicator tools instantiate successfully');
    }

    ngOnInit() {
        // this.indicatorService.indicatorHtml = `<div class="wj-marker">&nbsp;</div>`;
    }

    @Input()
    set columnIndicator(value: number) {
        if(value) {
            //noinspection TypeScriptUnresolvedFunction
            this.mouseHandler._showResizeMarker(value);
        }
    }
}
