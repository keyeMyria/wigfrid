import {Tlv_t} from "./Tlv_t";
class Tlv_t130 extends Tlv_t
{
    public constructor()
    {
        super();
        this._cmd = 0x130;
    }
    public verify()
    {
        if (this._body_len < 14) {
            return false;
        }
        return true;
    }
    public get_tlv_t130(_in, len)
    {
        this.set_buf2(_in, len);
    }
    public  get_time()
    {
        return this._buf.readInt32BE(this._head_len + 2);
    }
    public  get_ipaddr()
    {
        return this._buf.readInt32BE(this._head_len + 2 + 4);
    }
}
