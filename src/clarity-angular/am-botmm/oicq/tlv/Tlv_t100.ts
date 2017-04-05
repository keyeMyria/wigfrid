import {Buffer} from "buffer";
import {Tlv_t} from "./Tlv_t";
import {inject, injectable} from "inversify";
import {PlatformInfo} from "../../platform-info/platform-info";
import {MmInfo} from "../../mm-info/mm-info";

@injectable()
export class Tlv_t100 extends Tlv_t {
    /** @var int _db_buf_ver */
    protected _db_buf_ver;
    /** @var int _sso_ver */
    protected _sso_ver;
    /** @var int _t100_body_len */
    protected _t100_body_len;

    public constructor(
        @inject(PlatformInfo)
        public platformInfo: PlatformInfo,
        @inject(MmInfo)
        public mmInfo: MmInfo,
    ) {
        super();
        this._db_buf_ver    = 1;
        this._sso_ver       = 5;
        this._t100_body_len = 22;
        this._cmd           = 256;
    }

    /**
     * @return mixed
     * @param appid
     * @param wxappid
     * @param client_ver
     * @param getsig
     */
    public get_tlv_100(appid: number, wxappid: number, client_ver: number, getsig: number) {
        let body = new Buffer(this._t100_body_len);
        let p    = 0;
        body.writeUInt16BE(this._db_buf_ver, p);
        p += 2;
        body.writeUInt32BE(this._sso_ver, p);
        p += 4;
        body.writeUInt32BE(appid, p);
        p += 4;
        body.writeUInt32BE(wxappid, p);
        p += 4;
        body.writeUInt32BE(client_ver, p);
        p += 4;
        body.writeUInt32BE(getsig, p);
        p += 4;
        this.fill_head(this._cmd);
        this.fill_body(body, this._t100_body_len);
        this.set_length();
        return this.get_buf();
    }

    public serialize(): Buffer {
        return this.get_tlv_100(
            this.platformInfo.fixRuntime.appid,
            this.platformInfo.fixRuntime.wxAppId,
            this.platformInfo.fixRuntime.clientVersion,
            this.mmInfo.get_sig
        )
    }
}
