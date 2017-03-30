import { EventEmitter, QueryList, SimpleChange } from "@angular/core";
import { Tabs } from "../tabs/tabs";
import { WizardStep } from "./wizard-step";
import { WizardPage } from "./wizard-page";
import { ScrollingService } from "../main/scrolling-service";
export declare class Wizard extends Tabs {
    private _scrollingService;
    id: string;
    wizardStepChildren: QueryList<WizardStep>;
    wizardPageChildren: QueryList<WizardPage>;
    size: string;
    _open: boolean;
    closable: boolean;
    _openChanged: EventEmitter<boolean>;
    onCancel: EventEmitter<any>;
    isLast: boolean;
    isFirst: boolean;
    currentPage: WizardPage;
    constructor(_scrollingService: ScrollingService);
    ngOnChanges(changes: {
        [propName: string]: SimpleChange;
    }): void;
    ngAfterContentInit(): void;
    readonly tabLinks: WizardStep[];
    readonly tabContents: WizardPage[];
    open(): void;
    close(): void;
    _close(event?: any): void;
    _next(event?: any): void;
    next(): void;
    prev(): void;
    selectTab(wizardNav: WizardStep): void;
    skipTab(tabId: string): void;
    unSkipTab(tabId: string): void;
    _setTabIsSkipped(tabId: string, isSkipped: boolean): void;
}
