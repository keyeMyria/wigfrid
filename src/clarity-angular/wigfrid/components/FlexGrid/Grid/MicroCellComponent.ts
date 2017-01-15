import {
    Component,
    Inject,
    ViewChild,
    Input,
    Injector,
    ElementRef,
    AfterViewInit,
    ComponentRef,
    OnInit,
    DoCheck,
    HostBinding,
    ViewContainerRef
} from "@angular/core";
import { Cell } from "./Cell";
import { DefaultCellRenderComponent } from "../CellRender/DefaultCellRenderComponent";
import { SelectedState } from "./enum/SelectedState";
import { DataType } from "../../../core/index";
import { tryCast } from "../../../core/index";
import { GroupRow } from "./RowColumn/GroupRow";
import { FlexGridDirective } from "./FlexGridDirective";
import { CellType } from "./enum/CellType";
import { TextInputEditor } from "../CellEditor/TextInputEditor";
import { CellRangeEventArgs } from "./CellRangeEventArgs";
import { _EditHandler } from "./Handler/index";
import { FlexGridEditor } from "./metadata";
@Component({
    selector:   'ar-micro-cell',
    template:   `<ng-container #content></ng-container>`,
    host:       {
        '[style.left.px]':   "cell.gridPanel.grid._rtl ? null : cell.column.pos",
        '[style.right.px]':  "cell.gridPanel.grid._rtl ? cell.column.pos : null",
        '[style.top.px]':    "cell.row.pos",
        '[style.height.px]': "cell.height",
        '[style.width.px]':  "cell.width",
        '[style.textAlign]': "cell.column.getAlignment()",
    }
})
export class MicroCellComponent implements OnInit, DoCheck, AfterViewInit {

    private _cell;
    private _mask;
    private _renderComponentRef:ComponentRef;

    private cellStatus:CellStatus;
    private grid;

    /**
     * dynamicComponentLoader to load component
     * @returns {ComponentRef}
     */
    private get renderComponentRef():ComponentRef {
        return this._renderComponentRef;
    }

    private set renderComponentRef(value:ComponentRef) {
        if (this._renderComponentRef !== value) {
            if (this.renderComponentRef) this.renderComponentRef.destroy();
            this._renderComponentRef = value;
        }
    }

    @Input()
    public selectedState:SelectedState;

    @Input()
    public get cell():Cell {
        return this._cell;
    }

    public set cell(value:Cell) {
        this._cell = value;
    }


    @HostBinding('class')
    public get computeClass() {
        let cl = [];
        cl.push('wj-cell');
        if (this.cell.cellType == CellType.Cell) {
            let gr = tryCast(this.cell.row, GroupRow);

            switch (this.selectedState) {
                case SelectedState.Cursor:
                    cl.push('wj-state-selected');
                    break;
                case SelectedState.Selected:
                    cl.push('wj-state-multi-selected');
                    break;
                case SelectedState.None:
                    if (gr) {
                        cl.push('wj-group');
                    } else if (this.cell.row.index % 2 != 0) {
                        cl.push('wj-alt');
                    }
                    break;
            }
        } else {
            cl.push('wj-header')
        }
        return cl.join(' ');
    }

    public get mask() {
        return this._mask;
    }

    /**
     * column mask
     * @param value
     */
    @Input()
    public set mask(value) {
        this._mask = value;
    }

    @ViewChild('content', {read: ViewContainerRef})
    private contentViewContainerRef:ViewContainerRef;

    constructor(@Inject(DynamicComponentLoader) private dynamicLoader:DynamicComponentLoader,
                private injector:Injector,
                private elementRef:ElementRef
                // Inject(ColumnEditor) editor: Editor
    ) {
    }

    ngOnInit():any {
        this.grid = this.injector.get(FlexGridDirective);
        return;
    }

    ngAfterViewInit() {
        this.createRender();
        this.grid.beginningEdit.subscribe(
            (cellRangeEvent:CellRangeEventArgs) => {
                if (cellRangeEvent.cellRange.contains(this.cell.row.index, this.cell.column.index)) {
                    this.cellStatus = CellStatus.EndEdit;
                    this.createEditor();
                }
            }
        );
        this.grid.cellEditEnding.subscribe(
            (cellRangeEvent:CellRangeEventArgs) => {
                if (cellRangeEvent.cellRange.contains(this.cell.row.index, this.cell.column.index)) {
                    this.cellStatus = CellStatus.EndEdit;
                    this.createRender();
                }
            }
        );
    }

    ngDoCheck() {
        if (this.cell.cellType == CellType.Cell) {
            let selState = this.grid.getSelectedState(this.cell.row.index, this.cell.column.index), g = this.grid, row = this.cell.row, col = this.cell.column, gr = tryCast(this.cell.row, GroupRow);

            // get selected state for painting cells
            // var selState = g.getSelectedState(r, c);

            // paint text editor as regular cell
            if (g.editRange && col.dataType != DataType.Boolean && g.editRange.contains(row.index, col.index)) {
                selState = SelectedState.None;
            }

            this.selectedState = selState;
        }
    }

    createEditor() {
        this.cellStatus = CellStatus.StartEdit;
        let config      = this.injector.get(FlexGridEditor);
        let configValue = config.find((element, index, array) => this.cell.column.name === element.name);
        let editor;
        if (configValue) {
            editor = configValue.editor;
        } else {
            editor = TextInputEditor;
        }
        this.dynamicLoader.loadNextToLocation(editor, this.contentViewContainerRef)
            .then(
                (componentRef:ComponentRef) => {
                    this.renderComponentRef = componentRef;

                    componentRef.instance.value = this.cell.content;
                }
            );
    }

    createRender() {
        this.cellStatus = CellStatus.Idle;
        this.dynamicLoader.loadNextToLocation(DefaultCellRenderComponent, this.contentViewContainerRef)
            .then(
                (componentRef:ComponentRef) => {
                    this.renderComponentRef       = componentRef;
                    componentRef.instance.content = this.cell.content;
                }
            );
    }

}

enum CellStatus {
    Idle      = 1,
    StartEdit = 2,
    Editing   = 4,
    EndEdit   = 8,
}
