import { EventEmitter } from "@angular/core";
import { Filter } from "../../../clarity-angular/datagrid";
import { User } from "../inventory/user";
export declare class ColorFilter implements Filter<User> {
    allColors: string[];
    selectedColors: {
        [color: string]: boolean;
    };
    nbColors: number;
    changes: EventEmitter<any>;
    listSelected(): string[];
    toggleColor(color: string): void;
    accepts(user: User): boolean;
    isActive(): boolean;
}
