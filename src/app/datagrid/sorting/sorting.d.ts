import { SortOrder } from "../../../clarity-angular";
import { Inventory } from "../inventory/inventory";
import { User } from "../inventory/user";
import { PokemonComparator } from "../utils/pokemon-comparator";
export declare class DatagridSortingDemo {
    private inventory;
    examples: {
        sortingTS: string;
        sortingHTML: string;
    };
    users: User[];
    usersDeprecated: User[];
    sortOrder: SortOrder;
    sorted: boolean;
    pokemonComparator: PokemonComparator;
    constructor(inventory: Inventory);
}
