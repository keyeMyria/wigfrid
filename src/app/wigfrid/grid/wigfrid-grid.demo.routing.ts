import {ModuleWithProviders} from "@angular/core/src/metadata/ng_module";
import {Routes, RouterModule} from "@angular/router";
import {WigfridGridDemo} from "./wigfrid-grid.demo";
import {SimpleWigfridGridDemo} from "./simple/simple-wigfrid-grid.demo";
import {MouseHandlerWigfridGridDemo} from "./simple/mouse-handler-wigfrid-grid.demo";
import {DragHandlerWigfridGridDemo} from "./simple/drag-handler-wigfrid-grid.demo";
import {WigfridGridSimpleDemo} from "./simple/wigfrid-grid-simple";
import {WigfridGridAdvanceDemo} from "./advance/wigfrid-grid-advance";
import {Advance01WigFridGridDemo} from "./advance/advance-01-wigfrid-grid.demo";
import {Advance02WigFridGridDemo} from "./advance/advance-02-wigfrid-grid.demo";
import {IndicatorWigfridGridDemo} from "./simple/indicator-wigfrid-grid.demo";
import {WigfridGridEditDemo} from "./edit/wigfrid-grid-edit";
import {EditHandlerWigfridGridDemo} from "./edit/edit-handler-wigfrid-grid.demo";
import {AutoResizeWigfridGridDemo} from "./advance/auto-resize-wigfrid-grid.demo";

const ROUTES: Routes = [
    {
        path: "",
        component: WigfridGridDemo,
        children: [
            {path: "", redirectTo: "simple", pathMatch: "full"},
            {
                path: "simple",
                component: WigfridGridSimpleDemo,
                children: [
                    {path: "", redirectTo: "simple", pathMatch: "full"},
                    {path: "simple", component: SimpleWigfridGridDemo},
                    {path: "mouse-handler", component: MouseHandlerWigfridGridDemo},
                    {path: "drag-handler", component: DragHandlerWigfridGridDemo},
                    {path: "drag-indicator", component: IndicatorWigfridGridDemo},
                ]
            },
            {
                path: "advance",
                component: WigfridGridAdvanceDemo,
                children: [
                    {path: "", redirectTo: "advance-01", pathMatch: "full"},
                    {path: "advance-01", component: Advance01WigFridGridDemo},
                    {path: "advance-02", component: Advance02WigFridGridDemo},
                    {path: "auto-resize", component: AutoResizeWigfridGridDemo},
                ]
            },
            {
                path: "edit",
                component: WigfridGridEditDemo,
                children: [
                    {path: "", redirectTo: "edit-handler", pathMatch: "full"},
                    {path: "edit-handler", component: EditHandlerWigfridGridDemo}
                ]
            }
        ]
    }
];

export const ROUTING: ModuleWithProviders = RouterModule.forChild(ROUTES);
