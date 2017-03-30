import { GridPanel } from "../GridPanel";
export declare class GridPanelCell extends GridPanel {
    elementRef: any;
    constructor(grid: any, elementRef: any);
    protected _rows: any;
    protected _cols: any;
    /**
     * we need to know where we have scrolled, to calculate the range of present cell
     */
    scrollPosition: any;
}
