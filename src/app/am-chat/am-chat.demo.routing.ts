/*
 * Copyright (c) 2016 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import {ModuleWithProviders} from "@angular/core/src/metadata/ng_module";
import {Routes, RouterModule} from "@angular/router";
import {AmChatDemo} from "./am-chat.demo";
import {RealAmChatDemo} from "./real-am-chat";

const ROUTES: Routes = [
    {
        path: "",
        component: AmChatDemo,
        children: [
            { path: "", redirectTo: "real-am-chat", pathMatch: "full" },
            { path: "real-am-chat", component: RealAmChatDemo },
        ]
    }
];

export const ROUTING: ModuleWithProviders = RouterModule.forChild(ROUTES);
