import { Comparator } from "../../../clarity-angular/datagrid";
import { User } from "../inventory/user";
export declare class PokemonComparator implements Comparator<User> {
    compare(a: User, b: User): number;
}
