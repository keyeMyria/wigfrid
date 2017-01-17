import {Column} from "../RowColumn/Column";
import {Directive, forwardRef, ContentChild, Inject} from "@angular/core";
import {CellTemplate} from "./Column/CellTemplate";
import {ColumnsDefinition} from "./ColumnsDefinition";
import {HeaderTemplate} from "./Column/HeaderTemplate";
import {CellEditingTemplate} from "./Column/CellEditingTemplate";
@Directive({
               selector: 'column',
           }
)
export class ColumnDefinition extends Column {
    constructor(@Inject(forwardRef(() => ColumnsDefinition))
                    columnCollection: ColumnsDefinition) {
        super(columnCollection);
    }

    _cellTemplate: CellTemplate;
    get cellTemplate(): CellTemplate {
        return this._cellTemplate;
    }

    @ContentChild(forwardRef(() => CellTemplate))
    set cellTemplate(value) {
        this._cellTemplate = value;
    }

    _headerTemplate: HeaderTemplate;
    get headerTemplate(): HeaderTemplate {
        return this._headerTemplate;
    }

    @ContentChild(forwardRef(() => HeaderTemplate))
    set headerTemplate(value: HeaderTemplate) {
        this._headerTemplate = value;
    }

    _cellEditingTemplate: CellEditingTemplate;
    get cellEditingTemplate(): CellEditingTemplate {
        return this._cellEditingTemplate;
    }

    @ContentChild(forwardRef(() => CellEditingTemplate))
    set cellEditingTemplate(value: CellEditingTemplate) {
        this._cellEditingTemplate = value;
    }
}
