import { StoreOptions } from "../StoreOptions";
/**
 * Created by LeBlanc on 16/8/5.
 */

export abstract class LocalStoreBackend {

    private _store;
    private _dirty;

    private _immediate;

    constructor(store, storeOptions: StoreOptions) {
        this._store   = store;
        this._dirty   = false;
        let immediate = this._immediate = storeOptions.immediate;
        const flushInterval = Math.max(100, storeOptions.flushInterval || 1e4);
        if (!immediate) {
            const saveProxy = $.proxy(this.save, this);
            setInterval(saveProxy, flushInterval);
            $(window).on("beforeunload", saveProxy);
            if (window.cordova) {
                document.addEventListener("pause", saveProxy, false)
            }
        }
    }

    notifyChanged() {
        this._dirty = true;
        if (this._immediate) {
            this.save()
        }
    }

    load() {
        this._store._array = this._loadImpl();
        this._dirty        = false
    }

    save() {
        if (!this._dirty) {
            return
        }
        this._saveImpl(this._store._array);
        this._dirty = false
    }

    abstract _loadImpl();
    abstract _saveImpl(data);
}
