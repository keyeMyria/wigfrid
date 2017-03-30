import { Pokemon } from "./pokemon";
export interface User {
    id: number;
    name: string;
    creation: Date;
    color: string;
    pokemon: Pokemon;
    [key: string]: any;
}
