import {Tlv_t} from "./Tlv_t";
import {inject, injectable} from "inversify";
import {MmInfo} from "../../mm-info/mm-info";
import {PlatformInfo} from "../../platform-info/platform-info";

@injectable()
export class Tlv_t172 extends Tlv_t {
    public constructor(
        @inject(PlatformInfo)
        public platformInfo: PlatformInfo,
        @inject(MmInfo)
        public mmInfo: MmInfo,
    ) {
        super();
        this._cmd = 370;
    }

    public get_tlv_172(rollbackSig: Buffer) {
        this.fill_head(this._cmd);
        this.fill_body(rollbackSig, rollbackSig.length);
        this.set_length();
        return this.get_buf();
    }

    public serialize(): Buffer {
        return this.get_tlv_172(
            this.mmInfo.rollbackSig
        )
    }
}
