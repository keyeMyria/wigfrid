import { DatagridRenderOrganizer } from "../render/render-organizer";
export declare class RowActionService {
    private renderOrganizer;
    constructor(renderOrganizer: DatagridRenderOrganizer);
    /**
     * false means no rows with action
     */
    hasActionableRow: boolean;
    private locked;
    private waiting;
    open(fn: () => void): void;
    close(): void;
}
