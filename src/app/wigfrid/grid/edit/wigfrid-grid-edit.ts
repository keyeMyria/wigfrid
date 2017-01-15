
import {Component} from "@angular/core";

@Component(
    {
        moduleId: module.id,
        selector: "wigfrid-grid-demo-edit",
        template: `
        <h4>Edit</h4>
        <ul>
            <li><a [routerLink]="['./edit-handler']">Edit Handler Flex Grid</a></li>
        </ul>
        <router-outlet></router-outlet>
    `
    }
)
export class WigfridGridEditDemo {
}
