import { Store } from "../Store";
/**
* Created by LeBlanc on 16/8/4.
*/
const TOTAL_COUNT = "totalCount",
      LOAD        = "load",
      BY_KEY      = "byKey",
      INSERT      = "insert",
      UPDATE      = "update",
      REMOVE      = "remove";

function isPromise(obj) {
    return obj && $.isFunction(obj.then)
}

function trivialPromise(value) {
    return $.Deferred().resolve(value).promise()
}

function ensureRequiredFuncOption(name, obj) {
    if (!$.isFunction(obj)) {
        throw new Error(`Custom Store method is not implemented or is not a function: ${name}`)
    }
}

function throwInvalidUserFuncResult(name) {
    throw new Error(`Custom Store method returns an invalid value: ${name}`)
}

function createUserFuncFailureHandler(pendingDeferred) {
    function errorMessageFromXhr(promiseArguments) {
        let xhr          = promiseArguments[0];
        const textStatus = promiseArguments[1];
        if (!xhr || !xhr.getResponseHeader) {
            return null
        }
        return dataUtils.errorMessageFromXhr(xhr, textStatus)
    }
    return function(arg) {
        let error;
        if (arg instanceof Error) {
            error = arg
        } else {
            error = new Error(errorMessageFromXhr(arguments) || arg && String(arg) || "Unknown error")
        }
        pendingDeferred.reject(error)
    }
}

export class CommonStore extends Store {

    private _useDefaultSearch;
    private _loadFunc;
    private _totalCountFunc;
    private _byKeyFunc;
    private _insertFunc;
    private _updateFunc;
    private _removeFunc;


    constructor(options) {
        options = options || {};
        super(options);
        this._useDefaultSearch = !!options.useDefaultSearch;
        this._loadFunc         = options[LOAD];
        this._totalCountFunc   = options[TOTAL_COUNT];
        this._byKeyFunc        = options[BY_KEY];
        this._insertFunc       = options[INSERT];
        this._updateFunc       = options[UPDATE];
        this._removeFunc       = options[REMOVE]
    }

    createQuery() {
        throw new Error("CustomStore does not support creating queries")
    }

    _totalCountImpl(options) {
        let userResult;
        const userFunc = this._totalCountFunc,
            d = $.Deferred();
        ensureRequiredFuncOption(TOTAL_COUNT, userFunc);
        userResult = userFunc.apply(this, [options]);
        if (!isPromise(userResult)) {
            userResult = Number(userResult);
            if (!isFinite(userResult)) {
                throwInvalidUserFuncResult(TOTAL_COUNT)
            }
            userResult = trivialPromise(userResult)
        }
        userResult.then(function (count) {
            d.resolve(Number(count))
        }, createUserFuncFailureHandler(d));
        return this._addFailHandlers(d.promise())
    }

    _loadImpl(options) {
        let userResult;
        const userFunc = this._loadFunc,
            d = $.Deferred();
        ensureRequiredFuncOption(LOAD, userFunc);
        userResult = userFunc.apply(this, [options]);
        if ($.isArray(userResult)) {
            userResult = trivialPromise(userResult)
        } else {
            if (null === userResult || void 0 === userResult) {
                userResult = trivialPromise([])
            } else {
                if (!isPromise(userResult)) {
                    throwInvalidUserFuncResult(LOAD)
                }
            }
        }
        userResult.then(function (data, extra) {
            d.resolve(data, extra)
        }, createUserFuncFailureHandler(d));
        return this._addFailHandlers(d.promise())
    }

    _byKeyImpl(key, extraOptions) {
        let userResult;
        const userFunc = this._byKeyFunc,
            d = $.Deferred();
        ensureRequiredFuncOption(BY_KEY, userFunc);
        userResult = userFunc.apply(this, [key, extraOptions]);
        if (!isPromise(userResult)) {
            userResult = trivialPromise(userResult)
        }
        userResult.then(function (obj) {
            d.resolve(obj)
        }, createUserFuncFailureHandler(d));
        return d.promise()
    }

    _insertImpl(values) {
        let userResult;
        const userFunc = this._insertFunc,
            d = $.Deferred();
        ensureRequiredFuncOption(INSERT, userFunc);
        userResult = userFunc.apply(this, [values]);
        if (!isPromise(userResult)) {
            userResult = trivialPromise(userResult)
        }
        userResult.then(function (newKey) {
            d.resolve(values, newKey)
        }, createUserFuncFailureHandler(d));
        return d.promise()
    }

    _updateImpl(key, values) {
        let userResult;
        const userFunc = this._updateFunc,
            d = $.Deferred();
        ensureRequiredFuncOption(UPDATE, userFunc);
        userResult = userFunc.apply(this, [key, values]);
        if (!isPromise(userResult)) {
            userResult = trivialPromise()
        }
        userResult.then(function () {
            d.resolve(key, values)
        }, createUserFuncFailureHandler(d));
        return d.promise()
    }

    _removeImpl(key) {
        let userResult;
        const userFunc = this._removeFunc,
            d = $.Deferred();
        ensureRequiredFuncOption(REMOVE, userFunc);
        userResult = userFunc.apply(this, [key]);
        if (!isPromise(userResult)) {
            userResult = trivialPromise()
        }
        userResult.then(function () {
            d.resolve(key)
        }, createUserFuncFailureHandler(d));
        return d.promise()
    }
}
