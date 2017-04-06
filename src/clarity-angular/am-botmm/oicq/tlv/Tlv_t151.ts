import {Tlv_t} from "./Tlv_t";
import {inject, injectable} from "inversify";
import {MmInfo} from "../../mm-info/mm-info";
import {PlatformInfo} from "../../platform-info/platform-info";
import {Buffer} from "buffer";

@injectable()
export class Tlv_t151 extends Tlv_t {
    public constructor(
        @inject(PlatformInfo)
        public platformInfo: PlatformInfo,
        @inject(MmInfo)
        public mmInfo: MmInfo,
    ) {
        super();
        this._cmd = 337;
    }

    public get_tlv_151(data: Buffer) {
        let body_len = 0;
        if (data != null) {
            body_len = data.length;
        }
        let body = new Buffer(body_len);
        if (body_len > 0) {
            data.copy(body, 0, 0, body_len);
        }
        this.fill_head(this._cmd);
        this.fill_body(body, body_len);
        this.set_length();
        return this.get_buf();
    }
}
