import {Buffer} from "buffer";
import {Tlv_t} from "./Tlv_t";
export class Tlv_t18 extends Tlv_t {
    protected _ping_version;
    protected _sso_version;
    protected _t18_body_len;

    public constructor() {
        super();
        this._t18_body_len = 22;
        this._ping_version = 1;
        this._sso_version  = 1536;
        //cmd
        this._cmd          = 24;
    }

    /**
     * @param appid          long|string 4byte
     * @param client_version int         00 00 00 00
     * @param uin            long|string qq number
     * @param rc             int         00 00
     * @return mixed
     */
    public  get_tlv_18(appid: number, client_version: number, uin: number, rc: number) {
        let body = new Buffer(this._t18_body_len);
        let p    = 0;
        body.writeInt16BE(this._ping_version, p);
        p += 2;
        body.writeInt32BE(this._sso_version, p);
        p += 4;
        body.writeInt32BE(appid, p);
        p += 4;
        body.writeInt32BE(client_version, p);
        p += 4;
        body.writeInt32BE(uin, p);
        p += 4;
        body.writeInt16BE(rc, p);
        p += 2;
        body.writeInt16BE(0, p);
        p += 2;
        this.fill_head(this._cmd);
        this.fill_body(body, this._t18_body_len);
        this.set_length();
        return this.get_buf();
    }
}
