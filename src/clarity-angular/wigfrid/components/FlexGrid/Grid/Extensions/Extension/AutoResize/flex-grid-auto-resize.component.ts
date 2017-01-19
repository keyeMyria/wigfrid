import {Component, ViewContainerRef, Inject, OnInit, ElementRef} from "@angular/core";
import {GridPanelContainer} from "./grid-panel-container";
import {Cell} from "../../../Cell";
import {Size} from "../../../../../../core/index";
import {FlexGridExtension} from "../flex-grid-extension";
import {FlexGridExtensionsService} from "../../flex-grid-extensions.service";

/**
 * flex grid auto resize
 */
@Component(
    {
        selector: 'ar-flex-grid-auto-resize',
        template: `
`
    }
)
export class FlexGridAutoResize extends FlexGridExtension implements OnInit {
    extensionName = "auto-resize";
    enabled;

    constructor(@Inject(FlexGridExtensionsService) public flexGridExtensionsService: FlexGridExtensionsService,
                @Inject(GridPanelContainer) private gridPanelContainer: GridPanelContainer,
                private viewContainerRef: ViewContainerRef,
                private elementRef: ElementRef) {
        super();
    }

    ngOnDestroy() {
        this.unRegister();
    }

    ngOnInit() {
        this.register();
    }

    ngDoCheck() {
        let columnMaxList = [];
        let rowMaxList    = [];

        for (let i = 0; i < this.gridPanelContainer.cellList.length; i++) {
            let cell: Cell  = this.gridPanelContainer.cellList[i],
                columnIndex = cell.column.index,
                rowIndex    = cell.row.index;
            if (cell.renderTemplate && cell.renderTemplate.templateRef) {
                let size                   = this.measureAutoSize(cell);
                rowMaxList[rowIndex]       = Math.max(Math.max(0, size.height), rowMaxList[rowIndex]);
                columnMaxList[columnIndex] = Math.max(Math.max(0, size.width), columnMaxList[columnIndex]);
            }
        }
        console.log('we are happy to get result', columnMaxList, rowMaxList);
    }

    measureAutoSize(cell) {
        let viewRef      = this.viewContainerRef.createEmbeddedView(cell.renderTemplate.templateRef, {$implicit: cell.column.cellTemplate, cell: cell});
        let measuredSize = new Size(this.elementRef.nativeElement.parentElement.offsetWidth, this.elementRef.nativeElement.parentElement.offsetHeight);
        viewRef.destroy();
        return measuredSize;
    }

}
