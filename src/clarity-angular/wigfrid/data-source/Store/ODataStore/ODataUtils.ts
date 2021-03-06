/**
 * Created by LeBlanc on 16/8/27.
 */
const GUID_REGEX             = /^(\{{0,1}([0-9a-fA-F]){8}-([0-9a-fA-F]){4}-([0-9a-fA-F]){4}-([0-9a-fA-F]){4}-([0-9a-fA-F]){12}\}{0,1})$/;
const VERBOSE_DATE_REGEX     = /^\/Date\((-?\d+)((\+|-)?(\d+)?)\)\/$/;
const ISO8601_DATE_REGEX     = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?(Z|[-+]{1}\d{2}(:?)(\d{2})?)?$/;
const JSON_VERBOSE_MIME_TYPE = "application/json;odata=verbose";

function formatISO8601(date, skipZeroTime, skipTimezone) {
    const ret        = [];
    const pad        = function (n) {
        if (n < 10) {
            return "0".concat(n)
        }
        return String(n)
    };
    const isZeroTime = function () {
        return date.getHours() + date.getMinutes() + date.getSeconds() + date.getMilliseconds() < 1
    };
    ret.push(date.getFullYear());
    ret.push("-");
    ret.push(pad(date.getMonth() + 1));
    ret.push("-");
    ret.push(pad(date.getDate()));
    if (!(skipZeroTime && isZeroTime())) {
        ret.push("T");
        ret.push(pad(date.getHours()));
        ret.push(":");
        ret.push(pad(date.getMinutes()));
        ret.push(":");
        ret.push(pad(date.getSeconds()));
        if (date.getMilliseconds()) {
            ret.push(".");
            ret.push(date.getMilliseconds())
        }
        if (!skipTimezone) {
            ret.push("Z")
        }
    }
    return ret.join("")
}

function parseISO8601(isoString) {
    const result = new Date(60 * new Date(0).getTimezoneOffset() * 1e3),
          chunks = isoString.replace("Z", "").split("T"),
          date   = /(\d{4})-(\d{2})-(\d{2})/.exec(chunks[0]),
          time   = /(\d{2}):(\d{2}):(\d{2})\.?(\d{0,7})?/.exec(chunks[1]);
    result.setFullYear(Number(date[1]));
    result.setMonth(Number(date[2]) - 1);
    result.setDate(Number(date[3]));
    if ($.isArray(time) && time.length) {
        result.setHours(Number(time[1]));
        result.setMinutes(Number(time[2]));
        result.setSeconds(Number(time[3]));
        result.setMilliseconds(Number(String(time[4]).substr(0, 3)) || 0)
    }
    return result
}

function isAbsoluteUrl(url) {
    return /^(?:[a-z]+:)?\/\//i.test(url)
}

function toAbsoluteUrl(basePath, relativePath) {
    let part;
    const baseParts = stripParams(basePath).split("/");
    const relativeParts = relativePath.split("/");

    function stripParams(url) {
        const index = url.indexOf("?");
        if (index > -1) {
            return url.substr(0, index)
        }
        return url
    }

    baseParts.pop();
    while (relativeParts.length) {
        part = relativeParts.shift();
        if (".." === part) {
            baseParts.pop()
        } else {
            baseParts.push(part)
        }
    }
    return baseParts.join("/")
}

