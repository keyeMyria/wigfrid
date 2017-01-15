import {Component, OnDestroy} from "@angular/core";
import {Input} from "@angular/core";

@Component({
    selector: 'cellRender',
    template: `{{content}}`
})
export class DefaultCellRenderComponent implements OnDestroy {
    @Input()
    public content;

    ngOnDestroy():any {
        return undefined;
    }

}
