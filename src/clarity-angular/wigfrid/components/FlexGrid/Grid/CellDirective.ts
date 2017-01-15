import {
    ViewChild,
    Input,
    Injector,
    ElementRef,
    ComponentRef,
    HostBinding,
    ViewContainerRef,
    Directive
} from "@angular/core";
import {Cell} from "./Cell";
import {SelectedState} from "./enum/SelectedState";
import {DataType, tryCast} from "../../../core/index";
import {GroupRow} from "./RowColumn/GroupRow";
import {FlexGridDirective} from "./FlexGridDirective";
import {CellType} from "./enum/CellType";
@Directive({
               selector: 'ar-cell',
               host: {
                   '[style.left.px]': "cell.gridPanel.grid._rtl ? null : cell.column.pos",
                   '[style.right.px]': "cell.gridPanel.grid._rtl ? cell.column.pos : null",
                   '[style.top.px]': "cell.row.pos",
                   '[style.height.px]': "cell.height",
                   '[style.width.px]': "cell.width",
                   '[style.textAlign]': "cell.column.getAlignment()",
                   '[draggable]': "cell.gridPanel.draggable"
               }
           }
)
export class CellDirective {

    private _cell;
    private _mask;
    private _renderComponentRef: ComponentRef;

    private cellStatus: CellStatus;
    private grid;

    /**
     * dynamicComponentLoader to load component
     * @returns {ComponentRef}
     */
    private get renderComponentRef(): ComponentRef {
        return this._renderComponentRef;
    }

    private set renderComponentRef(value: ComponentRef) {
        if (this._renderComponentRef !== value) {
            if (this.renderComponentRef) this.renderComponentRef.destroy();
            this._renderComponentRef = value;
        }
    }

    @Input()
    public selectedState: SelectedState;

    @Input()
    public get cell(): Cell {
        return this._cell;
    }

    public set cell(value: Cell) {
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
    private contentViewContainerRef: ViewContainerRef;

    constructor(private injector: Injector,
                private elementRef: ElementRef
                // Inject(ColumnEditor) editor: Editor
    ) {
    }

    ngOnInit(): any {
        this.grid = this.injector.get(FlexGridDirective);
        return;
    }

    ngDoCheck() {
        if (this.cell.cellType == CellType.Cell) {
            let selState = this.grid.getSelectedState(this.cell.row.index, this.cell.column.index),
                g        = this.grid,
                row      = this.cell.row,
                col      = this.cell.column,
                gr       = tryCast(this.cell.row, GroupRow);

            // get selected state for painting cells
            // var selState = g.getSelectedState(r, c);

            // paint text editor as regular cell
            if (g.editRange && col.dataType != DataType.Boolean && g.editRange.contains(row.index, col.index)) {
                selState = SelectedState.None;
            }

            this.selectedState = selState;
        }
    }

}

enum CellStatus {
    Idle      = 1,
    StartEdit = 2,
    Editing   = 4,
    EndEdit   = 8,
}
