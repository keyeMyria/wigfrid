import {Component} from "@angular/core";
@Component(
    {
        selector: "scroll-view-demo",
        template: `<h2>Scroll View</h2>
        <ul>
            <li><a [routerLink]="['./basic-scroll']">Basic Scroll</a></li>
            <li><a [routerLink]="['./control-scroll']">Control Scroll component</a></li>
            <li><a [routerLink]="['./offset-culling']">Offset Culling</a></li>
            <li><a [routerLink]="['./scroll-content']">Scroll Content</a></li>
        </ul>
    
        <router-outlet></router-outlet>`
    }
)
export class ScrollViewDemo {

}