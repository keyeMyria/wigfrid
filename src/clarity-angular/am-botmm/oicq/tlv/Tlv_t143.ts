import {Buffer} from "buffer";
import {Tlv_t} from "./Tlv_t";
import {injectable} from "inversify";

@injectable()
export class Tlv_t143 extends Tlv_t {
    public _t143_body_len;

    public constructor() {
        super();
        this._t143_body_len = 0;
        this._cmd           = 323;
    }

    public get_tlv143(b: Buffer) {
        this._t143_body_len = b.length;
        let body            = new Buffer(this._t143_body_len);
        b.copy(body);
        this.fill_head(this._cmd);
        this.fill_body(body, this._t143_body_len);
        this.set_length();
        return this.get_buf();
    }
}
