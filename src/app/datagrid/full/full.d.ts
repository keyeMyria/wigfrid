import { State } from "../../../clarity-angular/datagrid";
import { Inventory } from "../inventory/inventory";
import { User } from "../inventory/user";
import { PokemonComparator } from "../utils/pokemon-comparator";
import { PokemonFilter } from "../utils/pokemon-filter";
export declare class DatagridFullDemo {
    private inventory;
    options: {
        totalUsers: number;
        pageSize: string;
        selectable: boolean;
        loremIpsum: boolean;
        server: boolean;
        latency: string;
    };
    resetting: boolean;
    currentPageSize: number;
    users: User[];
    selected: User[];
    loremIpsumColumn: boolean;
    isServerDriven: boolean;
    loading: boolean;
    total: number;
    nameFilter: string;
    pokemonComparator: PokemonComparator;
    pokemonFilter: PokemonFilter;
    constructor(inventory: Inventory);
    reset(): void;
    refresh(state: State): void;
}
