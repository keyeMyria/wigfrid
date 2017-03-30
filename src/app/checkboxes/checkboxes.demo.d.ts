import { Status } from "./data/status";
import { Server } from "./data/server";
export declare class CheckboxesDemo {
    private status;
    list: Server[];
    indeterminateState: boolean;
    nativeIndeterminateState: boolean;
    termsAgreement: boolean;
    constructor(status: Status);
    onToggleIndeterminateState(): void;
}
