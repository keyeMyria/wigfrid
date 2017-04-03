import {Tlv_t} from "./Tlv_t";
class Tlv_t525 extends Tlv_t
{
    public constructor()
    {
        super();
        this._cmd = 0x525;
    }
    public  get_tlv_525(tlv522List: [])
    {
        body = new Buffer();
        p = 0;
        body.writeInt16BE(count(tlv522List), p);
        //tlv数量
        p += 2;
        foreach (tlv522List as tlv522) {
            body.write(tlv522, p);
            p += strlen(tlv522);
        }
        this.fill_head(this._cmd);
        this.fill_body(body, p);
        this.set_length();
        return this.get_buf();
    }
}
