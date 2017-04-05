import {Buffer} from "buffer";
import {Tlv_t} from "./Tlv_t";
export class Tlv_t16b extends Tlv_t {
    public constructor() {
        super();
        this._cmd = 363;
    }

    public get_tlv_16b(list: Buffer[]) {
        let total_len = 0, num = 0;
        if (list != null) {
            num       = list.length;
            let index = 0;
            do {
                if (index >= num) {
                    break;
                }
                total_len += 2;
                if (list[index] != null) {
                    total_len += list[index].length;
                }
                ++index;
            } while (true);
        }
        let body = new Buffer(total_len + 2);
        let pos  = 0;
        body.writeInt16BE(num, pos);
        pos += 2;
        if (list != null) {
            for (let i = 0; i < list.length; ++i) {
                if (list[i] != null) {
                    let item     = list[i];
                    let item_len = item.length;
                    body.writeInt16BE(item_len, pos);
                    pos += 2;
                    item.copy(body, pos, 0, item_len);
                    pos += item_len;
                    continue;
                }
                body.writeInt16BE(0, pos);
                pos += 2;
            }
        }
        this.fill_head(this._cmd);
        this.fill_body(body, pos);
        this.set_length();
        return this.get_buf();
    }
}
