
import {Component} from "@angular/core";
@Component({
    selector: "scroll-bar-demo",
    template: `<h2>ScrollBar Demo</h2>
        <ul>
            <li><a [routerLink]="['./static']">Static styles</a></li>
            <li><a [routerLink]="['./angular-basic']">Basic ScrollBar component</a></li>
        <!--<li><a [routerLink]="['./angular-modal-edit']">ScrollBar With Editing in a Modal</a></li>-->
        <!--<li><a [routerLink]="['./angular-lazyload']">ScrollBar With Children Loaded On Demand</a></li>-->
        </ul>
    
        <router-outlet></router-outlet>`
           })
export class ScrollBarDemo {

}
