import {Tlv_t} from "./Tlv_t";
import {inject, injectable} from "inversify";
import {MmInfo} from "../../mm-info/mm-info";
import {PlatformInfo} from "../../platform-info/platform-info";

@injectable()
export class Tlv_t177 extends Tlv_t {
    protected _t177_body_len = 0;

    public constructor(
        @inject(PlatformInfo)
        public platformInfo: PlatformInfo,
        @inject(MmInfo)
        public mmInfo: MmInfo,
    ) {
        super();
        this._cmd = 375;
    }

    /**
     *
     * @param time    1400575203
     * @param version "5.2.2.1"
     * @return mixed
     */
    public get_tlv_177(time, version: Buffer) {
        let version_len     = version.length;
        this._t177_body_len = version_len + 7;
        let body            = new Buffer(this._t177_body_len);
        let p               = 0;
        body.writeUInt8(1, p);
        p += 1;
        body.writeUInt32BE(time, p);
        p += 4;
        body.writeUInt16BE(version_len, p);
        p += 2;
        version.copy(body, p, 0, version_len);
        p += version_len;
        this.fill_head(this._cmd);
        this.fill_body(body, this._t177_body_len);
        this.set_length();
        return this.get_buf();
    }

    public serialize(): Buffer {
        return this.get_tlv_177(
            this.platformInfo.fixRuntime.time,
            this.platformInfo.fixRuntime.version
        )
    }
}