const ajaxOptionsForRequest = function (protocolVersion, request, requestOptions) {
    request        = $.extend({
                                  async: true,
                                  method: "get",
                                  url: "",
                                  params: {},
                                  payload: null,
                                  headers: {},
                                  timeout: 3e4
                              }, request
    );
    requestOptions = requestOptions || {};
    const beforeSend  = requestOptions.beforeSend;
    if (beforeSend) {
        beforeSend(request)
    }
    const method      = (request.method || "get").toLowerCase();
    let isGet         = "get" === method;
    const useJsonp    = isGet && requestOptions.jsonp,
          params      = $.extend({}, request.params),
          ajaxData    = isGet ? params : formatPayload(request.payload),
          qs          = !isGet && $.param(params);
    let url           = request.url;
    const contentType = !isGet && JSON_VERBOSE_MIME_TYPE;
    if (qs) {
        url += (url.indexOf("?") > -1 ? "&" : "?") + qs
    }
    if (useJsonp) {
        ajaxData.$format = "json"
    }
    return {
        url: url,
        data: ajaxData,
        dataType: useJsonp ? "jsonp" : "json",
        jsonp: useJsonp && "$callback",
        type: method,
        async: request.async,
        timeout: request.timeout,
        headers: request.headers,
        contentType: contentType,
        accepts: {
            json: [JSON_VERBOSE_MIME_TYPE, "text/plain"].join()
        },
        xhrFields: {
            withCredentials: requestOptions.withCredentials
        }
    };

    function formatPayload(payload) {
        return JSON.stringify(payload, function (key, value) {
                                  if (!(this[key] instanceof Date)) {
                                      return value
                                  }
                                  value = formatISO8601(this[key]);
                                  switch (protocolVersion) {
                                      case 2:
                                          return value.substr(0, value.length - 1);
                                      case 3:
                                      case 4:
                                          return value;
                                      default:
                                          throw errors.Error("E4002")
                                  }
                              }
        )
    }
};
export const sendRequest    = function (protocolVersion, request, requestOptions, deserializeDates) {
    const d       = $.Deferred();
    const options = ajaxOptionsForRequest(protocolVersion, request, requestOptions);
    $.ajax(options).always(function (obj, textStatus) {
                               let extra;
                               const tuplet = interpretJsonFormat(obj, textStatus, deserializeDates),
                                   error    = tuplet.error,
                                   data     = tuplet.data;
                               let nextUrl  = tuplet.nextUrl;
                               if (error) {
                                   d.reject(error)
                               } else {
                                   if (requestOptions.countOnly) {
                                       if (isFinite(tuplet.count)) {
                                           d.resolve(tuplet.count)
                                       } else {
                                           d.reject(new errors.Error("E4018"))
                                       }
                                   } else {
                                       if (nextUrl) {
                                           if (!isAbsoluteUrl(nextUrl)) {
                                               nextUrl = toAbsoluteUrl(options.url, nextUrl)
                                           }
                                           sendRequest(protocolVersion, {
                                                           url: nextUrl
                                                       }, requestOptions, deserializeDates
                                           ).fail(d.reject).done(function (nextData) {
                                                                     d.resolve(data.concat(nextData))
                                                                 }
                                           )
                                       } else {
                                           if (isFinite(tuplet.count)) {
                                               extra = {
                                                   totalCount: tuplet.count
                                               }
                                           }
                                           d.resolve(data, extra)
                                       }
                                   }
                               }
                           }
    );
    return d.promise()
};

const formatDotNetError = function (errorObj) {
    let message, currentError = errorObj;
    if ("message" in errorObj) {
        if (errorObj.message.value) {
            message = errorObj.message.value
        } else {
            message = errorObj.message
        }
    }
    while (currentError = currentError.innererror || currentError.internalexception) {
        message = currentError.message;
        if (currentError.internalexception && -1 === message.indexOf("inner exception")) {
            break
        }
    }
    return message
};

const errorFromResponse = function (obj, textStatus) {
    if ("nocontent" === textStatus) {
        return null
    }
    let httpStatus = 200,
        message    = "Unknown error",
        response   = obj;
    if ("success" !== textStatus) {
        httpStatus = obj.status;
        message    = dataUtils.errorMessageFromXhr(obj, textStatus);
        try {
            response = $.parseJSON(obj.responseText)
        } catch (x) {
        }
    }
    const errorObj = response && (response.error || response["odata.error"] || response["@odata.error"]);
    if (errorObj) {
        message = formatDotNetError(errorObj) || message;
        if (200 === httpStatus) {
            httpStatus = 500
        }
        if (errorObj.code) {
            httpStatus = Number(errorObj.code)
        }
        return $.extend(Error(message), {
                            httpStatus: httpStatus,
                            errorDetails: errorObj
                        }
        )
    } else {
        if (200 !== httpStatus) {
            return $.extend(Error(message), {
                                httpStatus: httpStatus
                            }
            )
        }
    }
};
export const interpretJsonFormat = function (obj, textStatus, deserializeDates) {
    let value;
    const error = errorFromResponse(obj, textStatus);
    if (error) {
        return {
            error: error
        }
    }
    if (!$.isPlainObject(obj)) {
        return {
            data: obj
        }
    }
    if ("d" in obj && (commonUtils.isArray(obj.d) || commonUtils.isObject(obj.d))) {
        value = interpretVerboseJsonFormat(obj, textStatus)
    } else {
        value = interpretLightJsonFormat(obj, textStatus)
    }
    transformTypes(value, deserializeDates);
    return value
};

