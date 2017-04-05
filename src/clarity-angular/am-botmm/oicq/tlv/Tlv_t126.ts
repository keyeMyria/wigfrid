import "botmm/BufferBundle/Buffer/Buffer";
import {Tlv_t} from "./Tlv_t";
export class Tlv_t126 extends Tlv_t {
    protected _random_len;

    public constructor() {
        super();
        this._random_len = 0;
        this._cmd        = 0x126;
    }

    public verify() {
        if (this._body_len < 4) {
            return false;
        }
        this._random_len = this._buf.readInt16BE(this._head_len + 2);
        if (this._body_len < 2 + this._random_len + 2) {
            return false;
        }
        return true;
    }

    public get_random() {
        return this._buf.slice(
            this._head_len + 2 + 2,
            this._head_len + 2 + 2 + this._random_len,
        )
    }
}
