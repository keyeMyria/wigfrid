import {Tlv_t} from "./Tlv_t";
export class Tlv_t172 extends Tlv_t {
    public constructor() {
        super();
        this._cmd = 370;
    }

    public get_tlv_172(rollbackSig: Buffer) {
        this.fill_head(this._cmd);
        this.fill_body(rollbackSig, rollbackSig.length);
        this.set_length();
        return this.get_buf();
    }
}
