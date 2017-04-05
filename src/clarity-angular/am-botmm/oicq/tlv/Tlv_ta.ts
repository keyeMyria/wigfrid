import {Buffer} from "buffer";
import {Tlv_t} from "./Tlv_t";
export class Tlv_ta extends Tlv_t {
    protected _msg_len;

    public constructor() {
        super();
        this._msg_len = 0;
        this._cmd     = 10;
    }

    public verify() {
        if (this._body_len < 6) {
            return false;
        }
        let len = this._buf.readInt16BE(this._head_len + 4);
        if (len + 6 != this._body_len) {
            return false;
        }
        this._msg_len = len;
        return true;
    }

    public get_tlv_ta(_in: Buffer, len: number) {
        this.set_buf2(_in, len);
    }

    public get_msg() {
        if (this._msg_len > 0) {
            return this._buf.slice(this._head_len + 6, this._head_len + 6 + this._msg_len);
        }
        return '';
    }
}
