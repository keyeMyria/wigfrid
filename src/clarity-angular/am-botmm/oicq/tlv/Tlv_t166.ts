import {Tlv_t} from "./Tlv_t";
import {injectable} from "inversify";

@injectable()
export class Tlv_t166 extends Tlv_t {
    public constructor() {
        super();
        this._cmd = 358;
    }

    public get_tlv_166(img_type: number) {
        let body = new Buffer(1);
        let pos  = 0;
        body.writeUInt8(img_type, pos);
        pos += 1;
        this.fill_head(this._cmd);
        this.fill_body(body, pos);
        this.set_length();
        return this.get_buf();
    }
}
