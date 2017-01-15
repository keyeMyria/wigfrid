/*
 * Copyright (c) 2016 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import {Component} from "@angular/core";

@Component({
               moduleId: module.id,
               selector: "wigfrid-grid-demo-simple",
               template: `
        <h4>Simple</h4>
        <ul>
            <li><a [routerLink]="['./mouse-handler']">Mouse Handler Flex Grid</a></li>
            <li><a [routerLink]="['./drag-handler']">Drag Handler Flex Grid</a></li>
            <li><a [routerLink]="['./drag-indicator']">Drag Indicator Flex Grid</a></li>
        </ul>
        <router-outlet></router-outlet>
    `
           }
)
export class WigfridGridSimpleDemo {
}
