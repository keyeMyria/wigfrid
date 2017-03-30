import { Inventory } from "../inventory/inventory";
import { User } from "../inventory/user";
export declare class DatagridSelectionDemo {
    private inventory;
    example: string;
    users: User[];
    _selected: User[];
    toAdd: User[];
    toDelete: User[];
    toEdit: User;
    selected: User[];
    cleanUp(): void;
    constructor(inventory: Inventory);
    onDelete(user: User): void;
    onEdit(user: User): void;
    onAdd(): void;
}
