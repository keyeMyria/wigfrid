import { serializePropName } from "../../../Store/ODataStore/ODataUtils";
import * as _ from "lodash";

export class ODataV4Generator {
    _expand;
    _select;

    format(hash) {
        const formatCore = function (hash) {
            let ret      = "";
            const select = [],
                expand   = [];
            _.forEach(hash, function (value, key) {
                          if (_.isArray(value)) {
                              [].push.apply(select, value)
                          }
                          if (_.isPlainObject(value)) {
                              expand.push(key + formatCore(value))
                          }
                      }
            );
            if (select.length || expand.length) {
                ret += "(";
                if (select.length) {
                    ret += "$select=" + _.map(select, serializePropName).join()
                }
                if (expand.length) {
                    if (select.length) {
                        ret += ";"
                    }
                    ret += "$expand=" + _.map(expand, serializePropName).join()
                }
                ret += ")"
            }
            return ret
        };
        const ret        = [];
        _.forEach(hash, function (value, key) {
            ret.push(key + formatCore(value))
        });
        return ret.join()
    }

    parseTree(exprs, root, stepper) {
        const parseCore = function (exprParts, root, stepper) {
            const result = stepper(root, exprParts.shift(), exprParts);
            if (false === result) {
                return
            }
            parseCore(exprParts, result, stepper)
        };
        _.forEach(exprs, function (x, _) {
            parseCore(x.split("."), root, stepper)
        })
    }

    constructor({expand, select}: {expand?: any, select?: any}) {
        this._expand = expand;
        this._select = select;
    }

    generate() {
        let hash = {};
        if (this._expand || this._select) {
            if (this._expand) {
                this.parseTree(_.toArray(this._expand), hash, function (node, key, path) {
                    node[key] = node[key] || {};
                    if (!path.length) {
                        return false
                    }
                    return node[key]
                })
            }
            if (this._select) {
                this.parseTree(_.filter(_.toArray(this._select), this.hasDot), hash, function (node, key, path) {
                    if (!path.length) {
                        node[key] = node[key] || [];
                        node[key].push(key);
                        return false
                    }
                    return node[key] = node[key] || {}
                })
            }
            return this.format(hash)
        }
    }

    hasDot(x) {
        return /\./.test(x)
    };
}
