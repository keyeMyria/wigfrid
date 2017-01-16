import {Directive, Self, Inject, SkipSelf, Input} from "@angular/core";
import {MouseHandlerDirective} from "../../../../../clarity-angular/wigfrid/components/FlexGrid/Grid/Handler/MouseHandlerDirective";
@Directive(
    {
        selector: "ar-flex-grid",
    }
)
export class IndicatorHandlerTools {

    constructor(
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
        }
    }
}
