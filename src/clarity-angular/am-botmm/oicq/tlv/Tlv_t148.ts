import {Tlv_t} from "./Tlv_t";
import {injectable} from "inversify";
import {Buffer} from "buffer";

@injectable()
export class Tlv_t148 extends Tlv_t {
    public constructor() {
        super();
        this._cmd = 328;
    }

    private  limit_len(data: Buffer, max_len: number) {
        if (data == null) {
            return 0;
        }
        if (data.length > max_len) {
            return max_len;
        }
        return data.length;
    }

    public  get_tlv_148(appName: Buffer, ssoVer: number, appID: number, subAppID: number, appVer: Buffer, appSign: Buffer) {
        let appName_len = this.limit_len(appName, 32);
        let appVer_len  = this.limit_len(appVer, 32);
        let appSign_len = this.limit_len(appSign, 32);
        let body        = new Buffer(appName_len + 2 + 4 + 4 + 4 + 2 + appVer_len + 2 + appSign_len);
        let pos         = 0;
        body.writeUInt16BE(appName_len, 0);
        pos += 2;
        appName.copy(body, pos, 0, appName_len);
        pos += appName_len;
        body.writeUInt32BE(ssoVer, pos);
        pos += 4;
        body.writeUInt32BE(appID, pos);
        pos += 4;
        body.writeUInt32BE(subAppID, pos);
        pos += 4;
        body.writeUInt16BE(appVer_len, pos);
        pos += 2;
        appVer.copy(body, pos, 0, appVer_len);
        pos += appVer_len;
        body.writeUInt16BE(appSign_len, pos);
        pos += 2;
        appSign.copy(body, pos, 0, appSign_len)
        pos += appSign_len;
        this.fill_head(this._cmd);
        this.fill_body(body, pos);
        this.set_length();
        return this.get_buf();
    }
}
