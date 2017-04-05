import {Tlv_t} from "./Tlv_t";
import {injectable} from "inversify";

@injectable()
export class Tlv_t525 extends Tlv_t {
    public constructor() {
        super();
        this._cmd = 0x525;
    }

    public get_tlv_525(tlv522List: Buffer[]) {
        let body = new Buffer(256);
        let p    = 0;
        body.writeInt16BE(tlv522List.length, p);
        //tlv数量
        p += 2;
        tlv522List.forEach((tlv522) => {
            tlv522.copy(body, p);
            p += tlv522.length;
        });

        this.fill_head(this._cmd);
        this.fill_body(body, p);
        this.set_length();
        return this.get_buf();
    }
}
