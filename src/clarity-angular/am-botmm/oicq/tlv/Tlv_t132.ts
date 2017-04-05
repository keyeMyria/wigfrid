import {Tlv_t} from "./Tlv_t";
export class Tlv_t132 extends Tlv_t {
    protected _openid_len;
    protected _token_len;

    public constructor() {
        super();
        this._token_len  = 0;
        this._openid_len = 0;
        this._cmd        = 0x132;
    }

    public verify() {
        if (this._body_len < 2) {
            return false;
        }
        this._token_len = this._buf.readInt16BE(this._head_len);
        if (this._token_len + 2 + 4 + 2 > this._body_len) {
            return false;
        }
        this._openid_len = this._buf.readInt16BE(this._head_len + 2 + this._token_len + 4);
        return true;
    }

    public get_access_token() {
        return this._buf.slice(this._head_len + 2, this._head_len + 2 + this._token_len);
    }

    public get_openid() {
        return this._buf.slice(
            this._head_len + 2 + this._token_len + 4 + 2,
            this._head_len + 2 + this._token_len + 4 + 2 + this._openid_len,
        );
    }
}
