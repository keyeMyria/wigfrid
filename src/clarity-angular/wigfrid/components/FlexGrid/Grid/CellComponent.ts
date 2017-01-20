import {
    ViewChild,
    Input,
    Injector,
    ElementRef,
    ComponentRef,
    HostBinding,
    ViewContainerRef,
    Directive, Component
} from "@angular/core";
import {Cell} from "./Cell";
import {SelectedState} from "./enum/SelectedState";
import {DataType, tryCast} from "../../../core/index";
import {GroupRow} from "./RowColumn/GroupRow";
import {FlexGridComponent} from "./FlexGridComponent";
import {CellType} from "./enum/CellType";
@Component({
               selector: 'ar-flex-grid-cell',
               template: `
                    <div 
                    [ngClass]         = "computeClassObject()"
                    [style.left.px]   = "cell.gridPanel.grid._rtl ? null : cell.column.pos"
                    [style.right.px]  = "cell.gridPanel.grid._rtl ? cell.column.pos : null"
                    [style.top.px]    = "cell.row.pos"
                    [style.height.px] = "cell.height"
                    [style.width.px]  = "cell.width"
                    [style.textAlign] = "cell.column.getAlignment()"
                    >
                        <ng-content></ng-content>
                    </div>
                `,
               host: {
                   '[draggable]': "cell.gridPanel.draggable"
               }
           }
)
export class CellComponent {

    private _cell;
    private _mask;
    private _renderComponentRef: ComponentRef<any>;

    private cellStatus: CellStatus;
    private grid;

    /**
     * dynamicComponentLoader to load component
     * @returns {ComponentRef}
     */
    private get renderComponentRef(): ComponentRef<any> {
        return this._renderComponentRef;
    }

    private set renderComponentRef(value: ComponentRef<any>) {
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

    // @HostBinding('class')
    public get computeClass() {
        let cl = [];
        cl.push('ar-cell');
        if (this.cell.cellType == CellType.Cell) {
            let gr = tryCast(this.cell.row, GroupRow);

            switch (this.selectedState) {
                case SelectedState.Cursor:
                    cl.push('ar-state-selected');
                    break;
                case SelectedState.Selected:
                    cl.push('ar-state-multi-selected');
                    break;
                case SelectedState.None:
                    if (gr) {
                        cl.push('ar-group');
                    } else if (this.cell.row.index % 2 != 0) {
                        cl.push('ar-alt');
                    }
                    break;
            }
        } else {
            cl.push('ar-header')
        }
        return cl.join(' ');
    }

    public computeClassObject() {
        let computeClass        = {};
        computeClass['ar-cell'] = true;
        if (this.cell.cellType == CellType.Cell) {
            let gr = tryCast(this.cell.row, GroupRow);
            if (this.selectedState == SelectedState.Cursor) {
                computeClass['ar-state-selected'] = true;
            } else if (this.selectedState == SelectedState.Selected) {
                computeClass['ar-state-multi-selected'] = true;
            } else if (this.selectedState == SelectedState.None) {
                if (gr) {
                    computeClass['ar-group'] = true;
                } else if (this.cell.row.index % 2 != 0) {
                    computeClass['ar-alt'] = true;
                }
            }
        } else {
            computeClass['ar-header'] = true;
        }
        return computeClass;
    }

    @Input()
    public get mask() {
        return this._mask;
    }

    /**
     * column mask
     * @param value
     */
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
        this.grid = this.injector.get(FlexGridComponent);
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
