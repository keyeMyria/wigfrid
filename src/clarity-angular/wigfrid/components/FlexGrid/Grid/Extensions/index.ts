import {FlexGridExtensions} from "./flex-grid-extensions.component";
import {FlexGridIndicator} from "./Extension/Indicator/flex-grid-indicator.component";
import {FlexGridAutoResize} from "./Extension/AutoResize/flex-grid-auto-resize.component";
import {FlexGridAutoResizeBindingCell} from "./Extension/AutoResize/flex-grid-auto-resize-binding-cell";
import {GridPanelContainer} from "./Extension/AutoResize/grid-panel-container";
import {FlexGridExtensionsService} from "./flex-grid-extensions.service";
import {FlexGridComponent} from "../FlexGridComponent";
import {forwardRef} from "@angular/core";
export * from "./flex-grid-extensions.component";

export * from "./Extension/Indicator/flex-grid-indicator.component";

export * from "./Extension/AutoResize/flex-grid-auto-resize-binding-cell";

/**
 * we need to confirm one gird have only one grid panel container
 * @type {Map<any, any>}
 */
let gridPanelMap: WeakMap<FlexGridComponent, GridPanelContainer> = new WeakMap();

export const FLEX_GRID_EXTENSIONS_PROVIDERS = [
    FlexGridExtensionsService,
    {
        provide: GridPanelContainer,
        useFactory: (grid: FlexGridComponent) => {
            let exist = gridPanelMap.get(grid);
            if (!exist) {
                exist = new GridPanelContainer();
                gridPanelMap.set(grid, exist);
            }
            return exist;

        },
        deps: [forwardRef(() => FlexGridComponent)]
    }
];

export const FLEX_GRID_EXTENSIONS_DIRECTIVES = [
    FlexGridExtensions,
    FlexGridIndicator,
    FlexGridAutoResize,
    FlexGridAutoResizeBindingCell
];
