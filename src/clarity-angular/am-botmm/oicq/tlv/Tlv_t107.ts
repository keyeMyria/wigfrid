import {Tlv_t} from "./Tlv_t";
import {inject, injectable} from "inversify";
import {MmInfo} from "../../mm-info/mm-info";
import {PlatformInfo} from "../../platform-info/platform-info";
import {Buffer} from "buffer";

@injectable()
export class Tlv_t107 extends Tlv_t {
    /** @var int _t107_body_len; */
    protected _t107_body_len;

    public constructor(
        @inject(PlatformInfo)
        public platformInfo: PlatformInfo,
        @inject(MmInfo)
        public mmInfo: MmInfo,
    ) {
        super();
        this._t107_body_len = 6;
        this._cmd           = 263;
    }

    /**
     * @return mixed
     * @param pic_type
     * @param cap_type
     * @param pic_size
     * @param ret_type
     */
    public  get_tlv_107(pic_type: number, cap_type: number, pic_size: number, ret_type: number) {
        let body = new Buffer(this._t107_body_len);
        let p    = 0;
        body.writeUInt16BE(pic_type, p);
        p += 2;
        body.writeUInt8(cap_type, p);
        p++;
        body.writeUInt16BE(pic_size, p);
        p += 2;
        body.writeUInt8(ret_type, p);
        p++;
        this.fill_head(this._cmd);
        this.fill_body(body, this._t107_body_len);
        this.set_length();
        return this.get_buf();
    }


    public serialize(): Buffer {
        return this.get_tlv_107(
            this.mmInfo.picType,
            this.mmInfo.capType,
            this.mmInfo.picSize,
            this.mmInfo.retType
        )
    }
}
