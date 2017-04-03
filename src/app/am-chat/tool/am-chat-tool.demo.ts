import {Component} from "@angular/core";

@Component({
    selector: 'am-chat-tool',
    template: `
        <h4>Am Chat Websocket</h4>
        <ul>
            <li><a [routerLink]="['./jce']">Jce</a></li>
        </ul>
        <router-outlet></router-outlet>
    `
})
export class AmChatToolDemo {


}
