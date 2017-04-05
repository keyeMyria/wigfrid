import {Buffer} from "buffer";
import {Tlv_t} from "./Tlv_t";
import {inject, injectable} from "inversify";
import {PlatformInfo} from "../../platform-info/platform-info";
@injectable()
export class Tlv_t8 extends Tlv_t {
    public constructor(@inject(PlatformInfo)
                       private platformInfo: PlatformInfo) {
        super();
        this._cmd = 8;
    }

    public get_tlv_8(paramInt1: number, _local_id: number, paramInt3: number) {
        let body = Buffer.alloc(8);
        let p    = 0;
        body.writeUInt16BE(paramInt1, 0);
        p += 2;
        body.writeUInt32BE(_local_id, p);
        p += 4;
        body.writeUInt16BE(paramInt3, p);
        p += 2;
        this.fill_head(this._cmd);
        this.fill_body(body, 8);
        this.set_length();
        return this.get_buf();
    }

    public serialize() {
        return this.get_tlv_8(0, this.platformInfo.fixRuntime.local_id, 0);
    }

    public unserialize() {
        this._buf.readInt16BE(this._head_len);
        this.platformInfo.fixRuntime.local_id = this._buf.readInt32BE(this._head_len + 2);
        this._buf.readInt16BE(this._head_len + 2 + 4);
        return this;
    }
}
