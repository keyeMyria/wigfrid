import {Tlv_t} from "./Tlv_t";
import {injectable} from "inversify";

@injectable()
export class Tlv_t113 extends Tlv_t {
    public constructor() {
        super();
        this._cmd = 0x113;
    }

    public get_uin() {
        return this._buf.readInt32BE(this._head_len);
    }
}
