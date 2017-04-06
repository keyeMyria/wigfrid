import {Tlv_t} from "./Tlv_t";
import {injectable} from "inversify";
import {Buffer} from "buffer";

@injectable()
export class Tlv_t105 extends Tlv_t
{
    protected _en_pos;
    protected _enlen;
    protected _pic_pos;
    protected _piclen;
    public constructor()
    {
        super();
        this._piclen = 0;
        this._enlen = 0;
        this._pic_pos = 0;
        this._en_pos = 0;
        this._cmd = 0x105;
    }
    public verify()
    {
        if (this._body_len < 2) {
            return false;
        }
        this._enlen = this._buf.readInt16BE(this._head_len);
        if (this._body_len < this._enlen + 2 + 2) {
            return false;
        }
        this._piclen = this._buf.readInt16BE(this._head_len + 2 + this._enlen);
        if (this._body_len < this._enlen + 2 + 2 + this._piclen) {
            return false;
        }
        this._en_pos = this._head_len + 2;
        this._pic_pos = this._enlen + 2 + 2 + this._head_len;
        return true;
    }
    public get_pic()
    {
        let ret = Buffer.alloc(this._piclen);
        if (this._piclen > 0) {
            this._buf.copy(ret, 0, this._pic_pos, this._pic_pos + this._piclen);
        }
        return ret;
    }
    public get_sign()
    {
        let ret = Buffer.alloc(this._enlen);
        if (this._enlen > 0) {
            this._buf.copy(ret, 0, this._en_pos, this._en_pos + this._enlen);
        }
        return ret;
    }
}
