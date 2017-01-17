import {FlexGridComponent} from "./Grid/FlexGridComponent";
import {GridPanelRowHeader, GridPanelCell, GridPanelColumnHeader, GridPanelTopLeft} from "./Grid/GridPanel/index";
import {FLEXGRID_HANDLE_DIRECTIVES} from "./Grid/Handler/index";
import {ColumnsDefinition} from "./Grid/Definition/ColumnsDefinition";
import {CellTemplate} from "./Grid/Definition/Column/CellTemplate";
import {HeaderTemplate} from "./Grid/Definition/Column/HeaderTemplate";
import {ColumnDefinition} from "./Grid/Definition/ColumnDefinition";
import {CellComponent} from "./Grid/CellComponent";
import {FlexGridIndicator} from "./Grid/Extensions/Extension/Indicator/flex-grid-indicator.component";
import {FlexGridExtensions} from "./Grid/Extensions/flex-grid-extensions.component";

export const FLEX_GRID_DIRECTIVES = [
    FlexGridComponent,

    GridPanelRowHeader,
    GridPanelCell,
    GridPanelColumnHeader,
    GridPanelTopLeft,

    CellComponent,

    FLEXGRID_HANDLE_DIRECTIVES,
    ColumnsDefinition,
    ColumnDefinition,
    HeaderTemplate,
    CellTemplate,

    //extensions
    FlexGridExtensions,
    FlexGridIndicator

];
