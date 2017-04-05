import {Tlv_t} from "./Tlv_t";
import {inject, injectable} from "inversify";
import {PlatformInfo} from "../../platform-info/platform-info";
import {MmInfo} from "../../mm-info/mm-info";

@injectable()
export class Tlv_t516 extends Tlv_t {
    public constructor(
        @inject(PlatformInfo)
        public platformInfo: PlatformInfo,
        @inject(MmInfo)
        public mmInfo: MmInfo,
    ) {
        super();
        this._cmd = 0x516;
    }

    /**
     * WUserSignInfo $source_type
     * @param source_type 0
     * @return mixed
     */
    public get_tlv_516(source_type) {
        this.fill_head(this._cmd);
        this.fill_body(source_type, 4);
        this.set_length();
        return this.get_buf();
    }

    public serialize() {
        return this.get_tlv_516(
            this.platformInfo.fixRuntime.source_type
        )
    }
}
