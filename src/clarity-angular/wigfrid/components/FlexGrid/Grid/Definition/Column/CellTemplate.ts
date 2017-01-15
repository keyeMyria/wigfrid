import { Directive, Inject, forwardRef, TemplateRef } from "@angular/core";
import { ColumnDefinition } from "../ColumnDefinition";
@Directive({
    selector: '[CellTemplate]'
})
export class CellTemplate implements DataTemplate {
    constructor(@Inject(forwardRef(() => ColumnDefinition))
                public column,
                public templateRef: TemplateRef) {
        console.log('cell template instant', templateRef)
    }
}
