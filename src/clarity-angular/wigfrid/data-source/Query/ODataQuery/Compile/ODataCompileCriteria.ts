/**
 * Created by LeBlanc on 16/8/21.
 */
import * as _ from "lodash";

export class ODataCompileCriteria {

    createBinaryOperationFormatter(op) {
        return function (prop, val) {
            return prop + " " + op + " " + val
        }
    };

    createStringFuncFormatter(op, reverse?) {
        return function (prop, val) {
            const bag = [op, "("];
            if (reverse) {
                bag.push(val, ",", prop)
            } else {
                bag.push(prop, ",", val)
            }
            bag.push(")");
            return bag.join("")
        }
    };

    formatters   = {
        "=":        this.createBinaryOperationFormatter("eq"),
        "<>":       this.createBinaryOperationFormatter("ne"),
        ">":        this.createBinaryOperationFormatter("gt"),
        ">=":       this.createBinaryOperationFormatter("ge"),
        "<":        this.createBinaryOperationFormatter("lt"),
        "<=":       this.createBinaryOperationFormatter("le"),
        startswith: this.createStringFuncFormatter("startswith"),
        endswith:   this.createStringFuncFormatter("endswith")
    };
    formattersV2 = _.extend({}, this.formatters, {
        contains:    this.createStringFuncFormatter("substringof", true),
        notcontains: this.createStringFuncFormatter("not substringof", true)
    });
    formattersV4 = _.extend({}, this.formatters, {
        contains:    this.createStringFuncFormatter("contains"),
        notcontains: this.createStringFuncFormatter("not contains")
    });

    private _compileBinary(criteria, protocolVersion) {
        criteria       = dataUtils.normalizeBinaryCriterion(criteria);
        const op      = criteria[1],
              formatters = 4 === protocolVersion ? this.formattersV4 : this.formattersV2;
        let formatter = formatters[op.toLowerCase()];
        if (!formatter) {
            throw Error(`Unknown filter operation is used: ${op}`)
        }
        return formatter(serializePropName(criteria[0]), odataUtils.serializeValue(criteria[2], protocolVersion))
    };

    private _compileGroup(criteria, protocolVersion) {
        let groupOperator, nextGroupOperator;
        const bag = [];
        $.each(criteria, function (index, criterion) {
            if ($.isArray(criterion)) {
                if (bag.length > 1 && groupOperator !== nextGroupOperator) {
                    throw new Error(`Mixing of group operators inside a single group of filter expression is not allowed`)
                }
                bag.push("(" + this.compileCore(criterion, protocolVersion) + ")");
                groupOperator     = nextGroupOperator;
                nextGroupOperator = "and"
            } else {
                nextGroupOperator = dataUtils.isConjunctiveOperator(this) ? "and" : "or"
            }
        });
        return bag.join(" " + groupOperator + " ")
    };

    private _compileCore(criteria, protocolVersion) {
        if ($.isArray(criteria[0])) {
            return this._compileGroup(criteria, protocolVersion)
        }
        return this._compileBinary(criteria, protocolVersion)
    };

    public compile(criteria, protocolVersion) {
        return this._compileCore(criteria, protocolVersion)
    }
}

