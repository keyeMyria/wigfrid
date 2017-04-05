import {Tlv_t} from "./Tlv_t";
export class Tlv_t119 extends Tlv_t {
    protected _t119_body_len;

    public constructor() {
        super();
        this._cmd = 0x119;
    }

    public verify() {
        return true;
    }
}
