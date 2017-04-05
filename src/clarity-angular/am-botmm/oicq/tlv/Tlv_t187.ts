import {Tlv_t} from "./Tlv_t";
import {inject, injectable} from "inversify";
import {MmInfo} from "../../mm-info/mm-info";
import {PlatformInfo} from "../../platform-info/platform-info";

@injectable()
export class Tlv_t187 extends Tlv_t {
    protected _t187_body_len = 0;

    public constructor(
        @inject(PlatformInfo)
        public platformInfo: PlatformInfo,
        @inject(MmInfo)
        public mmInfo: MmInfo,
    ) {
        super();
        this._cmd = 391;
    }

    /**
     * hex
     * F8 FF 12 23 6E 0D AF 24 97 CE 7E D6 A0 7B DD 68
     *
     * @param $mac
     * @return mixed
     */
    public get_tlv_187(mac: Buffer) {
        let arg_len = 16;
        if (mac != null) {
            arg_len = mac.length;
        }
        this._t187_body_len = arg_len;
        let body            = new Buffer(this._t187_body_len);
        mac.copy(body, 0, 0, arg_len);
        this.fill_head(this._cmd);
        this.fill_body(body, this._t187_body_len);
        this.set_length();
        return this.get_buf();
    }

    public serialize(): Buffer {
        return this.get_tlv_187(
            this.platformInfo.network.macHash
        );
    }
}
