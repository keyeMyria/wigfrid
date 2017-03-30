import { Inventory } from "../inventory/inventory";
import { User } from "../inventory/user";
export declare class DatagridFilteringDemo {
    private inventory;
    examples: {
        filterInterface: string;
        inlineFilterTS: string;
        inlineFilterHTML: string;
        customFilterComponentTS: string;
        customFilterComponentHTML: string;
        templateVariableTS: string;
        templateVariableHTML: string;
        colorFilterTS: string;
        colorFilterHTML: string;
    };
    users: User[];
    constructor(inventory: Inventory);
}
