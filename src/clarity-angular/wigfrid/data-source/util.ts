import { CommonStore } from "./Store/CommonStore/CommonStore";
import { Store } from "./Store/Store";
import { DataSourceOptions } from "./DataSourceOptions";
import { CustomStoreOptions } from "./Store/CommonStore/CommonStoreOptions";


export function isPending(deferred) {
    return "pending" === deferred.state()
}

export function normalizeDataSourceOptions(options): CustomStoreOptions|DataSourceOptions {
    let store;

    function createCustomStoreFromLoadFunc() {
        const storeConfig = {};
        $.each(["useDefaultSearch", "key", "load", "byKey", "lookup", "totalCount", "insert", "update", "remove"], function() {
            storeConfig[this] = options[this];
            delete options[this]
        });
        return new CommonStore(storeConfig)
    }

    function createStoreFromConfig(storeConfig) {
        const alias = storeConfig.type;
        delete storeConfig.type;
        return Store.create(alias, storeConfig)
    }

    function createCustomStoreFromUrl(url) {
        return new CommonStore({
            load: function() {
                return $.getJSON(url)
            }
        })
    }
    if ("string" === typeof options) {
        options = {
            paginate: false,
            store: createCustomStoreFromUrl(options)
        }
    }
    if (void 0 === options) {
        options = []
    }
    if ($.isArray(options) || options instanceof Store) {
        options = {
            store: options
        }
    } else {
        options = $.extend({}, options)
    }
    if (void 0 === options.store) {
        options.store = []
    }
    store = options.store;
    if ("load" in options) {
        store = createCustomStoreFromLoadFunc()
    } else {
        if ($.isArray(store)) {
            store = new ArrayStore(store)
        } else {
            if ($.isPlainObject(store)) {
                store = createStoreFromConfig($.extend({}, store))
            }
        }
    }
    options.store = store;
    return options
}

export function normalizeStoreLoadOptionAccessorArguments(originalArguments) {
    switch (originalArguments.length) {
        case 0:
            return;
        case 1:
            return originalArguments[0]
    }
    return $.makeArray(originalArguments)
}

export function generateStoreLoadOptionAccessor(optionName) {
    return function() {
        const args = normalizeStoreLoadOptionAccessorArguments(arguments);
        if (void 0 === args) {
            return this._storeLoadOptions[optionName]
        }
        this._storeLoadOptions[optionName] = args
    }
}

export function mapDataRespectingGrouping(items, mapper, groupInfo) {
    function mapRecursive(items, level) {
        if (!commonUtils.isArray(items)) {
            return items
        }
        return level ? mapGroup(items, level) : $.map(items, mapper)
    }

    function mapGroup(group, level) {
        return $.map(group, function(item) {
            const result = {
                key: item.key,
                items: mapRecursive(item.items, level - 1)
            };
            if ("aggregates" in item) {
                result.aggregates = item.aggregates
            }
            return result
        })
    }
    return mapRecursive(items, groupInfo ? dataUtils.normalizeSortingInfo(groupInfo).length : 0)
}
