import {Column} from "../RowColumn/Column";
import {ContentChild, Inject, forwardRef} from "@angular/core";
import {CellTemplate} from "./Column/CellTemplate";
import {FlexGridComponent} from "../FlexGridComponent";
import {ColumnCollection} from "../RowColumn/ColumnCollection";
import {HeaderTemplate} from "./Column/HeaderTemplate";
export class RowHeaderDefinition extends Column {
    constructor(@Inject(forwardRef(() => FlexGridComponent))
                    grid,) {
        let headerColumns = new ColumnCollection(grid);
        super(headerColumns);
    }

    private _columnHeader;
    @ContentChild(HeaderTemplate)
    public get columnHeader() {
        return this._columnHeader;
    }

    public set columnHeader(value) {
        this._columnHeader = value;
    }

    private _cellTemplate;
    @ContentChild(CellTemplate)
    public get cellTemplate() {
        return this._cellTemplate;
    }

    public set cellTemplate(value) {
        this._cellTemplate = value;
    }
}
