import {ModuleWithProviders} from "@angular/core/src/metadata/ng_module";
import {Routes, RouterModule} from "@angular/router";
import {AmChatDemo} from "./am-chat.demo";
import {AmChatPageDemo} from "./page/am-chat-page";
import {AmChatWebsocketDemo} from "./websocket/AmChatWebsocketDemo";
import {AmChatWebsocketTestToolDemo} from "./websocket/AmChatWebsocketTestToolDemo";
import {AmChatSvgDemo} from "./svg/AmChatSvgDemo";
import {AmChatDrawSvgDemo} from "./svg/AmChatDrawSvgDemo";
import {AmChatToolDemo} from "./tool/am-chat-tool.demo";
import {AmChatToolJceDemo} from "./tool/am-chat-tool-jce.demo";


const ROUTES: Routes = [
    {
        path: "",
        component: AmChatDemo,
        children: [
            {path: "", redirectTo: "am-chat-page", pathMatch: "full"},
            {path: "am-chat-page", component: AmChatPageDemo},
        ]
    },
    {
        path: "am-chat-websocket",
        component: AmChatWebsocketDemo,
        children: [
            {path: "", redirectTo: "test-tool", pathMatch: "full"},
            {path: "test-tool", component: AmChatWebsocketTestToolDemo},
        ]
    },
    // {
    //     path: "am-chat-svg",
    //     component: AmChatSvgDemo,
    //     children: [
    //         {path: "", redirectTo: "draw-svg", pathMatch: "full"},
    //         {path: "draw-svg", component: AmChatDrawSvgDemo},
    //     ]
    // },
    {
        path: "am-chat-tool",
        component: AmChatToolDemo,
        children: [
            {path: "", redirectTo: "jce", pathMatch: "full"},
            {path: "jce", component: AmChatToolJceDemo}
        ]

    }
];

export const ROUTING: ModuleWithProviders = RouterModule.forChild(ROUTES);