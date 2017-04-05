import {Tlv_t} from "./Tlv_t";
import {inject, injectable} from "inversify";
import {MmInfo} from "../../mm-info/mm-info";
import {PlatformInfo} from "../../platform-info/platform-info";

@injectable()
export class Tlv_t191 extends Tlv_t {
    public constructor(
        @inject(PlatformInfo)
        public platformInfo: PlatformInfo,
        @inject(MmInfo)
        public mmInfo: MmInfo,
    ) {
        super();
        this._cmd = 401;
    }

    /**
     * @return mixed
     */
    public get_tlv_191() {
        let body = new Buffer(1);
        body.writeUInt8(0, 0);
        //or 0
        this.fill_head(this._cmd);
        this.fill_body(body, 1);
        this.set_length();
        return this.get_buf();
    }

    public serialize() {
        return this.get_tlv_191()
    }
}
