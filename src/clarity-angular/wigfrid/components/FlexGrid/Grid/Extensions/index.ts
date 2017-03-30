import {FlexGridExtensions} from "./flex-grid-extensions.component";
import {FlexGridIndicator} from "./Extension/Indicator/flex-grid-indicator.component";
import {FlexGridExtensionsService} from "./flex-grid-extensions.service";
import {FlexGridComponent} from "../FlexGridComponent";
import {forwardRef} from "@angular/core";
export * from "./flex-grid-extensions.component";

export * from "./Extension/Indicator/flex-grid-indicator.component";

export const FLEX_GRID_EXTENSIONS_PROVIDERS = [
    FlexGridExtensionsService,
];

export const FLEX_GRID_EXTENSIONS_DIRECTIVES = [
    FlexGridExtensions,
    FlexGridIndicator,
];
