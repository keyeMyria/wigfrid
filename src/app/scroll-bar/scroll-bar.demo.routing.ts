
import {ModuleWithProviders} from "@angular/core/src/metadata/ng_module";
import {Routes, RouterModule} from "@angular/router";
import {ScrollBarDemo} from "./scroll-bar.demo";
import {ScrollBarStaticDemo} from "./scroll-bar-static";
import {ScrollBarAngularBasicDemo} from "./scroll-bar-angular-basic";

const routes: Routes = [
    {
        path: "",
        component: ScrollBarDemo,
        children: [
            { path: "", redirectTo: "static", pathMatch: "full" },
            { path: "static", component: ScrollBarStaticDemo },
            { path: "angular-basic", component: ScrollBarAngularBasicDemo },
        ]
    }
];

export const ROUTING: ModuleWithProviders = RouterModule.forChild(routes);
