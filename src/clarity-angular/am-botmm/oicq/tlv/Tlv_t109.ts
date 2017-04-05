import {Tlv_t} from "./Tlv_t";
import {inject, injectable} from "inversify";
import {PlatformInfo} from "../../platform-info/platform-info";
import {MmInfo} from "../../mm-info/mm-info";

@injectable()
export class Tlv_t109 extends Tlv_t {
    protected _t109_body_len;

    public constructor(
        @inject(PlatformInfo)
        public platformInfo: PlatformInfo,
        @inject(MmInfo)
        public mmInfo: MmInfo,
    ) {
        super();
        this._t109_body_len = 0;
        this._cmd           = 265;
    }

    public get_tlv_109(IMEI: Buffer) {
        this._t109_body_len = IMEI.length;
        let body            = new Buffer(this._t109_body_len);
        IMEI.copy(body);
        this.fill_head(this._cmd);
        this.fill_body(body, this._t109_body_len);
        this.set_length();
        return this.get_buf();
    }

    public serialize(): Buffer {
        return this.get_tlv_109(
            this.platformInfo.android.android_device_mac_hash
        );
    }
}
