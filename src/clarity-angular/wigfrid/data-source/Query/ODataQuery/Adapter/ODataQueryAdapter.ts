import * as _ from "lodash";
import { serializePropName, sendRequest } from "../../../Store/ODataStore/ODataUtils";
import { ODataCompileCriteria } from "../Compile/ODataCompileCriteria";
import { ODataV2Generator } from "./ODataV2Generator";
import { ODataV4Generator } from "./ODataV4Generator";

const DEFAULT_PROTOCOL_VERSION = 2;

export class ODataQueryAdapter {

    private queryOptions;

    private _select;
    private _skip;
    private _take;
    private _countQuery;
    private _sorting  = [];
    private _criteria = [];
    private _expand;
    private _oDataVersion;

    constructor(){}

    setOptions(queryOptions) {
        this.queryOptions  = queryOptions;
        this._expand       = queryOptions.expand;
        this._oDataVersion = queryOptions.version || DEFAULT_PROTOCOL_VERSION;
    }

    private hasFunction(criterion) {
        for (let i = 0; i < criterion.length; i++) {
            if (_.isFunction(criterion[i])) {
                return true
            }
            if (_.isArray(criterion[i]) && this.hasFunction(criterion[i])) {
                return true
            }
        }
        return false
    }

    private hasSlice() {
        return this._skip || void 0 !== this._take
    }

    private generateSelectExpand() {
        const hasDot         = function (x) {
            return /\./.test(x)
        };
        const generateSelect = function () {
            if (!this._select) {
                return
            }
            if (this._oDataVersion < 4) {
                return serializePropName(this._select.join())
            }
            return $.grep(this._select, hasDot, true).join()
        };
        const generateExpand = function () {

            if (this._oDataVersion < 4) {
                return new ODataV2Generator()
            }
            return new ODataV4Generator()
        };
        const tuple        = {
            $select: generateSelect() || void 0,
            $expand: generateExpand() || void 0
        };
        return tuple
    }

    private requestData() {
        const result = {};
        if (!this._countQuery) {
            if (this._sorting.length) {
                result.$orderby = this._sorting.join(",")
            }
            if (this._skip) {
                result.$skip = this._skip
            }
            if (void 0 !== this._take) {
                result.$top = this._take
            }
            const tuple    = this.generateSelectExpand();
            result.$select = tuple.$select;
            result.$expand = tuple.$expand
        }
        if (this._criteria.length) {
            let criteria = new ODataCompileCriteria(this._criteria.length < 2 ? this._criteria[0] : this._criteria, this._oDataVersion).compile();
            result.$filter = criteria;
        }
        if (this._countQuery) {
            result.$top = 0
        }
        if (this.queryOptions.requireTotalCount || this._countQuery) {
            if (4 !== this._oDataVersion) {
                result.$inlinecount = "allpages"
            } else {
                result.$count = "true"
            }
        }
        return result
    }

    exec(url) {
        let queryOptions = this.queryOptions;
        return sendRequest(this._oDataVersion, {
            url:    url,
            params: _.extend(this.requestData(), queryOptions && queryOptions.params)
        }, {
            beforeSend:      queryOptions.beforeSend,
            jsonp:           queryOptions.jsonp,
            withCredentials: queryOptions.withCredentials,
            countOnly:       this._countQuery
        }, queryOptions.deserializeDates)
    }

    multiSort(args) {
        let rules;
        if (this.hasSlice()) {
            return false
        }
        for (let i = 0; i < args.length; i++) {
            let rule, getter = args[i][0];
            const desc = !!args[i][1];
            if ("string" !== typeof getter) {
                return false
            }
            rule = serializePropName(getter);
            if (desc) {
                rule += " desc"
            }
            rules = rules || [];
            rules.push(rule)
        }
        this._sorting = rules
    }

    slice(skipCount, takeCount) {
        if (this.hasSlice()) {
            return false
        }
        this._skip = skipCount;
        this._take = takeCount;
    }

    filter(criterion) {
        if (this.hasSlice()) {
            return false
        }
        if (!_.isArray(criterion)) {
            criterion = _.toArray(arguments)
        }
        if (this.hasFunction(criterion)) {
            return false
        }
        if (this._criteria.length) {
            this._criteria.push("and")
        }
        this._criteria.push(criterion)
    }

    select(expr) {
        if (this._select || _.isFunction(expr)) {
            return false
        }
        if (!_.isArray(expr)) {
            expr = _.toArray(arguments)
        }
        this._select = expr
    }

    count() {
        this._countQuery = true
    }
}
