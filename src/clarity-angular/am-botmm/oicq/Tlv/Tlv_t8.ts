import {Buffer} from "buffer";
import {Tlv_t} from "./Tlv_t";
export class Tlv_t8 extends Tlv_t {
    public constructor() {
        super();
        this._cmd = 8;
    }

    public  get_tlv_8(paramInt1: number, _local_id: number, paramInt3: number) {
        let body = Buffer.alloc(8);
        let p    = 0;
        body.writeInt16BE(paramInt1, 0);
        p += 2;
        body.writeInt32BE(_local_id, p);
        p += 4;
        body.writeInt16BE(paramInt3, p);
        p += 2;
        this.fill_head(this._cmd);
        this.fill_body(body, 8);
        this.set_length();
        return this.get_buf();
    }
}
