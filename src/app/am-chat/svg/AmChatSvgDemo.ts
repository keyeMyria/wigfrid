import {Component, EventEmitter, Input, Output} from "@angular/core";
import {Buffer} from "buffer";

@Component({
    moduleId: module.id,
    selector: "am-chat-svg",
    template: `
     <h4>Am Chat Svgs</h4>
        <ul>
            <li><a [routerLink]="['./draw-svg']">Draw Svg</a></li>
        </ul>
        <router-outlet></router-outlet>
    `
})
export class AmChatSvgDemo {

}
