import {Tlv_t} from "./Tlv_t";
import {inject, injectable} from "inversify";
import {MmInfo} from "../../mm-info/mm-info";
import {PlatformInfo} from "../../platform-info/platform-info";

@injectable()
export class Tlv_t188 extends Tlv_t {
    protected _t188_body_len = 0;

    public constructor(
        @inject(PlatformInfo)
        public platformInfo: PlatformInfo,
        @inject(MmInfo)
        public mmInfo: MmInfo,
    ) {
        super();
        this._cmd = 392;
    }

    /**
     * hex 4D BF 65 33 D9 08 C2 73 63 6D E5 CD AE 83 C0 43
     *
     * @param $android_id
     * @return mixed
     */
    public get_tlv_188(android_id: Buffer) {
        let arg_len = 16;
        if (android_id != null) {
            arg_len = android_id.length;
        }
        this._t188_body_len = arg_len;
        let body            = new Buffer(this._t188_body_len);
        android_id.copy(body, 0, 0, arg_len);
        this.fill_head(this._cmd);
        this.fill_body(body, this._t188_body_len);
        this.set_length();
        return this.get_buf();
    }

    public serialize(): Buffer {
        return this.get_tlv_188(
            this.platformInfo.android.android_device_id
        )
    }
}
