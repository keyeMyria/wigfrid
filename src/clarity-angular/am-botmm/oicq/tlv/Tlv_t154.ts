import {Tlv_t} from "./Tlv_t";
import {inject, injectable} from "inversify";
import {MmInfo} from "../../mm-info/mm-info";
import {PlatformInfo} from "../../platform-info/platform-info";
import {Buffer} from "buffer";


@injectable()
export class Tlv_t154 extends Tlv_t {
    public constructor(
        @inject(PlatformInfo)
        public platformInfo: PlatformInfo,
        @inject(MmInfo)
        public mmInfo: MmInfo,
    ) {
        super();
        this._cmd = 340;
    }

    public get_tlv_154(ssoSeq: number) {
        let body = new Buffer(4);
        let p    = 0;
        body.writeUInt32BE(ssoSeq, p);
        p += 4;
        this.fill_head(this._cmd);
        this.fill_body(body, p);
        this.set_length();
        return this.get_buf();
    }

    public serialize() {
        return this.get_tlv_154(
            this.platformInfo.fixRuntime.ssoSeq
        )
    }
}
