import {Component, ViewChild} from "@angular/core";
import {ScrollView} from "../../clarity-angular/scroll-view/scroll-view";
@Component(
    {
        moduleId: module.id,
        selector: "scroll-view-control-scroll-demo",
        templateUrl: "./scroll-view-control-scroll-demo.html"
    }
)
export class ScrollViewControlScrollDemo {

    @ViewChild(ScrollView)
    scrollView;


    get offsetPoint () {
        return this.scrollView.contentPresenter.offsetPoint;
    }

    get offsetPercent() {
        return this.scrollView.contentPresenter.offsetPercent;
    }
}
