import { Inventory } from "../inventory/inventory";
import { User } from "../inventory/user";
import { PokemonFilter } from "../utils/pokemon-filter";
export declare class DatagridStringFilteringDemo {
    private inventory;
    examples: {
        stringFilterInterface: string;
        stringFilterInput: string;
        stringFilterTS: string;
        stringFilterHTML: string;
        stringPreFilterTS: string;
        stringPreFilterHTML: string;
    };
    users: User[];
    pokemonFilter: PokemonFilter;
    myFilterValue1: string;
    myFilterValue2: string;
    displayFilter: boolean;
    constructor(inventory: Inventory);
    filterToggle(): void;
}
