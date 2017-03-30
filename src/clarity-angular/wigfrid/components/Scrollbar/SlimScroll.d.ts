import { ViewContainerRef } from '@angular/core';
export declare class SlimScroll {
    private el;
    private wrapper;
    private bar;
    private viewContainer;
    private background;
    private opacity;
    private width;
    private position;
    private borderRadius;
    private dom;
    private mutationThrottleTimeout;
    private mutationObserver;
    constructor(viewContainer: ViewContainerRef);
    private setElementStyle();
    private onMutation();
    private wrapContainer();
    private initBar();
    private getBarHeight();
    private attachWheel(target);
    private onWheel;
    private scrollContent(y, isWheel, isJump);
    private makeBarDraggable;
    private barDraggableListener;
    private destroy();
    private unwrap(wrapper);
    private init();
}
