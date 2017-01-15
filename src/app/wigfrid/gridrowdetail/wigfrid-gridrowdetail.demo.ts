import {Component} from "@angular/core";

@Component(
    {
        selector: "wigfrid-grid-demo",
        template: `
<h2>Wigfrid Grid Demo</h2>

<ul>
    <li><a [routerLink]="['./simple']">Simple Flex Grid</a></li>
    <li><a [routerLink]="['./advance']">Advance Flex Grid</a></li>
    <li><a [routerLink]="['./edit']">Edit Handler Flex Grid</a></li>
</ul>

<router-outlet></router-outlet>
`
    }
)
export class WigfridGridDemo {

}
