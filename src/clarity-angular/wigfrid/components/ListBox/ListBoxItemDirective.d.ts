import { TemplateRef, ViewContainerRef, ChangeDetectorRef } from "@angular/core";
/**
 * Just want to make a ngFor like directive
 * @deprecated
 */
export declare class ListBoxItemDirective {
    private _viewContainer;
    private _templateRef;
    private _cdr;
    checkedMemberPath: string;
    constructor(_viewContainer: ViewContainerRef, _templateRef: TemplateRef, _cdr: ChangeDetectorRef);
    arListBoxItemTemplate: TemplateRef;
    private ngAfterViewInit();
    private ngDoCheck();
}
