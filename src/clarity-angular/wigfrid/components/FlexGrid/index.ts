import {FlexGridDirective} from "./Grid/FlexGridDirective";
import {GridPanelRowHeader} from "./Grid/GridPanel/GridPanelRowHeader";
import {GridPanelCell} from "./Grid/GridPanel/GridPanelCell";
import {GridPanelColumnHeader} from "./Grid/GridPanel/GridPanelColumnHeader";
import {GridPanelTopLeft} from "./Grid/GridPanel/GridPanelTopLeft";
import {FLEXGRID_HANDLE_DIRECTIVES} from "./Grid/Handler/index";
import {ColumnsDefinition} from "./Grid/Definition/ColumnsDefinition";
import {CellTemplate} from "./Grid/Definition/Column/CellTemplate";
import {HeaderTemplate} from "./Grid/Definition/Column/HeaderTemplate";
import {ColumnDefinition} from "./Grid/Definition/ColumnDefinition";
import {CellDirective} from "./Grid/CellDirective";
import {FlexGridIndicator} from "./Grid/flex-grid-indicator";

export const FLEX_GRID_DIRECTIVES = [
    FlexGridDirective,

    GridPanelRowHeader,
    GridPanelCell,
    GridPanelColumnHeader,
    GridPanelTopLeft,

    CellDirective,

    FLEXGRID_HANDLE_DIRECTIVES,
    ColumnsDefinition,
    ColumnDefinition,
    HeaderTemplate,
    CellTemplate,

    FlexGridIndicator

];
