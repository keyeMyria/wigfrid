/*
 * Copyright (c) 2016 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import {Component} from "@angular/core";

@Component({
               moduleId: module.id,
               selector: "wigfrid-grid-demo-advance",
               template: `
        <h4>Simple</h4>
        <ul>
            <li><a [routerLink]="['./advance-01']">Advance 01</a></li>
            <li><a [routerLink]="['./advance-02']">Advance 02</a></li>
            <li><a [routerLink]="['./auto-resize']">auto resize grid</a></li>
        </ul>
        <router-outlet></router-outlet>
    `
           })
export class WigfridGridAdvanceDemo {
}
