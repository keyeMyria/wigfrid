/*
 * Copyright (c) 2016 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import {Component} from "@angular/core";

@Component({
    moduleId: module.id,
    selector: "clr-modal-angular-show-demo",
    // Note the .css extension here, not .scss. That's the best we can have at the moment.
    styleUrls: ["./modal.demo.css"],
    templateUrl: "./modal-angular-show.demo.html"
})
export class ModalAngularShowDemo {
    // Booleans to open each example modal
    public basic: boolean = false;
}
