import {Tlv_t} from "./Tlv_t";
export class Tlv_t154 extends Tlv_t {
    public constructor() {
        super();
        this._cmd = 340;
    }

    public get_tlv_154(ssoSeq: number) {
        let body = new Buffer(4);
        let p    = 0;
        body.writeInt32BE(ssoSeq, p);
        p += 4;
        this.fill_head(this._cmd);
        this.fill_body(body, p);
        this.set_length();
        return this.get_buf();
    }
}
