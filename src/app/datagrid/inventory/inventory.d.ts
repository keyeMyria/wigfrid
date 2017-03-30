import { User } from "./user";
export declare class Inventory {
    size: number;
    latency: number;
    private _all;
    private _currentQuery;
    readonly all: User[];
    reset(): void;
    private _checkCurrentQuery();
    filter(filters: {
        [key: string]: string[];
    }): Inventory;
    sort(sort: {
        by: string;
        reverse: boolean;
    }): Inventory;
    fetch(skip?: number, limit?: number): Promise<FetchResult>;
    private _fakeHttp<T>(result);
}
export interface FetchResult {
    users: User[];
    length: number;
}
