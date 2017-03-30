/**
 * These helpers are local to Datagrid at the moment, but I wrote them generic enough to move them globally
 * when we have the time. This will be very helpful in future refactors due to Angular upgrades, or simply
 * just to avoid leaks since destroying fixtures is automatic with this.
 */
import { Type } from "@angular/core";
import { ComponentFixture } from "@angular/core/testing";
export declare class TestContext<D, C> {
    fixture: ComponentFixture<C>;
    testComponent: C;
    testElement: any;
    clarityDirective: D;
    clarityElement: any;
    private clarityDebugElement;
    constructor(clarityDirectiveType: Type<D>, componentType: Type<C>);
    getClarityProvider(token: any): any;
    /**
     * Delegate method to avoid verbosity
     */
    detectChanges(): void;
}
export declare function addHelpers(): void;
