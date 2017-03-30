import { FormGroup } from "@angular/forms";
export declare class ReactiveFormsDemo {
    examples: {
        reactiveTS: string;
        reactiveHTML: string;
    };
    employeeAddressForm: FormGroup;
    submitted: boolean;
    onSubmit(): void;
    addNewEmployeeAddress(): void;
}
