import {Component} from "@angular/core";
import {TemplateRef} from "@angular/core";
import {Directive} from "@angular/core";
import {ViewContainerRef} from "@angular/core";
import {ChangeDetectorRef} from "@angular/core";
import {IterableDiffers} from "@angular/core";
import {Inject} from "@angular/core";
import {Optional} from "@angular/core";
import {Input} from "@angular/core";

/**
 * Just want to make a ngFor like directive
 * @deprecated
 */
@Directive(
    {
        selector: '[arListBoxItem]',
        inputs  : ['arListBoxItem', 'arListBoxItemTemplate']
    }
)
export class ListBoxItemDirective {

    checkedMemberPath: string;

    constructor(private _viewContainer: ViewContainerRef,
                private _templateRef: TemplateRef,
                private _cdr: ChangeDetectorRef
    ) {
        console.log('arlistboxitem directive is running');
    }

    @Input()
    set arListBoxItemTemplate(value: TemplateRef) {
        if (value) {
            this._templateRef = value;
        }
    }

    private ngAfterViewInit() {
        console.log('=================> ngAfterViewInit <===========');
        console.log(this._viewContainer);
        console.log(this._templateRef);
        console.log(this._cdr)
    }

    private ngDoCheck() {

        let view = this._viewContainer.createEmbeddedView(this._templateRef, 0);
        console.log(view);
    }
}
