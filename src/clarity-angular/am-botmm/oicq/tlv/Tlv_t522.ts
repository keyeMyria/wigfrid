import {Tlv_t} from "./Tlv_t";
import {injectable} from "inversify";
import {Buffer} from "buffer";

@injectable()
export class Tlv_t522 extends Tlv_t {
    public constructor() {
        super();
        this._cmd = 0x522;
    }

    /**
     * @param $list
     * @return mixed
     */
    public get_tlv_522(list) {
        let extra = this.getExtraData(list);

        let body = Buffer.alloc(256);
        let p    = 0;
        body.writeUInt8(1, 0);
        p++;
        body.writeUInt8(extra[0], p);
        p++;
        //最多(20*3=60=0x3c)
        extra[1].copy(body, p, 0, extra[0]);
        p += extra[0];
        this.fill_head(this._cmd);
        this.fill_body(body, p);
        this.set_length();
        return this.get_buf();
    }

    private getExtraData(list): [number, Buffer] {
        let len    = 0;
        let buffer = new Buffer(256);
        let index  = 0;
        for (let loginExtraData of list) {
            if (++index > 3) {
                break;
            }
            buffer.write(loginExtraData['mUin'], 0, 8);
            buffer.writeUInt32BE(loginExtraData['mIp'], 8);
            buffer.writeUInt32BE(loginExtraData['mTime'], 12);
            buffer.writeUInt32BE(loginExtraData['mVersion'], 16);
            len += 20;
        }
        return [len, buffer];
    }

    public serialize(): Buffer {
        return this.get_tlv_522(
            []
        )
    }
}
