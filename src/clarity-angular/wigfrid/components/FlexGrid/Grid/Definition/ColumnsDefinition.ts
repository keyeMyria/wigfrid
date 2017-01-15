import {Directive, forwardRef, Inject, ContentChildren, QueryList} from "@angular/core";
import {ColumnCollection} from "../RowColumn/ColumnCollection";
import {FlexGridDirective} from "../FlexGridDirective";
import {Column} from "../RowColumn/Column";
import {ColumnDefinition} from "./ColumnDefinition";
@Directive(
    {
        selector: 'columns',
        inputs: ['defaultSize']
    }
)
export class ColumnsDefinition extends ColumnCollection {
    constructor(@Inject(forwardRef(() => FlexGridDirective))
                    grid: FlexGridDirective) {
        super(grid);
    }

    @ContentChildren(forwardRef(() => ColumnDefinition))
    public set columns(value: QueryList<Column>) {
        this.clear();
        if (value.length > 0) {
            value.forEach(item => {
                              this.push(item);
                          }
            )
        }
    }
}
