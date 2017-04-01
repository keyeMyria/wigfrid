import {Component} from "@angular/core";

@Component({
    moduleId: module.id,
    selector: "am-chat-demo",
    styleUrls: ["./am-chat.demo.css"],
    template: `
        <h2>Amchat</h2>

        <ul>
            <li><a [routerLink]="['./am-chat-page']">Demo Page</a></li>
            <li><a [routerLink]="['./am-chat-websocket']">Websocket</a></li>
            <li><a [routerLink]="['./am-chat-svg']">Svg</a></li>
        </ul>

        <router-outlet></router-outlet>
    `
})
export class AmChatDemo {
}
