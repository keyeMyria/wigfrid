import {Buffer} from "buffer";
import {Tlv_t} from "./Tlv_t";
import {PlatformInfo} from "../../platform-info/platform-info";
import {MmInfo} from "../../mm-info/mm-info";
import {inject, injectable} from "inversify";

@injectable()
export class Tlv_t18 extends Tlv_t {
    protected _ping_version;
    protected _sso_version;
    protected _t18_body_len;

    public constructor(
        @inject(PlatformInfo)
        public platformInfo: PlatformInfo,
        @inject(MmInfo)
        public mmInfo: MmInfo,
        // public appid: number,
        // public client_version: number,
        // public uin: Buffer,
        // public rc: number
    ) {
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
    public get_tlv_18(appid: number, client_version: number, uin32: number, rc: number) {
        let body = new Buffer(this._t18_body_len);
        let p    = 0;
        body.writeUInt16BE(this._ping_version, p);
        p += 2;
        body.writeUInt32BE(this._sso_version, p);
        p += 4;
        body.writeUInt32BE(appid, p);
        p += 4;
        body.writeUInt32BE(client_version, p);
        p += 4;
        body.writeUInt32BE(uin32, p);
        p += 4;
        body.writeUInt16BE(rc, p);
        p += 2;
        body.writeUInt16BE(0, p);
        p += 2;
        this.fill_head(this._cmd);
        this.fill_body(body, this._t18_body_len);
        this.set_length();
        return this.get_buf();
    }

    public serialize() {
        return this.get_tlv_18(
            this.platformInfo.fixRuntime.appid,
            this.platformInfo.fixRuntime.clientVersion,
            this.mmInfo.uin32,
            0
        );
    }

    public unserialize() {
        this.platformInfo.fixRuntime.appid         = this._buf.readInt32BE(this._head_len + 2 + 4);
        this.platformInfo.fixRuntime.clientVersion = this._buf.readInt32BE(this._head_len + 2 + 4 + 4);
        this.mmInfo.uin32                          = this._buf.readInt32BE(this._head_len + 2 + 4 + 4 + 4);

        this._buf.readInt16BE(this._head_len + 2 + 4 + 4 + 4 + 4)
    }
}
