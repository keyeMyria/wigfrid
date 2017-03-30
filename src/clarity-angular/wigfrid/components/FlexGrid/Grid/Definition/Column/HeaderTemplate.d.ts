import { TemplateRef } from "@angular/core";
export declare class HeaderTemplate implements DataTemplate {
    column: any;
    templateRef: TemplateRef;
    /**
     *
     * @param column inject base Column class will be ok
     * @param templateRef
     */
    constructor(column: any, templateRef: TemplateRef);
}
