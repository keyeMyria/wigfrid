import { Subject } from "rxjs";
import _ from "lodash";
import { StoreOptions } from "./StoreOptions";
import { compileGetter } from "../Utils/Data";

const normalizeSortingInfo = function (info) {
    if (!_.isArray(info)) {
        info = [info]
    }
    return _.map(info, function (i) {
                     return {
                         selector: _.isFunction(i) || "string" === typeof i ? i : i.getter || i.field || i.selector,
                         desc: !!(i.desc || "d" === String(i.dir).charAt(0).toLowerCase())
                     }
                 }
    )
};
const arrangeSortingInfo   = function (groupInfo, sortInfo) {
    const filteredGroup = [];
    _.forEach(groupInfo, function (group) {
                  const collision = _.filter(sortInfo, function (sort) {
                                                 return group.selector === sort.selector
                                             }
                  );
                  if (collision.length < 1) {
                      filteredGroup.push(group)
                  }
              }
    );
    return filteredGroup.concat(sortInfo)
};
function multiLevelGroup(query, groupInfo) {
    query = query.groupBy(groupInfo[0].selector);
    if (groupInfo.length > 1) {
        query = query.select(function (g) {
            return $.extend({}, g, {
                items: multiLevelGroup(Query(g.items), groupInfo.slice(1)).toArray()
            })
        })
    }
    return query
}
export abstract class Store<T> {
    private _key;
    protected _errorHandler;
    private _useDefaultSearch;
    private _keyGetter;
    protected _storeKeyMap: WeakMap;

    constructor(storeOptions: StoreOptions) {
        let that               = this;
        this._key              = storeOptions.key;
        this._errorHandler     = storeOptions.errorHandler;
        this._useDefaultSearch = true;
        this._storeKeyMap      = new WeakMap;
    }

    /**
     * @deprecated
     * @private
     */
    abstract _customLoadOptions();

    key() {
        return this._key
    }

    keyOf(obj) {
        if (!this._keyGetter) {
            this._keyGetter = compileGetter(this.key())
        }
        const key = this._keyGetter(obj);
        // if (!this._storeKeyMap.get(obj)) {
        //     this._storeKeyMap.set(obj, key);
        // }
        return key;
    }

    _requireKey() {
        if (!this.key()) {
            throw new Error("Store requires a key expression for this operation")
        }
    }

    load(options? = {}) {
        this.loading.next(options);
        return this._loadImpl(options).do((result, extra) => {
            this.loaded.next([result, options]);
        })
    }

    _loadImpl(options) {
        const filter = options.filter;
        let sort   = options.sort;
        const select = options.select;
        let group  = options.group;
        const skip = options.skip,
              take = options.take;
        let q      = this.createQuery();
        if (filter) {
            q = q.filter(filter)
        }
        if (group) {
            group = normalizeSortingInfo(group)
        }
        if (sort || group) {
            sort = normalizeSortingInfo(sort || []);
            if (group) {
                sort = arrangeSortingInfo(group, sort)
            }
            _.forEach(sort, function (rule, index) {
                q = q[index ? "thenBy" : "sortBy"](rule.selector, rule.desc)
            })
        }
        if (select) {
            q = q.select(select)
        }
        if (group) {
            q = multiLevelGroup(q, group)
        }
        if (take || skip) {
            q = q.slice(skip || 0, take)
        }
        return q.enumerate()
    }

    abstract createQuery();

    totalCount(options) {
        return this._totalCountImpl(options)
    }

    _totalCountImpl(options) {
        options    = options || {};
        let q     = this.createQuery(),
            group = options.group;
        const filter = options.filter;
        if (filter) {
            q = q.filter(filter)
        }
        if (group) {
            group = normalizeSortingInfo(group);
            q     = multiLevelGroup(q, group)
        }
        return q.count()
    }

    byKey(key, extraOptions?) {
        // return this._addFailHandlers(this._withLock(this._byKeyImpl(key, extraOptions)))
        return this._addFailHandlers(this._byKeyImpl(key, extraOptions))
    }

    abstract _byKeyImpl(key, options?);

    insert(values) {
        //todo remove me
        // that.fireEvent("modifying");
        this.modifying.next(null);
        // that.fireEvent("inserting", [values]);
        this.inserting.next([values]);
        return this._addFailHandlers(this._insertImpl(values).do(([callbackValues, callbackKey]) => {
            //todo remove me
            // that.fireEvent("inserted", [callbackValues, callbackKey]);
            this.inserted.next([callbackValues, callbackKey]);
            // that.fireEvent("modified")
            this.modified.next(null);
        }))
    }

    abstract _insertImpl(values);

    update(key, values) {
        this.modifying.next(null);
        this.updating.next([key, values]);
        return this._addFailHandlers(this._updateImpl(key, values).do(([callbackKey, callbackValues]) => {
            this.updated.next([callbackKey, callbackValues]);
            this.modified.next(null);
        }))
    }

    abstract _updateImpl(key, values);

    remove(key) {
        this.modifying.next(null);
        // this.fireEvent("removing", [key]);
        this.removing.next([key]);
        return this._addFailHandlers(this._removeImpl(key).do((callbackKey) => {
            this.removed.next([callbackKey]);
            this.modified.next(null);
        }))
    }

    abstract _removeImpl(key);

    _addFailHandlers(observable) {
        return observable.catch(this._errorHandler/*, errorsModule._errorHandler*/)
    }

    loaded    = new Subject();
    loading   = new Subject();
    inserted  = new Subject();
    inserting = new Subject();
    updated   = new Subject();
    updating  = new Subject();
    removed   = new Subject();
    removing  = new Subject();
    modified  = new Subject();
    modifying = new Subject();

    public dispose() {
        this.loaded.unsubscribe();
        this.loading.unsubscribe();
        this.inserted.unsubscribe();
        this.inserting.unsubscribe();
        this.updated.unsubscribe();
        this.updating.unsubscribe();
        this.removed.unsubscribe();
        this.removing.unsubscribe();
        this.modified.unsubscribe();
        this.modifying.unsubscribe();
    }
}
