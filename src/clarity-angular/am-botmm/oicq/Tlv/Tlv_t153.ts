import {Tlv_t} from "./Tlv_t";
export class Tlv_t153 extends Tlv_t {
    public constructor() {
        super();
        this._cmd = 339;
    }

    public get_tlv_153(isRoot: number) {
        let body = new Buffer(2);
        let p    = 0;
        body.writeInt16BE(isRoot, p);
        p += 2;
        this.fill_head(this._cmd);
        this.fill_body(body, p);
        this.set_length();
        return this.get_buf();
    }
}
