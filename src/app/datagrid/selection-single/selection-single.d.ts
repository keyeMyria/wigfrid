import { Inventory } from "../inventory/inventory";
import { User } from "../inventory/user";
export declare class DatagridSelectionSingleDemo {
    private inventory;
    example: string;
    users: User[];
    singleSelected: User;
    constructor(inventory: Inventory);
}
