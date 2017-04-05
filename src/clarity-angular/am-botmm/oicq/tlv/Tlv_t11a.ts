import {Buffer} from "buffer";
import {Tlv_t} from "./Tlv_t";
import {SmartBuffer} from "smart-buffer";
import {injectable} from "inversify";

@injectable()
export class Tlv_t11a extends Tlv_t {
    public _nick_len;

    public constructor(public face?: Buffer,
                       public age?: Buffer,
                       public gander?: Buffer,
                       public nick?: Buffer) {
        super();
        this._nick_len = 0;
        this._cmd      = 0x11a;
    }

    public verify(): boolean {
        if (this._body_len < 5) {
            return false;
        }
        let l = this._buf.readInt8(this._head_len + 2 + 1 + 1);
        if (this._body_len < l + 5) {
            return false;
        }
        this._nick_len = l;
        return true;
    }

    public get_face() {
        let buf = Buffer.alloc(2);
        this._buf.copy(buf, 0, this._head_len, this._head_len + 2);
        return buf;
    }

    public get_age() {
        let buf = Buffer.alloc(1);
        this._buf.copy(buf, 0, this._head_len + 2, this._head_len + 2 + 1);
        return buf;
    }

    public get_gander() {
        let buf = Buffer.alloc(1);
        this._buf.copy(buf, 0, this._head_len + 2 + 1, this._head_len + 2 + 1 + 1);
        return buf;
    }

    public get_nick() {
        let buf = Buffer.alloc(this._nick_len);
        this._buf.copy(buf, 0, this._head_len + 2 + 1 + 1 + 1, this._head_len + 2 + 1 + 1 + 1 + this._nick_len);
        return buf;
    }

    get_tlv_t11a(face, age, gander, nick) {
        let pack = new SmartBuffer();
        pack.writeBuffer(face, 2);
        pack.writeBuffer(age, 1);
        pack.writeBuffer(gander, 1);
        pack.writeInt8(nick.length);
        pack.writeBuffer(nick);

        let body = pack.toBuffer();
        this.fill_head(this._cmd);
        this.fill_body(body, body.length);
        this.set_length();
        return this.get_buf();
    }

    public unserialize() {
        this.face   = this.get_face();
        this.age    = this.get_age();
        this.gander = this.get_gander();
        this.nick   = this.get_nick();
    }
}
