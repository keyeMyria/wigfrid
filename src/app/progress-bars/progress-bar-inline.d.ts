import { OnInit } from "@angular/core";
export declare class ProgressBarInlineDemo implements OnInit {
    inlineProgress: number;
    inlineProgressTimerId: number;
    inlineStaticProgbarValue: number;
    staticDangerValue: number;
    staticSuccessValue: number;
    staticLabeledProgbarValue: number;
    getNewValue(): number;
    setNewValues(): void;
    stopProgressBar(): void;
    runProgressBar(): void;
    ngOnInit(): void;
}
