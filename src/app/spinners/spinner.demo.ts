/*
 * Copyright (c) 2016 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import {Component} from "@angular/core";

@Component({
    moduleId: module.id,
    selector: "clr-spinner-demo",
    // Note the .css extension here, not .scss. That's the best we can have at the moment.
    styleUrls: ["./spinner.demo.css"],
    template: `
        <h2>Spinners</h2>
        <ul>
            <li><a [routerLink]="['./spinner-types']">Types of spinners</a></li>
            <li><a [routerLink]="['./spinner-sizes']">Spinner sizes</a></li>
        </ul>
        <router-outlet></router-outlet>
    `
})
export class SpinnerDemo {
}
