import { StringFilter } from "../../../clarity-angular/datagrid";
import { User } from "../inventory/user";
export declare class PokemonFilter implements StringFilter<User> {
    accepts(user: User, search: string): boolean;
}
