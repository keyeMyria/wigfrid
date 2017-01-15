import { Store } from "../Store";
import { sendRequest, serializeKey, serializeValue } from "./ODataUtils";
import * as _ from "lodash";
import { RemoteQuery } from "../../Query/RemoteQuery/RemoteQuery";

const DEFAULT_PROTOCOL_VERSION = 2;
/**
 * ODataStore
 */
class ODataStore extends Store {

    private _beforeSend;
    private _errorHandler;
    private _jsonp;
    private _version;
    private _withCredentials;
    private _deserializeDates;

    private _keyType;

    private _updateMethod;

    private _url;

    constructor(options) {
        super(options);

        this._url              = String(options.url).replace(/\/+$/, "");
        this._beforeSend       = options.beforeSend;
        this._jsonp            = options.jsonp;
        this._version          = options.version || DEFAULT_PROTOCOL_VERSION;
        this._withCredentials  = options.withCredentials;
        this._deserializeDates = options.deserializeDates;

        this._keyType = options.keyType;
        if (2 === this.version()) {
            this._updateMethod = "MERGE"
        } else {
            this._updateMethod = "PATCH"
        }
    }

    // _customLoadOptions() {
    //     return ["expand", "customQueryParams"]
    // }

    _byKeyImpl(key, extraOptions) {
        const params = {};
        if (extraOptions) {
            if (extraOptions.expand) {
                params.$expand = $.map($.makeArray(extraOptions.expand), odataUtils.serializePropName).join()
            }
        }
        return this._sendRequest(this._byKeyUrl(key), "GET", params)
    }

    createQuery(loadOptions) {
        let url, queryOptions;
        loadOptions  = loadOptions || {};
        queryOptions = {
            adapter:           "odata",
            beforeSend:        this._beforeSend,
            errorHandler:      this._errorHandler,
            jsonp:             this._jsonp,
            version:           this._version,
            withCredentials:   this._withCredentials,
            deserializeDates:  this._deserializeDates,
            expand:            loadOptions.expand,
            requireTotalCount: loadOptions.requireTotalCount
        };
        if (!_.isUndefined(loadOptions.urlOverride)) {
            url = loadOptions.urlOverride
        } else {
            url = this._url
        }
        if ("customQueryParams" in loadOptions) {
            const params = this.escapeServiceOperationParams(loadOptions.customQueryParams, this.version());
            if (4 === this.version()) {
                url = this.formatFunctionInvocationUrl(url, params)
            } else {
                queryOptions.params = params
            }
        }
        return new RemoteQuery(url, queryOptions)
    }

    _insertImpl(values) {
        this._requireKey();
        return this._sendRequest(this._url, "POST", null, values).map(serverResponse => [values, serverResponse]);
        // var that = this,
        //     d    = $.Deferred();
        // $.when(this._sendRequest(this._url, "POST", null, values)).done(function (serverResponse) {
        //     d.resolve(values, that.keyOf(serverResponse))
        // }).fail(d.reject);
        // return d.promise()
    }

    _updateImpl(key, values) {
        return this._sendRequest(this._byKeyUrl(key), this._updateMethod, null, values).map(_ => [key, values]);
        // var d = $.Deferred();
        // $.when(this._sendRequest(this._byKeyUrl(key), this._updateMethod, null, values)).done(function () {
        //     d.resolve(key, values)
        // }).fail(d.reject);
        // return d.promise()
    }

    _removeImpl(key) {
        return this._sendRequest(this._byKeyUrl(key), "DELETE").map(_ => key);
        // var d = $.Deferred();
        // $.when(this._sendRequest(this._byKeyUrl(key), "DELETE")).done(function () {
        //     d.resolve(key)
        // }).fail(d.reject);
        // return d.promise()
    }

    _byKeyUrl(key, useOriginalHost) {
        let keyObj    = key;
        const keyType = this._keyType,
            baseUrl   = useOriginalHost ? proxyUrlFormatter.formatLocalUrl(this._url) : this._url;
        if ($.isPlainObject(keyType)) {
            keyObj = {};
            $.each(keyType, function (subKeyName, subKeyType) {
                keyObj[subKeyName] = convertSimpleKey(subKeyType, key[subKeyName])
            })
        } else {
            if (keyType) {
                keyObj = convertSimpleKey(keyType, key)
            }
        }
        return baseUrl + "(" + encodeURIComponent(serializeKey(keyObj, this._version)) + ")"
    }

    _sendRequest(url, method, params, payload) {
        return sendRequest(this.version(), {
            url:     url,
            method:  method,
            params:  params || {},
            payload: payload
        }, {
            beforeSend:      this._beforeSend,
            jsonp:           this._jsonp,
            withCredentials: this._withCredentials
        }, this._deserializeDates)
    }

    version() {
        return this._version
    }

    private escapeServiceOperationParams(params, version) {
        if (!params) {
            return params
        }
        const result = {};
        $.each(params, function(k, v) {
            result[k] = serializeValue(v, version)
        });
        return result
    }

    private formatFunctionInvocationUrl (baseUrl, args) {
        return stringUtils.format("{0}({1})", baseUrl, $.map(args || {}, function(value, key) {
            return stringUtils.format("{0}={1}", key, value)
        }).join(","))
    };
}