const interpretVerboseJsonFormat = function (obj) {
    let data = obj.d;
    if (!isDefined(data)) {
        return {
            error: Error("Malformed or unsupported JSON response received")
        }
    }
    data = data;
    if (isDefined(data.results)) {
        data = data.results
    }
    return {
        data: data,
        nextUrl: obj.d.__next,
        count: parseInt(obj.d.__count, 10)
    }
};

const interpretLightJsonFormat = function (obj) {
    let data = obj;
    if (isDefined(data.value)) {
        data = data.value
    }
    return {
        data: data,
        nextUrl: obj["@odata.nextLink"],
        count: parseInt(obj["@odata.count"], 10)
    }
};
export class EdmLiteral {
    private _value;

    constructor(value) {
        this._value = value
    }

    valueOf() {
        return this._value
    }
}

const transformTypes = function (obj, deserializeDates) {
    $.each(obj, function (key, value) {
               if (null !== value && "object" === typeof value) {
                   if ("results" in value) {
                       obj[key] = value.results
                   }
                   transformTypes(obj[key], deserializeDates)
               } else {
                   if ("string" === typeof value) {
                       if (GUID_REGEX.test(value)) {
                           obj[key] = new Guid(value)
                       }
                       if (false !== deserializeDates) {
                           if (value.match(VERBOSE_DATE_REGEX)) {
                               const date = new Date(Number(RegExp.$1) + 60 * RegExp.$2 * 1e3);
                               obj[key]   = new Date(date.valueOf() + 60 * date.getTimezoneOffset() * 1e3)
                           } else {
                               if (ISO8601_DATE_REGEX.test(value)) {
                                   obj[key] = new Date(parseISO8601(obj[key]).valueOf())
                               }
                           }
                       }
                   }
               }
           }
    )
};
const serializeDate = function (date) {
    return "datetime'" + formatISO8601(date, true, true) + "'"
};
const serializeString = function (value) {
    return "'" + value.replace(/'/g, "''") + "'"
};
export const serializePropName = function (propName) {
    if (propName instanceof EdmLiteral) {
        return propName.valueOf()
    }
    return propName.replace(/\./g, "/")
};
const serializeValueV4 = function (value) {
    if (value instanceof Date) {
        return formatISO8601(value, false, false)
    }
    if (value instanceof Guid) {
        return value.valueOf()
    }
    return serializeValueV2(value)
};
const serializeValueV2       = function (value) {
    if (value instanceof Date) {
        return serializeDate(value)
    }
    if (value instanceof Guid) {
        return "guid'" + value + "'"
    }
    if (value instanceof EdmLiteral) {
        return value.valueOf()
    }
    if ("string" === typeof value) {
        return serializeString(value)
    }
    return String(value)
};
export const serializeValue  = function (value, protocolVersion) {
    switch (protocolVersion) {
        case 2:
        case 3:
            return serializeValueV2(value);
        case 4:
            return serializeValueV4(value);
        default:
            throw errors.Error("E4002")
    }
};
export let serializeKey      = function (key, protocolVersion) {
    if ($.isPlainObject(key)) {
        const parts = [];
        $.each(key, function (k, v) {
                   parts.push(serializePropName(k) + "=" + serializeValue(v, protocolVersion))
               }
        );
        return parts.join()
    }
    return serializeValue(key, protocolVersion)
};
export let keyConverters    = {
    String: function (value) {
        return value + ""
    },
    Int32: function (value) {
        return Math.floor(value)
    },
    Int64: function (value) {
        if (value instanceof EdmLiteral) {
            return value
        }
        return new EdmLiteral(value + "L")
    },
    Guid: function (value) {
        if (value instanceof Guid) {
            return value
        }
        return new Guid(value)
    },
    Boolean: function (value) {
        return !!value
    },
    Single: function (value) {
        if (value instanceof EdmLiteral) {
            return value
        }
        return new EdmLiteral(value + "f")
    },
    Decimal: function (value) {
        if (value instanceof EdmLiteral) {
            return value
        }
        return new EdmLiteral(value + "m")
    }
};
