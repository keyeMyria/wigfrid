import {Component} from "@angular/core";
@Component(
    {
        moduleId: module.id,
        selector: "scroll-view-scroll-content-demo",
        templateUrl: "./scroll-view-scroll-content-demo.html",

    }
)
export class ScrollViewScrollContentDemo {
    private _offsetPointPercent;
    private _offsetPoint;

    get offsetPointPercent() {
        return this._offsetPointPercent;
    }

    set offsetPointPercent(value) {
        this._offsetPointPercent = value;
    }

    get offsetPoint() {
        return this._offsetPoint;
    }

    set offsetPoint(value) {
        this._offsetPoint = value;
    }

    scrollHalf() {

    }

}
