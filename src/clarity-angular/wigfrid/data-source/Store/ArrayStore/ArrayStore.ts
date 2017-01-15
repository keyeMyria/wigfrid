import { Store } from "../Store";
import * as _ from "lodash";
import { Observable } from "rxjs";
import { deepExtendArraySafe } from "../../Utils/Object";
import { ArrayQuery } from "../../Query/ArrayQuery/ArrayQuery";
import { toComparable } from "../../Utils/Data";


const keysEqual = function (keyExpr, key1, key2) {
    if (_.isArray(keyExpr)) {
        let name;
        const names = _.map(key1, function (v, k) {
                                return k
                            }
        );
        for (let i = 0; i < names.length; i++) {
            name = names[i];
            if (toComparable(key1[name], true) != toComparable(key2[name], true)) {
                return false
            }
        }
        return true
    }
    return toComparable(key1, true) == toComparable(key2, true)
};
const hasKey    = function (target, keyOrKeys) {
    let key;
    const keys = _.toArray(keyOrKeys);
    while (keys.length) {
        key = keys.shift();
        if (key in target) {
            return true
        }
    }
    return false
};
export class ArrayStore extends Store {
    private _array;

    constructor(options?) {
        if (_.isArray(options)) {
            options = {
                data: options
            }
        } else {
            options = options || {}
        }
        super(options);
        const initialArray = options.data;
        if (initialArray && !_.isArray(initialArray)) {
            throw new Error("ArrayStore 'data' option must be an array")
        }
        this._array = initialArray || []
    }

    createQuery() {
        return new ArrayQuery(this._array, {
            errorHandler: this._errorHandler
        })
    }

    _customLoadOptions() {
    }

    _byKeyImpl(key) {
        return new Observable(observer => {
            const index = this._indexByKey(key);
            if (-1 === index) {
                observer.next(new Error("Data item cannot be found"))
            } else {
                observer.next(this._array[index]);
                observer.complete();
            }
        })
    }

    _insertImpl(values) {
        return new Observable(observer => {
            let keyValue, obj;
            const keyExpr = this.key();
            if (_.isPlainObject(values)) {
                obj = _.assign({}, values)
            } else {
                obj = values
            }
            if (keyExpr) {
                keyValue = this.keyOf(obj);
                if (void 0 === keyValue || "object" === typeof keyValue && _.isEmpty(keyValue)) {
                    if (_.isArray(keyExpr)) {
                        throw new Error("Compound keys cannot be auto-generated")
                    }
                    //noinspection TypeScriptUnresolvedVariable
                    keyValue = obj[keyExpr] = String(uuid.v4())
                } else {
                    if (void 0 !== this._array[this._indexByKey(keyValue)]) {
                        return Observable.throw(new Error("Attempt to insert an item with the a duplicated key"));
                        // return rejectedPromise(new Error("Attempt to insert an item with the a duplicated key"))
                    }
                }
            } else {
                keyValue = obj
            }
            this._array.push(obj);
            observer.next([values, keyValue]);
            observer.complete();
        });
        // return Observable.of([values, keyValue]);
        // return trivialPromise(values, keyValue)
    }

    _updateImpl(key, values) {
        return new Observable(observer => {

            let index, target;
            const keyExpr = this.key();
            if (keyExpr) {
                if (hasKey(values, keyExpr) && !keysEqual(keyExpr, key, this.keyOf(values))) {
                    return Observable.throw(new Error('Keys cannot be modified'));
                    // return rejectedPromise(new Error("Keys cannot be modified"))
                }
                index = this._indexByKey(key);
                if (index < 0) {
                    return Observable.throw(new Error('Data item cannot be found'));
                    // return rejectedPromise(new Error("Data item cannot be found"))
                }
                target = this._array[index];
                if (!_.isObjectLike(target)) {
                    this._array[index] = values;
                }
            } else {
                target = key
            }
            // deepExtendArraySafe(target, values);
            _.merge(target, values);
            observer.next([key, values]);
            observer.complete();
            // return Observable.of([key, values]);
        });
        // return trivialPromise(key, values)
    }

    _removeImpl(key) {
        return new Observable(observer => {
            const index = this._indexByKey(key);
            if (index > -1) {
                this._array.splice(index, 1)
            }
            observer.next(key);
            observer.complete();
            // return Observable.of(key);
            // return trivialPromise(key)
        })
    }

    _indexByKey(key) {
        let i             = 0;
        const arrayLength = this._array.length;
        for (; i < arrayLength; i++) {
            if (keysEqual(this.key(), this.keyOf(this._array[i]), key)) {
                return i
            }
        }
        return -1
    }

    clear() {
        return new Observable(observer => {
            // this.fireEvent("modifying");
            this.modifying.next(null);
            this._array = [];
            // this.fireEvent("modified")
            this.modified.next(null);
            observer.complete();
        })
    }
}
