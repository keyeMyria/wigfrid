import {Tlv_t} from "./Tlv_t";
import {injectable} from "inversify";

@injectable()
export class Tlv_t177 extends Tlv_t {
    protected _t177_body_len = 0;

    public constructor() {
        super();
        this._cmd = 375;
    }

    /**
     *
     * @param time    1400575203
     * @param version "5.2.2.1"
     * @return mixed
     */
    public  get_tlv_177(time, version: Buffer) {
        let version_len     = version.length;
        this._t177_body_len = version_len + 7;
        let body            = new Buffer(this._t177_body_len);
        let p               = 0;
        body.writeInt8(1, p);
        p += 1;
        body.writeInt32BE(time, p);
        p += 4;
        body.writeInt16BE(version_len, p);
        p += 2;
        version.copy(body, p, 0, version_len);
        p += version_len;
        this.fill_head(this._cmd);
        this.fill_body(body, this._t177_body_len);
        this.set_length();
        return this.get_buf();
    }
}
