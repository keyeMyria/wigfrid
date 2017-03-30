import { Wizard } from "../../clarity-angular/wizard/wizard";
export declare class WizardAsyncValidation {
    wizard: Wizard;
    formData: any;
    loadingFlag: boolean;
    errorFlag: boolean;
    onCommit(): void;
    code: string;
    html: string;
}
