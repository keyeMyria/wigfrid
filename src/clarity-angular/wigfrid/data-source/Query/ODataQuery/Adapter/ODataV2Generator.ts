import { serializePropName } from "../../../Store/ODataStore/ODataUtils";

export class ODataV2Generator {
    _expand;
    _select;

    _hash;

    constructor({expand, select}) {
        this._expand = expand;
        this._select = select;
    }

    private _format() {
        const hash = {};
        if (this._expand) {
            _.forEach(_.toArray(this._expand), function () {
                hash[serializePropName(this)] = 1
            })
        }
        if (this._select) {
            _.forEach(_.toArray(this._select), function (value, index) {
                const path = value.split(".");
                if (path.length < 2) {
                    return
                }
                path.pop();
                hash[serializePropName(path.join("."))] = 1
            })
        }
        this._hash = hash;
    }

    generate() {
        return _.map(this._hash, function (k, v) {
            return v
        }).join()
    }
}
