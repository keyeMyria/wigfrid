

import {Component} from "@angular/core";

@Component({
    moduleId: module.id,
    selector: "am-chat-websocket",
    template: `
        <h4>Am Chat Websocket</h4>
        <ul>
            <li><a [routerLink]="['./test-tool']">Test Tool</a></li>
        </ul>
        <router-outlet></router-outlet>
    `
})
export class AmChatWebsocketDemo {
    constructor() {

    }
}
