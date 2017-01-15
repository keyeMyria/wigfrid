/**
 * Created by LeBlanc on 16/8/5.
 */
const normalizeBinaryCriterion = function (crit) {
    return [crit[0], crit.length < 3 ? "=" : String(crit[1]).toLowerCase(), crit.length < 2 ? true : crit[crit.length - 1]]
};
const normalizeSortingInfo = function (info) {
    if (!$.isArray(info)) {
        info = [info]
    }
    return $.map(info, function (i) {
                     return {
                         selector: $.isFunction(i) || "string" === typeof i ? i : i.getter || i.field || i.selector,
                         desc: !!(i.desc || "d" === String(i.dir).charAt(0).toLowerCase())
                     }
                 }
    )
};
const errorMessageFromXhr = function () {
    const textStatusMessages = {
        timeout: "Network connection timeout",
        error: "Unspecified network error",
        parsererror: "Unexpected server response"
    };
    const textStatusDetails  = {
        timeout: "possible causes: the remote host is not accessible, overloaded or is not included into the domain white-list when being run in the native container",
        error: "if the remote host is located on another domain, make sure it properly supports cross-origin resource sharing (CORS), or use the JSONP approach instead",
        parsererror: "the remote host did not respond with valid JSON data"
    };
    const explainTextStatus  = function (textStatus) {
        let result = textStatusMessages[textStatus];
        if (!result) {
            return textStatus
        }
        result += " (" + textStatusDetails[textStatus] + ")";
        return result
    };
    return function (xhr, textStatus) {
        if (xhr.status < 400) {
            return explainTextStatus(textStatus)
        }
        return xhr.statusText
    }
}();
const aggregators              = {
    count: {
        seed: 0,
        step: function (count) {
            return 1 + count
        }
    },
    sum: {
        seed: 0,
        step: function (sum, item) {
            return sum + item
        }
    },
    min: {
        step: function (min, item) {
            return item < min ? item : min
        }
    },
    max: {
        step: function (max, item) {
            return item > max ? item : max
        }
    },
    avg: {
        seed: [0, 0],
        step: function (pair, value) {
            return [pair[0] + value, pair[1] + 1]
        },
        finalize: function (pair) {
            return pair[1] ? pair[0] / pair[1] : NaN
        }
    }
};
const processRequestResultLock = function () {
    let lockDeferred;
    const lockCount = 0;
    const obtain    = function () {
        if (0 === lockCount) {
            lockDeferred = $.Deferred()
        }
        lockCount++
    };
    const release   = function () {
        lockCount--;
        if (lockCount < 1) {
            lockDeferred.resolve()
        }
    };
    const promise   = function () {
        const deferred = 0 === lockCount ? $.Deferred().resolve() : lockDeferred;
        return deferred.promise()
    };
    const reset     = function () {
        lockCount = 0;
        if (lockDeferred) {
            lockDeferred.resolve()
        }
    };
    return {
        obtain: obtain,
        release: release,
        promise: promise,
        reset: reset
    }
}();

function isDisjunctiveOperator(condition) {
    return /^(or|\|\||\|)$/i.test(condition)
}

function isConjunctiveOperator(condition) {
    return /^(and|\&\&|\&)$/i.test(condition)
}
const keysEqual              = function (keyExpr, key1, key2) {
    if ($.isArray(keyExpr)) {
        let name;
        const names = $.map(key1, function (v, k) {
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
const BASE64_CHARS           = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
const base64_encode          = function (input) {
    if (!$.isArray(input)) {
        input = stringToByteArray(String(input))
    }
    let result = "";

    function getBase64Char(index) {
        return BASE64_CHARS.charAt(index)
    }

    for (let i = 0; i < input.length; i += 3) {
        const octet1 = input[i],
              octet2 = input[i + 1],
              octet3 = input[i + 2];
        result += $.map([octet1 >> 2, (3 & octet1) << 4 | octet2 >> 4, isNaN(octet2) ? 64 : (15 & octet2) << 2 | octet3 >> 6, isNaN(octet3) ? 64 : 63 & octet3], getBase64Char).join("")
    }
    return result
};
const stringToByteArray = function (str) {
    let code, i;
    const bytes = [];
    for (i = 0; i < str.length; i++) {
        code = str.charCodeAt(i);
        if (code < 128) {
            bytes.push(code)
        } else {
            if (code < 2048) {
                bytes.push(192 + (code >> 6), 128 + (63 & code))
            } else {
                if (code < 65536) {
                    bytes.push(224 + (code >> 12), 128 + (code >> 6 & 63), 128 + (63 & code))
                } else {
                    if (code < 2097152) {
                        bytes.push(240 + (code >> 18), 128 + (code >> 12 & 63), 128 + (code >> 6 & 63), 128 + (63 & code))
                    }
                }
            }
        }
    }
    return bytes
};
export let utils        = {
    normalizeBinaryCriterion: normalizeBinaryCriterion,
    normalizeSortingInfo: normalizeSortingInfo,
    errorMessageFromXhr: errorMessageFromXhr,
    aggregators: aggregators,
    keysEqual: keysEqual,
    isDisjunctiveOperator: isDisjunctiveOperator,
    isConjunctiveOperator: isConjunctiveOperator,
    processRequestResultLock: processRequestResultLock,
    base64_encode: base64_encode
};
