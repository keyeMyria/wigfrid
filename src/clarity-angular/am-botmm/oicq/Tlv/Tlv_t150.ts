import {Tlv_t} from "./Tlv_t";
class Tlv_t150 extends Tlv_t
{
    public _other_len;
    public constructor()
    {
        super();
        this._other_len = 0;
        this._cmd = 336;
    }
    public  verify()
    {
        if (this._body_len < 7) {
            return false;
        }
        let templen = this._buf.readInt16BE(this._head_len + 5);
        if (this._body_len < templen + 7) {
            return false;
        }
        this._other_len = templen;
        return true;
    }
    public  get_bitmap()
    {
        this._buf.readInt32BE(this._head_len);
    }
    public  get_network()
    {
        return this._buf.readInt8(this._head_len + 4);
    }
}
