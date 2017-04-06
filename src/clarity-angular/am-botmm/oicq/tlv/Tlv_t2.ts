import {Tlv_t} from "./Tlv_t";
import {injectable} from "inversify";
import {Buffer} from "buffer";

@injectable()
export class Tlv_t2 extends Tlv_t {
    /** @var int _sigVer */
    protected _sigVer;
    /** @var int _t2_body_len */
    protected _t2_body_len;

    public constructor(public code?: Buffer, public key?: Buffer) {
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
    public get_tlv_2(code: Buffer, key: Buffer) {
        this._t2_body_len = code.length + 6 + key.length;
        let body          = new Buffer(this._t2_body_len);
        let p             = 0;
        body.writeUInt16BE(this._sigVer, p);
        p += 2;
        body.writeUInt16BE(code.length, p);
        p += 2;
        code.copy(body, p);
        p += code.length;
        body.writeUInt16BE(key.length, p);
        p += 2;
        key.copy(body, p);
        p += key.length;
        this.fill_head(this._cmd);
        this.fill_body(body, this._t2_body_len);
        this.set_length();
        return this.get_buf();
    }


    public serialize(): Buffer {
        return this.get_tlv_2(this.code, this.key);
    }

    public unserialize() {
        let codeLen = this._buf.readInt16BE(this._head_len + 2);
        this.code   = this._buf.slice(this._head_len + 2 + 2, this._head_len + 2 + 2 + codeLen);
        let keyLen  = this._buf.readInt16BE(this._head_len + 2 + 2 + codeLen);
        this.key    = this._buf.slice(this._head_len + 2 + 2 + codeLen + 2, this._head_len + 2 + 2 + codeLen + keyLen);
        return this;
    }
}
