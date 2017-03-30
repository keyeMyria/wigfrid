import { OnInit } from "@angular/core";
export declare class ProgressBarStaticDemo implements OnInit {
    staticProgbarValue: number;
    staticDangerValue: number;
    staticSuccessValue: number;
    staticLabeledProgbarValue: number;
    getNewValue(): number;
    setNewValues(): void;
    setInitialValues(): void;
    ngOnInit(): void;
}
