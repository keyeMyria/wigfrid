import {Buffer} from "buffer";
import {Tlv_t} from "./Tlv_t";
import {injectable} from "inversify";

@injectable()
export class Tlv_t104 extends Tlv_t {
    protected _t104_body_len;

    public constructor() {
        super();
        this._t104_body_len = 0;
        this._cmd           = 0x104;
    }

    public  get_tlv_104(sig_session: Buffer) {
        this._t104_body_len = sig_session.length;
        let body            = Buffer.alloc(this._t104_body_len);
        sig_session.copy(body);
        this.fill_head(this._cmd);
        this.fill_body(body, this._t104_body_len);
        this.set_length();
        return this.get_buf();
    }
}
