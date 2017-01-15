import { ArrayStore } from "./ArrayStore";
import { LocalStoreBackend } from "./LocalStoreBackend";

export class LocalStore extends ArrayStore {

    private _backend;

    constructor(options) {
        if ("string" === typeof options) {
            options = {
                name: options
            }
        } else {
            options = options || {}
        }
        super(options);
        this._backend = new LocalStoreBackend[options.backend || "dom"](this, options);
        this._backend.load()
    }

    clear() {
        super.clear();
        this._backend.notifyChanged()
    }

    _insertImpl(values) {
        const b = this._backend;
        return super._insertImpl(values).done($.proxy(b.notifyChanged, b))
    }

    _updateImpl(key, values) {
        const b = this._backend;
        return super._updateImpl(key, values).done($.proxy(b.notifyChanged, b))
    }

    _removeImpl(key) {
        const b = this._backend;
        return super._removeImpl(key).done($.proxy(b.notifyChanged, b))
    }
}
