import { StoreOptions } from "../StoreOptions";
/**
 * Created by LeBlanc on 16/8/5.
 */
export declare abstract class LocalStoreBackend {
    private _store;
    private _dirty;
    private _immediate;
    constructor(store: any, storeOptions: StoreOptions);
    notifyChanged(): void;
    load(): void;
    save(): void;
    abstract _loadImpl(): any;
    abstract _saveImpl(data: any): any;
}
