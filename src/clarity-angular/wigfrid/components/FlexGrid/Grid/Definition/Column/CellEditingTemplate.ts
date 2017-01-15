import { Directive, TemplateRef } from "@angular/core";
@Directive({
    selector: '[CellEditingTemplate]'
})
export class CellEditingTemplate implements DataTemplate {
    constructor(public templateRef: TemplateRef) {
    }
}
