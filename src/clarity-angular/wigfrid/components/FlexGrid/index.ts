import {FlexGridComponent} from "./Grid/FlexGridComponent";
import {GridPanelRowHeader} from "./Grid/GridPanel/GridPanelRowHeader";
import {GridPanelCell} from "./Grid/GridPanel/GridPanelCell";
import {GridPanelColumnHeader} from "./Grid/GridPanel/GridPanelColumnHeader";
import {GridPanelTopLeft} from "./Grid/GridPanel/GridPanelTopLeft";
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
