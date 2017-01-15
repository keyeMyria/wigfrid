/**
 * Use for iterator filter
 */
import * as _ from "lodash"
import { compileGetter, toComparable } from "../Utils/Data";
const normalizeBinaryCriterion = function (crit) {
    return [crit[0], crit.length < 3 ? "=" : String(crit[1]).toLowerCase(), crit.length < 2 ? true : crit[crit.length - 1]]
};
const disjunctiveOperator      = /^(or|\|\||\|)$/i;
const conjunctiveOperator      = /^(and|\&\&|\&)$/i;

export class CompileCriteria {

    public compile(crit) {
        if (_.isFunction(crit)) {
            return crit
        }
        if (_.isArray(crit[0])) {
            return this._compileGroup(crit)
        }
        let criteria = normalizeBinaryCriterion(crit);
        return this._compileBinary(criteria[0], criteria[1], criteria[2]);
    }

    private _compileBinary(getter, op, value) {
        var getter = compileGetter(getter);
        value      = toComparable(value);
        switch (op.toLowerCase()) {
            case "=":
            case "eq":
                return this._compileEquals(getter, value);
            case "<>":
            case "neq":
                return this._compileEquals(getter, value, true);
            case ">":
            case "gt":
                return (obj) => {
                    return toComparable(getter(obj)) > value
                };
            case "<":
            case "lt":
                return (obj) => {
                    return toComparable(getter(obj)) < value
                };
            case ">=":
            case "ge":
                return (obj) => {
                    return toComparable(getter(obj)) >= value
                };
            case "<=":
            case "le":
                return (obj) => {
                    return toComparable(getter(obj)) <= value
                };
            case "startswith":
                return (obj) => {
                    return 0 === toComparable(this.toString(getter(obj))).indexOf(value)
                };
            case "endswith":
                return (obj) => {
                    const getterValue = toComparable(this.toString(getter(obj))),
                          searchValue = this.toString(value);
                    if (getterValue.length < searchValue.length) {
                        return false
                    }
                    return getterValue.lastIndexOf(value) === getterValue.length - value.length
                };
            case "contains":
                return (obj) => {
                    return toComparable(this.toString(getter(obj))).indexOf(value) > -1
                };
            case "notcontains":
                return (obj) => {
                    return -1 === toComparable(this.toString(getter(obj))).indexOf(value)
                }
        }
        throw new Error(`Unknown filter operation is used: ${op}`)
    }

    private _compileEquals(getter, value, negate?) {
        return (obj) => {
            obj        = toComparable(getter(obj));
            let result = this._useStrictComparison(value) ? obj === value : obj == value;
            if (negate) {
                result = !result
            }
            return result
        }
    }

    private _useStrictComparison(value) {
        return "" === value || 0 === value || false === value
    }

    private _compileGroup(crit) {
        let groupOperator, nextGroupOperator;
        const idx = 0,
            bag = [],
            ops = [];
        //compile sub criteria
        _.forEach(crit, (criteria) => {
            if (_.isArray(criteria) || _.isFunction(criteria)) {
                if (bag.length > 1 && groupOperator !== nextGroupOperator) {
                    throw new Error("Mixing of group operators inside a single group of filter expression is not allowed")
                }
                ops.push(this.compile(criteria));
                bag.push("op[" + idx + "](d)");
                idx++;
                groupOperator     = nextGroupOperator;
                nextGroupOperator = "&&"
            } else {
                nextGroupOperator = conjunctiveOperator.test(criteria) ? "&&" : "||"
            }
        });
        return new Function("op", "return function(d) { return " + bag.join(" " + groupOperator + " ") + " }")(ops)
    }

    toString(value) {
        return !_.isUndefined(value) ? value.toString() : ""
    }
}
