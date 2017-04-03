import {Buffer} from "buffer";
import {Tlv_t} from "./Tlv_t";
class Tlv_t10a extends Tlv_t {
    public constructor() {
        super();
        this._cmd = 0x10a;
    }

    public get_tlv_10a(TGT: Buffer) {
        let body = Buffer.alloc(TGT.length);
        let p    = 0;
        TGT.copy(body);

        p += TGT.length;
        this.fill_head(this._cmd);
        this.fill_body(body, p);
        this.set_length();
        return this.get_buf();
    }
}
