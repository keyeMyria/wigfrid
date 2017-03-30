import { Employee } from "../model/employee.model";
export declare class TemplateDrivenFormsDemo {
    examples: {
        templateHTML: string;
    };
    id: number;
    employeeType: string[];
    model: Employee;
    submitted: boolean;
    onSubmit(): void;
    addNewEmployee(): void;
}
