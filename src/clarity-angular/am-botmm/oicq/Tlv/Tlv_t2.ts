import {Buffer} from "buffer";
import {Tlv_t} from "./Tlv_t";
export class Tlv_t2 extends Tlv_t {
    /** @var int _sigVer */
    protected _sigVer;
    /** @var int _t2_body_len */
    protected _t2_body_len;

    public constructor() {
        super();
        this._t2_body_len = 0;
        this._sigVer      = 0;
        this._cmd         = 2;
    }

    /**
     * $param byte[] $key
     * @return byte[]
     * @param code
     * @param key
     */
    public  get_tlv_2(code: Buffer, key: Buffer) {
        this._t2_body_len = code.length + 6 + key.length;
        let body          = new Buffer(this._t2_body_len);
        let p             = 0;
        body.writeInt16BE(this._sigVer, p);
        p += 2;
        body.writeInt16BE(code.length, p);
        p += 2;
        code.copy(body, p);
        p += code.length;
        body.writeInt16BE(key.length, p);
        p += 2;
        key.copy(body, p);
        p += key.length;
        this.fill_head(this._cmd);
        this.fill_body(body, this._t2_body_len);
        this.set_length();
        return this.get_buf();
    }
}
