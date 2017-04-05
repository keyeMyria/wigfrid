import {Tlv_t} from "./Tlv_t";
import {inject, injectable} from "inversify";
import {MmInfo} from "../../mm-info/mm-info";
import {PlatformInfo} from "../../platform-info/platform-info";

@injectable()
export class Tlv_t145 extends Tlv_t {
    public _t145_body_len;

    public constructor(
        @inject(PlatformInfo)
        public platformInfo: PlatformInfo,
        @inject(MmInfo)
        public mmInfo: MmInfo,
    ) {
        super();
        this._t145_body_len = 0;
        this._cmd           = 325;
    }

    public get_tlv_145(guid: Buffer) {
        let in_len   = 0;
        let guid_len = guid.length;
        if (guid != null) {
            in_len = 0 + guid_len;
        }
        let body = new Buffer(in_len);
        if (in_len > 0) {
            guid.copy(body);
        }
        this._t145_body_len = in_len;
        this.fill_head(this._cmd);
        this.fill_body(body, in_len);
        this.set_length();
        return this.get_buf();
    }

    public serialize(): Buffer {
        return this.get_tlv_145(
            this.platformInfo.android.android_device_mac_hash
        )
    }
}
