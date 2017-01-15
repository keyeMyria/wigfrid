import {FlexGridDirective} from "../FlexGridDirective";
import {FlexGridIndicator} from "../flex-grid-indicator";
import {Rectangle} from "../../../../core/index";
import {Injectable} from "@angular/core";
@Injectable()
export class IndicatorService {
    private _indicatorHTML: string;
    private _indicatorRectangle: Rectangle;

    grid: FlexGridDirective;

    indicator: FlexGridIndicator;


    get indicatorHtml(): string {
        return this._indicatorHTML;
    }

    set indicatorHtml(value: string) {
        this._indicatorHTML = value;
    }

    get indicatorRectangle(): Rectangle {
        return this._indicatorRectangle;
    }

    set indicatorRectangle(value) {
        console.log(value);
        this._indicatorRectangle = value;
    }

    constructor() {
        console.count('indicator service instantiate count')
    }
}
