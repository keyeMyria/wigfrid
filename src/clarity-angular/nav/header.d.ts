import { OnDestroy, OnInit } from "@angular/core";
import { ClrResponsiveNavigationService } from "./clrResponsiveNavigationService";
import { ClrResponsiveNavCodes } from "./clrResponsiveNavCodes";
export declare class Header implements OnDestroy, OnInit {
    private responsiveNavService;
    private _subscription;
    isNavLevel1OnPage: boolean;
    isNavLevel2OnPage: boolean;
    constructor(responsiveNavService: ClrResponsiveNavigationService);
    ngOnInit(): void;
    readonly responsiveNavCodes: ClrResponsiveNavCodes;
    resetNavTriggers(): void;
    initializeNavTriggers(navList: number[]): void;
    closeOpenNav(): void;
    toggleNav(navLevel: number): void;
    ngOnDestroy(): void;
}
