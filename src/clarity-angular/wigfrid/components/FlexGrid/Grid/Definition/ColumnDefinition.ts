import {Column} from "../RowColumn/Column";
import {Directive, forwardRef, ContentChild, Inject} from "@angular/core";
import {CellTemplate} from "./Column/CellTemplate";
import {ColumnsDefinition} from "./ColumnsDefinition";
import {HeaderTemplate} from "./Column/HeaderTemplate";
import {CellEditingTemplate} from "./Column/CellEditingTemplate";
@Directive({
               selector: 'column',
               inputs: [
                   'name',
                   'headerText',
                   'binding'
               ],
           }
)
export class ColumnDefinition extends Column {
    constructor(@Inject(forwardRef(() => ColumnsDefinition))
                    columnCollection: ColumnsDefinition) {
        super(columnCollection);
    }

    _cellTemplate: CellTemplate;
    @ContentChild(forwardRef(() => CellTemplate))
    get cellTemplate(): CellTemplate {
        return this._cellTemplate;
    }

    set cellTemplate(value) {
        this._cellTemplate = value;
    }

    _headerTemplate: HeaderTemplate;
    @ContentChild(forwardRef(() => HeaderTemplate))
    get headerTemplate(): HeaderTemplate {
        return this._headerTemplate;
    }

    set headerTemplate(value: HeaderTemplate) {
        this._headerTemplate = value;
    }

    _cellEditingTemplate: CellEditingTemplate;
    @ContentChild(forwardRef(() => CellEditingTemplate))
    get cellEditingTemplate(): CellEditingTemplate {
        return this._cellEditingTemplate;
    }

    set cellEditingTemplate(value: CellEditingTemplate) {
        this._cellEditingTemplate = value;
    }
}
