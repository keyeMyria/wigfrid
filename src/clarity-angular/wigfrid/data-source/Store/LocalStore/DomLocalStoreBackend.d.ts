import { LocalStoreBackend } from "./LocalStoreBackend";
/**
 * Created by LeBlanc on 16/8/5.
 */
export declare class DomLocalStoreBackend extends LocalStoreBackend {
    private _key;
    constructor(store: any, storeOptions: any);
    _loadImpl(): any;
    _saveImpl(array: any): void;
}
