import { Directive, Inject, forwardRef, TemplateRef } from "@angular/core";
import { ColumnDefinition } from "../ColumnDefinition";
@Directive({
    selector: '[HeaderTemplate]'
})
export class HeaderTemplate implements DataTemplate{
    /**
     *
     * @param column inject base Column class will be ok
     * @param templateRef
     */
    constructor(@Inject(forwardRef(() => ColumnDefinition))
                public column,
                public templateRef: TemplateRef) {
        console.log('insitiate column header', templateRef)
    }
}
