import {Column} from "../RowColumn/Column";
import {ContentChild, Inject, forwardRef} from "@angular/core";
import {CellTemplate} from "./Column/CellTemplate";
import {FlexGridDirective} from "../FlexGridDirective";
import {ColumnCollection} from "../RowColumn/ColumnCollection";
import {HeaderTemplate} from "./Column/HeaderTemplate";
export class RowHeaderDefinition extends Column {
    constructor(@Inject(forwardRef(() => FlexGridDirective))
                    grid,) {
        let headerColumns = new ColumnCollection(grid);
        super(headerColumns);
    }

    private _columnHeader;
    public get columnHeader() {
        return this._columnHeader;
    }

    @ContentChild(HeaderTemplate)
    public set columnHeader(value) {
        this._columnHeader = value;
    }

    private _cellTemplate;
    public get cellTemplate() {
        return this._cellTemplate;
    }

    @ContentChild(CellTemplate)
    public set cellTemplate(value) {
        this._cellTemplate = value;
    }
}
