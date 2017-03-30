import { State } from "../../../clarity-angular/datagrid";
import { Inventory } from "../inventory/inventory";
import { User } from "../inventory/user";
export declare class DatagridServerDrivenDemo {
    private inventory;
    examples: {
        stateInterface: string;
        serverDrivenTS: string;
        serverDrivenHTML: string;
    };
    users: User[];
    total: number;
    loading: boolean;
    constructor(inventory: Inventory);
    refresh(state: State): void;
}
