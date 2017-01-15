import { LocalStoreBackend } from "./LocalStoreBackend";
/**
 * Created by LeBlanc on 16/8/5.
 */

export class DomLocalStoreBackend extends LocalStoreBackend {

    private _key;

    constructor(store, storeOptions) {
        super(store, storeOptions);
        let name = storeOptions.name;
        if (!name) {
            throw new Error("Local Store requires the 'name' configuration option is specified")
        }
        this._key = "wigfrid-data-prefix-local-" + name
    }

    _loadImpl() {
        const raw = localStorage.getItem(this._key);
        if (raw) {
            return JSON.parse(raw)
        }
        return []
    }

    _saveImpl(array) {
        if (!array.length) {
            localStorage.removeItem(this._key)
        } else {
            localStorage.setItem(this._key, JSON.stringify(array))
        }
    }
}
