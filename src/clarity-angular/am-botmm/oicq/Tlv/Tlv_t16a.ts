import {Tlv_t} from "./Tlv_t";
class Tlv_t16a extends Tlv_t {
    protected _t16a_body_len;

    public constructor() {
        super();
        this._t16a_body_len = 0;
        this._cmd           = 0x16a;
    }

    public get_tlv_16a(no_pic_sig: Buffer) {
        this._t16a_body_len = no_pic_sig.length;
        let body            = new Buffer(this._t16a_body_len);
        no_pic_sig.copy(body);
        this.fill_head(this._cmd);
        this.fill_body(body, this._t16a_body_len);
        this.set_length();
        return this.get_buf();
    }
}
