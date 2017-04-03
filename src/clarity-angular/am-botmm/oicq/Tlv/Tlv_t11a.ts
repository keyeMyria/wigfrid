import {Buffer} from "buffer";
import {Tlv_t} from "./Tlv_t";
class Tlv_t11a extends Tlv_t {
    public _nick_len;

    public constructor() {
        super();
        this._nick_len = 0;
        this._cmd      = 0x11a;
    }

    public verify() {
        if (this._body_len < 5) {
            return false;
        }
        let l = this._buf.readInt8(this._head_len + 2 + 1 + 1);
        if (this._body_len < l + 5) {
            return false;
        }
        this._nick_len = l;
        return true;
    }

    public get_face() {
        let buf = Buffer.alloc(2);
        this._buf.copy(buf, 0, this._head_len, this._head_len + 2);
        return buf;
    }

    public get_age() {
        let buf = Buffer.alloc(1);
        this._buf.copy(buf, 0, this._head_len + 2, this._head_len + 2 + 1);
        return buf;
    }

    public get_gander() {
        let buf = Buffer.alloc(1);
        this._buf.copy(buf, 0, this._head_len + 2 + 1, this._head_len + 2 + 1 + 1);
        return buf;
    }

    public get_nick() {
        let buf = Buffer.alloc(this._nick_len);
        this._buf.copy(buf, 0, this._head_len + 2 + 1 + 1 + 1, this._head_len + 2 + 1 + 1 + 1 + this._nick_len);
        return buf;
    }
}
