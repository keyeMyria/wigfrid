import { ElementRef } from "@angular/core";
import { TabLink } from "../tabs/tab-link";
import { Wizard } from "./wizard";
export declare class WizardStep extends TabLink {
    private wizard;
    private elementRef;
    title: string;
    isCompleted: boolean;
    isSkipped: boolean;
    id: string;
    constructor(wizard: Wizard, elementRef: ElementRef);
    onClick(): boolean;
    ngOnInit(): void;
}
