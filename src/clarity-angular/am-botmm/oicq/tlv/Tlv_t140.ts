import {Tlv_t} from "./Tlv_t";
import {injectable} from "inversify";
import {Buffer} from "buffer";

@injectable()
export class Tlv_t140 extends Tlv_t {
    protected _info_len;

    public constructor() {
        super();
        this._info_len = 0;
        this._cmd      = 320;
    }

    public verify() {
        if (this._body_len < 4) {
            return false;
        }
        this._info_len = this._buf.readInt16BE(this._head_len + 2);
        if (this._body_len < this._info_len + 4 + 2 + 2) {
            return false;
        }
        return true;
    }

    public get_host() {
        this._buf.slice(this._head_len + 2 + 2, this._head_len + 2 + 2 + this._info_len);
    }

    public get_port() {
        return this._buf.readInt16BE(this._head_len + 2 + 2 + this._info_len);
    }
}
