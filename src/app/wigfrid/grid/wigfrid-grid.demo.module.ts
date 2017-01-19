import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ROUTING} from "./wigfrid-grid.demo.routing";
import {WigfridGridDemo} from "./wigfrid-grid.demo";
import {SimpleWigfridGridDemo} from "./simple/simple-wigfrid-grid.demo";
import {Advance01WigFridGridDemo} from "./advance/advance-01-wigfrid-grid.demo";
import {FormsModule} from "@angular/forms";
import {ClarityModule} from "../../../clarity-angular/clarity.module";
import {MouseHandlerWigfridGridDemo} from "./simple/mouse-handler-wigfrid-grid.demo";
import {DragHandlerWigfridGridDemo} from "./simple/drag-handler-wigfrid-grid.demo";
import {WigfridGridSimpleDemo} from "./simple/wigfrid-grid-simple";
import {WigfridGridAdvanceDemo} from "./advance/wigfrid-grid-advance";
import {IndicatorWigfridGridDemo} from "./simple/indicator-wigfrid-grid.demo";
import {IndicatorHandlerTools} from "./simple/indicator/indicator-handler-tools";
import {EditHandlerWigfridGridDemo} from "./edit/edit-handler-wigfrid-grid.demo";
import {WigfridGridEditDemo} from "./edit/wigfrid-grid-edit";
import {Advance02WigFridGridDemo} from "./advance/advance-02-wigfrid-grid.demo";
import {AutoResizeWigfridGridDemo} from "./advance/auto-resize-wigfrid-grid.demo";

@NgModule(
    {
        imports: [
            CommonModule,
            FormsModule,
            ClarityModule,
            ROUTING
        ],
        declarations: [
            WigfridGridDemo,
            //sub route
            WigfridGridSimpleDemo,
            WigfridGridAdvanceDemo,
            WigfridGridEditDemo,
            //simple
            SimpleWigfridGridDemo,
            MouseHandlerWigfridGridDemo,
            DragHandlerWigfridGridDemo,
            IndicatorWigfridGridDemo,
            IndicatorHandlerTools,
            //advance
            Advance01WigFridGridDemo,
            Advance02WigFridGridDemo,
            AutoResizeWigfridGridDemo,
            //edit
            EditHandlerWigfridGridDemo,
        ],
        exports: [
            WigfridGridDemo,
            //sub route
            WigfridGridSimpleDemo,
            WigfridGridAdvanceDemo,
            WigfridGridEditDemo,
            //simple
            SimpleWigfridGridDemo,
            MouseHandlerWigfridGridDemo,
            DragHandlerWigfridGridDemo,
            IndicatorWigfridGridDemo,
            IndicatorHandlerTools,
            //advance
            Advance01WigFridGridDemo,
            Advance02WigFridGridDemo,
            AutoResizeWigfridGridDemo,
            //edit
            EditHandlerWigfridGridDemo,
        ]
    }
)
export default class WigfridGridDemoModule {
}
