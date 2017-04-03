import {Tlv_t} from "./Tlv_t";
class Tlv_t147 extends Tlv_t {
    public constructor() {
        super();
        this._cmd = 327;
    }

    private limit_len(data: Buffer, max_len: number) {
        if (data == null) {
            return 0;
        }
        if (data.length > max_len) {
            return max_len;
        }
        return data.length;
    }

    public  get_tlv_147(appVerID, appVer, appSign) {
        let appVer_len  = this.limit_len(appVer, 32);
        let appSign_len = this.limit_len(appSign, 32);
        let body        = new Buffer(appVer_len + 6 + 2 + appSign_len);
        let pos         = 0;
        body.writeInt32BE(appVerID, pos);
        pos += 4;
        body.writeInt16BE(appVer_len, pos);
        pos += 2;
        body.write(appVer, pos, appVer_len);
        pos += appVer_len;
        body.writeInt16BE(appSign_len, pos);
        pos += 2;
        body.write(appSign, pos, appSign_len);
        pos += appSign_len;
        this.fill_head(this._cmd);
        this.fill_body(body, pos);
        this.set_length();
        return this.get_buf();
    }
}
