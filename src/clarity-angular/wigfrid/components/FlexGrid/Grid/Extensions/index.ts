import {FlexGridExtensions} from "./flex-grid-extensions.component";
import {FlexGridIndicatorExtension} from "./Extension/Indicator/flex-grid-indicator.extension";
import {FlexGridExtensionsService} from "./flex-grid-extensions.service";
import {FlexGridComponent} from "../FlexGridComponent";
import {forwardRef} from "@angular/core";
export * from "./flex-grid-extensions.component";

export * from "./Extension/Indicator/flex-grid-indicator.extension";

export const FLEX_GRID_EXTENSIONS_PROVIDERS = [
    FlexGridExtensionsService,
];

export const FLEX_GRID_EXTENSIONS_DIRECTIVES = [
    FlexGridExtensions,
    FlexGridIndicatorExtension,
];
