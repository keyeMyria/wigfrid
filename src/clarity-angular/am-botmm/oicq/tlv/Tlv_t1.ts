import {Tlv_t} from "./Tlv_t";
import {Buffer} from "buffer";
import {randomBytes} from "crypto";
import {inject, injectable} from "inversify";
import {PlatformInfo} from "../../platform-info/platform-info";
import {MmInfo} from "../../mm-info/mm-info";

@injectable()
export class Tlv_t1 extends Tlv_t {
    /** @var byte[] IP_KEY */
    protected IP_KEY;
    /** @var int _ip_len */
    protected _ip_len;
    /** @var int _ip_pos */
    protected _ip_pos;
    /** @var int _ip_ver */
    protected _ip_ver;
    /** @var int _t1_body_len */
    protected _t1_body_len;

    public constructor(
        @inject(MmInfo)
        private mmInfo: MmInfo,
        @inject(PlatformInfo)
        private platformInfo: PlatformInfo,
    ) {
        super();
        this._ip_len      = 4;
        // this._ip_pos      = 14;
        this._ip_ver      = 1;
        this._t1_body_len = 20;
        this.IP_KEY       = new Buffer(2);
        this._cmd         = 1;
    }

    public verify() {
        if (this._body_len < 20) {
            return false;
        }
        return true;
    }

    public get_uin(): number {
        return this._buf.readUInt32BE(this._head_len + 2 + 4);
    }

    public get_ip(): Buffer {
        return this._buf.slice(this._head_len + 2 + 4 + 4 + 4, this._head_len + 2 + 4 + 4 + 4 + this._ip_len);
    }

    /**
     * @param uin32
     * @param client_ip
     * @return byte[]
     */
    public get_tlv_1(uin32: number, client_ip) {
        let body = new Buffer(this._t1_body_len);
        let p    = 0;
        body.writeUInt16BE(this._ip_ver, p);
        p += 2;
        body.fill(randomBytes(4), p, p + 4);//random bytes
        p += 4;
        body.writeUInt32BE(uin32, p);
        p += 4;
        body.writeUInt32BE(Math.round(new Date().getTime() / 1000), p);
        p += 4;
        body.fill(client_ip, p, p + 4);
        //4bytes
        p += 4;
        body.writeUInt16BE(0, p);
        p += 2;
        this.fill_head(this._cmd);
        this.fill_body(body, p);
        this.set_length();
        return this.get_buf();
    }

    public serialize() {
        return this.get_tlv_1(this.mmInfo.uin32, this.platformInfo.network.clientIp);
    }

    /**
     * must run unserialize after get_tlv
     * @returns {Tlv_t1}
     */
    public unserialize() {
        this.mmInfo.uin32                  = this.get_uin();
        this.platformInfo.network.clientIp = this.get_ip();
        return this;
    }

}
