import { GridPanel } from "../GridPanel";
export declare class GridPanelColumnHeader extends GridPanel {
    elementRef: any;
    constructor(grid: any, elementRef: any);
    protected _rows: any;
    protected _cols: any;
    scrollPosition: any;
    readonly draggable: boolean;
}
