import {Tlv_t} from "./Tlv_t";
import {inject, injectable} from "inversify";
import {PlatformInfo} from "../../platform-info/platform-info";
import {MmInfo} from "../../mm-info/mm-info";
import {Buffer} from "buffer";

@injectable()
export class Tlv_t116 extends Tlv_t {
    /** @var int _t116_body_len */
    protected _t116_body_len;
    /** @var int _ver */
    protected _ver;

    public constructor(
        @inject(PlatformInfo)
        public platformInfo: PlatformInfo,
        @inject(MmInfo)
        public mmInfo: MmInfo,
    ) {
        super();
        this._t116_body_len = 0;
        this._ver           = 0;
        this._cmd           = 278;
    }

    /**
     * @param bitmap number
     * @param get_sig number
     * @param appid 1600000226L 1600000749L
     * @return byte[]
     */
    public  get_tlv_116(bitmap: number, get_sig: number, appid: number[]) {
        if (appid == null) {
            appid = [];
        }
        this._t116_body_len = appid.length * 4 + 10;
        let p               = 0;
        let body            = new Buffer(this._t116_body_len);
        body.writeUInt8(this._ver, p);
        p += 1;
        body.writeUInt32BE(bitmap, p);
        p += 4;
        body.writeUInt32BE(get_sig, p);
        p += 4;
        body.writeUInt8(appid.length, p);
        p++;
        for (let j = 0; j < appid.length; j++) {
            body.writeUInt32BE(appid[j], p);
            p += 4;
        }
        this.fill_head(this._cmd);
        this.fill_body(body, p);
        this.set_length();
        return this.get_buf();
    }

    public serialize(): Buffer {
        return this.get_tlv_116(
            this.mmInfo.bitmap,
            this.mmInfo.get_sig,
            []
        )
    }
}
