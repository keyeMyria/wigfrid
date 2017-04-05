/*
 * Copyright (c) 2016 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ClarityModule} from "../../clarity-angular";
import {ROUTING} from "./am-chat.demo.routing";
import {AmChatDemo} from "./am-chat.demo";
import {AmChatPageDemo} from "./page/am-chat-page";
import {AmChatModule} from "../../clarity-angular";
import {FormsModule} from "@angular/forms";
import {AmChatSvgDemo} from "./svg/AmChatSvgDemo";
import {AmChatDrawSvgDemo} from "./svg/AmChatDrawSvgDemo";
import {AmChatToolDemo} from "./tool/am-chat-tool.demo";
import {AmChatToolJceDemo} from "./tool/am-chat-tool-jce.demo";
import {AmChatWebsocketDemo} from "./websocket/am-chat-websocket.demo";
import {AmChatWebsocketTestToolDemo} from "./websocket/am-chat-websocket-test-tool.demo";
import {AmChatPackLoginDemo} from "./websocket/am-chat-pack-login.demo";


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ClarityModule,
        AmChatModule,
        ROUTING
    ],
    declarations: [
        AmChatDemo,
        AmChatPageDemo,
        AmChatWebsocketDemo,
        AmChatWebsocketTestToolDemo,
        AmChatPackLoginDemo,
        // AmChatSvgDemo,
        // AmChatDrawSvgDemo,
        AmChatToolDemo,
        AmChatToolJceDemo
    ],
    exports: [
        AmChatDemo,
        AmChatPageDemo,
        AmChatWebsocketDemo,
        AmChatWebsocketTestToolDemo,
        AmChatPackLoginDemo,
        // AmChatSvgDemo,
        // AmChatDrawSvgDemo,
        AmChatToolDemo,
        AmChatToolJceDemo
    ]
})
export default class AmChatDemoModule {
}
