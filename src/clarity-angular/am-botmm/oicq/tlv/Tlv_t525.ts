import {Tlv_t} from "./Tlv_t";
import {inject, injectable} from "inversify";
import {MmInfo} from "../../mm-info/mm-info";
import {PlatformInfo} from "../../platform-info/platform-info";
import {Buffer} from "buffer";

@injectable()
export class Tlv_t525 extends Tlv_t {
    public constructor(
        @inject(PlatformInfo)
        public platformInfo: PlatformInfo,
        @inject(MmInfo)
        public mmInfo: MmInfo,
    ) {
        super();
        this._cmd = 0x525;
    }

    public get_tlv_525(tlv522List: Buffer[]) {
        let body = new Buffer(256);
        let p    = 0;
        body.writeUInt16BE(tlv522List.length, p);
        //tlv数量
        p += 2;
        tlv522List.forEach((tlv522) => {
            tlv522.copy(body, p);
            p += tlv522.length;
        });

        this.fill_head(this._cmd);
        this.fill_body(body, p);
        this.set_length();
        return this.get_buf();
    }

    public serialize(): Buffer {
        return this.get_tlv_525([])
    }
}
