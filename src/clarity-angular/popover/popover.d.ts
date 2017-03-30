export declare enum Direction {
    RIGHT = 0,
}
export interface PopoverOptions {
    offsetX?: number;
    offsetY?: number;
    userAnchorParent?: boolean;
}
export declare class Popover {
    private element;
    constructor(element: any);
    anchor(anchor: any, direction: Direction, {offsetX, offsetY, userAnchorParent}?: PopoverOptions): void;
    destroy(): void;
    private isPositioned(container);
    private originalOverflows;
    private preventScrolling(e);
    private resumeScrolling();
    private getInlineOverflow(container);
    private setInlineOverflow(container, overflow);
    private scrolls(container);
}
