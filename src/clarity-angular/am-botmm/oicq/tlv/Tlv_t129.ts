import {Tlv_t} from "./Tlv_t";
export class Tlv_t129 extends Tlv_t {
    protected _random_len;

    public constructor() {
        super();
        this._random_len = 0;
        this._cmd        = 0x129;
    }

    public verify() {
        if (this._body_len < 8) {
            return false;
        }
        return true;
    }

    public  get_timeout() {
        return this._buf.readInt32BE(this._head_len);
    }

    public  get_nexttime() {
        return this._buf.readInt32BE(this._head_len + 4);
    }
}
