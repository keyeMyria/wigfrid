import {Tlv_t} from "./Tlv_t";
import {inject, injectable} from "inversify";
import {MmInfo} from "../../mm-info/mm-info";
import {PlatformInfo} from "../../platform-info/platform-info";
import {Buffer} from "buffer";

@injectable()
export class Tlv_t521 extends Tlv_t {
    public constructor(
        @inject(PlatformInfo)
        public platformInfo: PlatformInfo,
        @inject(MmInfo)
        public mmInfo: MmInfo,
    ) {
        super();
        this._cmd = 0x521;
    }

    /**
     * @param productType
     * @return mixed
     */
    public get_tlv_521(productType: number) {
        let body = new Buffer(6);
        let p    = 0;
        body.writeUInt32BE(productType, 0);
        p += 4;
        body.writeUInt16BE(0, p);
        p += 2;
        this.fill_head(this._cmd);
        this.fill_body(body, p);
        this.set_length();
        return this.get_buf();
    }

    public serialize() {
        return this.get_tlv_521(
            this.platformInfo.fixRuntime.product_type
        )
    }
}
