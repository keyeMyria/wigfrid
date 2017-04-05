import {Buffer} from "buffer";
import {Tlv_t} from "./Tlv_t";
import {injectable} from "inversify";

@injectable()
export class Tlv_t107 extends Tlv_t {
    /** @var int _t107_body_len; */
    protected _t107_body_len;

    public constructor() {
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
        body.writeInt16BE(pic_type, p);
        p += 2;
        body.writeInt8(cap_type, p);
        p++;
        body.writeInt16BE(pic_size, p);
        p += 2;
        body.writeInt8(ret_type, p);
        p++;
        this.fill_head(this._cmd);
        this.fill_body(body, this._t107_body_len);
        this.set_length();
        return this.get_buf();
    }
}
