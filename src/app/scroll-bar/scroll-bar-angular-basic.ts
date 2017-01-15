import {Component} from "@angular/core";
@Component(
    {
        moduleId: module.id,
        selector: "scroll-bar-angular-basic-demo",
        templateUrl: "./scroll-bar-angular-basic.html",
        styleUrls: ["./scroll-bar.demo.css"]
    }
)
export class ScrollBarAngularBasicDemo {

    //***********horizontal***********
    public horizontalViewportSize = 600;

    public horizontalMinimum = 0;

    public horizontalMaximum = 9400;

    public horizontalVisibility = true;

    //************vertical************
    public verticalViewportSize = 100;

    public verticalMinimum = 0;

    public verticalMaximum = 1000;

    public verticalVisibility = true;

}
