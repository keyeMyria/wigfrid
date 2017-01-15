
import {ModuleWithProviders} from "@angular/core/src/metadata/ng_module";
import {Routes, RouterModule} from "@angular/router";
import {ScrollViewDemo} from "./scroll-view.demo";
import {ScrollViewBasicScrollDemo} from "./scroll-view-basic-scroll";
import {ScrollViewControlScrollDemo} from "./scroll-view-control-scroll-demo";
import {ScrollViewOffsetCullingDemo} from "./scroll-view-offset-culling-demo";
import {ScrollViewScrollContentDemo} from "./scroll-view-scroll-content-demo";

const routes: Routes = [
    {
        path: "",
        component: ScrollViewDemo,
        children: [
            { path: "", redirectTo: "basic-scroll", pathMatch: "full" },
            { path: "basic-scroll", component: ScrollViewBasicScrollDemo },
            { path: "control-scroll", component: ScrollViewControlScrollDemo },
            { path: "offset-culling", component: ScrollViewOffsetCullingDemo },
            { path: "scroll-content", component: ScrollViewScrollContentDemo },
            // { path: "angular-lazyload", component: ScrollBarAngularLazyloadDemo }
        ]
    }
];

export const ROUTING: ModuleWithProviders = RouterModule.forChild(routes);
