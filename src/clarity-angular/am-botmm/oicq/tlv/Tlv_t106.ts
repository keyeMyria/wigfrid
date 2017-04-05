import {Tlv_t} from "./Tlv_t";

import {randomBytes, createHash} from "crypto";
import {Cryptor} from "../crypt/Cryptor";
import {SmartBuffer} from "smart-buffer"
import {PlatformInfo} from "../../platform-info/platform-info";
import {inject, injectable} from "inversify";
import {MmInfo} from "../../mm-info/mm-info";
import {Buffer} from "buffer";

const SSO_VERSION = 5;
const TGTGTVer    = 4;

@injectable()
export class Tlv_t106 extends Tlv_t {
    protected _SSoVer   = SSO_VERSION;
    protected _TGTGTVer = TGTGTVer;
    protected _t106_body_len;

    public constructor(
        @inject(PlatformInfo)
        public platformInfo: PlatformInfo,
        @inject(MmInfo)
        public mmInfo: MmInfo,
        // public appid?: number,
        // public subAppId?: number,
        // public client_ver?: number,
        // public uin?: Buffer,
        // public init_time?: number,
        // public client_ip?,
        // public seve_pwd?: number,
        // public md5?: Buffer,
        // public TGTGT?: Buffer,
        // public readflg?,
        // public guid?: Buffer
    ) {
        super();
        this._cmd      = 262;
        this._SSoVer   = SSO_VERSION;
        this._TGTGTVer = TGTGTVer;
        if (this._SSoVer <= 2 && this._TGTGTVer == 1) {
            this._t106_body_len = 69;
        } else if (this._SSoVer == 3 && this._TGTGTVer == 2) {
            this._t106_body_len = 90;
        } else if (this._SSoVer == 5 && this._TGTGTVer == 3) {
            this._t106_body_len = 98 + 2;
            // 98 + 2 + n;
        } else if (this._SSoVer == 5 && this._TGTGTVer == 4) {
            this._t106_body_len = 98 + 2 + 15;
            // 98 + 2 + n; 多加一点
        }
    }

    /**
     * @return mixed
     * @param appid
     * @param subAppId
     * @param client_ver
     * @param uin
     * @param init_time
     * @param client_ip
     * @param seve_pwd
     * @param md5
     * @param TGTGT
     * @param readflg
     * @param guid
     */
    public get_tlv_106(appid: number, subAppId: number, client_ver: number, uin: Buffer, init_time: number, client_ip, seve_pwd: number, md5: Buffer, TGTGT: Buffer, readflg, guid: Buffer) {
        if (SSO_VERSION <= 2) {
            return this._getSSOV2(appid, subAppId, client_ver, uin, init_time, client_ip, seve_pwd, md5, TGTGT, readflg, guid);
        } else if (this._SSoVer == 3) {
            return this._getSSOV3(appid, subAppId, client_ver, uin, init_time, client_ip, seve_pwd, md5, TGTGT, readflg, guid);
        } else if (this._SSoVer == 5) {
            return this._getSSOV5(appid, subAppId, client_ver, uin, init_time, client_ip, seve_pwd, md5, TGTGT, readflg, guid);
        }
    }

    private _getSSOV2(appid: number, subAppId: number, client_ver: number, uin: Buffer, init_time: number, client_ip, seve_pwd: number, md5: Buffer, TGTGT, readflg, guid) {
        let body = new Buffer(this._t106_body_len);
        let p    = 0;
        body.writeUInt16BE(this._TGTGTVer, p);
        p += 2;
        body.fill(randomBytes(4), p, 4);
        p += 4;
        body.writeUInt32BE(this._SSoVer, p);
        p += 4;
        body.writeUInt32BE(appid, p);
        p += 4;
        body.writeUInt32BE(client_ver, p);
        p += 4;
        body.fill(uin, p);
        p += 8;
        body.writeUInt32BE(init_time, p);
        p += 4;
        body.fill(client_ip, p, 4);
        p += 4;
        body.writeUInt8(seve_pwd, p);
        p++;
        body.fill(md5, p, 16);
        p += 16;
        body.write(TGTGT, p, 16);
        p += 16;
        let s2 = new Buffer(24);
        s2.fill(md5, 0);
        s2.fill(uin, 16);

        body                = Cryptor.encryptWith(body, 0, p, createHash("md5").update(s2).digest());
        this._t106_body_len = body.length;
        this.fill_head(this._cmd);
        this.fill_body(body, this._t106_body_len);
        this.set_length();
        return this.get_buf();
    }

    private _getSSOV3(appid: number, subAppId: number, client_ver: number, uin: Buffer, init_time: number, client_ip: number, seve_pwd: number, md5: Buffer, TGTGT: Buffer, readflg: number, guid: Buffer) {
        let body = new Buffer(this._t106_body_len);
        let p    = 0;
        body.writeUInt16BE(this._TGTGTVer, p);
        p += 2;
        body.fill(randomBytes(4), p, 4);
        p += 4;
        body.writeUInt32BE(this._SSoVer, p);
        p += 4;
        body.writeUInt32BE(appid, p);
        p += 4;
        body.writeUInt32BE(client_ver, p);
        p += 4;
        body.fill(uin, p, 8);
        p += 8;
        body.writeUInt32BE(init_time, p);
        p += 4;
        body.fill(client_ip, p, 4);
        p += 4;
        body.writeUInt8(seve_pwd, p);
        p++;
        body.fill(md5, p, 16);
        p += 16;
        body.fill(TGTGT, p, 16);
        p += 16;
        body.writeUInt32BE(0, p);
        p += 4;
        body.writeUInt8(readflg, p);
        p++;
        if (guid == null || guid.length <= 0) {
            guid = new Buffer(16);
            guid.fill(randomBytes(16), 0, 16);
        }
        body.fill(guid, p, 16);
        p += 16;
        let s2 = new Buffer(24);
        s2.fill(md5, 0);
        s2.fill(uin, 16);

        body                = Cryptor.encryptWith(body, 0, p, createHash("md5").update(s2).digest());
        this._t106_body_len = body.length;
        this.fill_head(this._cmd);
        this.fill_body(body, this._t106_body_len);
        this.set_length();
        return this.get_buf();
    }

    /**
     * <p>
     * 00 03
     * 18 76 f8 51
     * 00 00 00 05
     * 00 00 00 00
     * 00 00 00 00
     * 00 00 00 00 00 2b c0 65
     * 31 34 38 35
     * 30 00 00 00
     * 01
     * 1e 1b 28 d6 9e bb 95 fd 04 06 24 bc e5 2b 68 3c
     * 37 74 bc b1 35 5c 65 d4 1a fd 0b 14 20 62 7d 7e
     * 00 00 00 00
     * 01
     * 46 60 1e d3 c6 24 16 bf ca a2 9e 9e b8 9a d2 4e
     * 00 00 00 00
     * 00 00 00 01
     * 00 00
     * </p>
     *
     * @param appid
     * @param subAppId
     * @param client_ver
     * @param uin
     * @param init_time
     * @param client_ip
     * @param seve_pwd
     * @param md5
     * @param TGTGT
     * @param readflg
     * @param guid
     * @return mixed
     */
    private _getSSOV5(appid: number, subAppId: number, client_ver: number, uin: Buffer, init_time: number, client_ip: Buffer, seve_pwd: number, md5: Buffer, TGTGT: Buffer, readflg: number, guid: Buffer) {
        let userAccount = this.mmInfo.mm;
        let body        = Buffer.alloc(512);
        let p           = 0;
        body.writeUInt16BE(this._TGTGTVer, p);
        p += 2;
        // can be 4
        body.fill(randomBytes(4), p, 4);
        p += 4;
        body.writeUInt32BE(this._SSoVer, p);
        p += 4;
        body.writeUInt32BE(appid, p);
        p += 4;
        body.writeUInt32BE(client_ver, p);
        p += 4;
        uin.copy(body, p, 0, 8);
        p += 8;
        body.writeUInt32BE(init_time, p);
        p += 4;
        client_ip.copy(body, p, 0, 4);
        p += 4;
        body.writeUInt8(seve_pwd, p);
        p += 1;
        md5.copy(body, p, 0, 16);
        p += 16;
        TGTGT.copy(body, p, 0, 16);
        p += 16;
        body.writeUInt32BE(0, p);
        p += 4;
        body.writeUInt8(readflg, p);
        p += 1;
        if (guid == null || guid.length <= 0) {
            guid = new Buffer(16);
            guid.fill(randomBytes(16), 0, 16);
        }
        body.fill(guid, p, 16);
        p += 16;
        // sso 5
        body.writeUInt32BE(subAppId, p);
        p += 4;
        body.writeUInt32BE(1, p);
        p += 4;
        // 1
        body.writeUInt16BE(userAccount.length, p);
        p += 2;
        // uin长度
        body.fill(userAccount, p, 8);
        p += 8;
        body.writeUInt16BE(0, p);
        p += 2;
        // imei length
        // $body->write($imei);//imei
        // end sso 5
        let s2 = new Buffer(24);
        md5.copy(s2, 0, 0, 16);
        uin.copy(s2, 16, 0, 8);
        let encryptedBody   = Cryptor.encryptWith(body, 0, p, createHash("md5").update(s2).digest());
        this._t106_body_len = encryptedBody.length;
        this.fill_head(this._cmd);
        this.fill_body(encryptedBody, this._t106_body_len);
        this.set_length();
        return this.get_buf();
    }

    public serialize() {
        return this.get_tlv_106(
            this.platformInfo.fixRuntime.appid,
            this.platformInfo.fixRuntime.subAppId,
            this.platformInfo.fixRuntime.clientVersion,
            this.mmInfo.uin,
            Math.round(new Date().getTime() / 1000),
            this.platformInfo.fixRuntime.clientIp,
            this.platformInfo.fixRuntime.sevePwd,
            this.mmInfo.md5,
            this.mmInfo.TGTGT,
            this.platformInfo.fixRuntime.readflg,
            this.platformInfo.android.android_device_mac_hash,
        )
    }

    /**
     * only support last version
     */
    public unserialize(key) {
        let encrypted   = this._buf.slice(this._head_len, this._head_len + this._body_len);
        let decrypted   = Cryptor.decrypt(encrypted, key);
        let smartBuffer = SmartBuffer.fromBuffer(decrypted);

        smartBuffer.readInt16BE();
        smartBuffer.readInt32BE();
        this._SSoVer                               = smartBuffer.readInt32BE();
        this.platformInfo.fixRuntime.appid         = smartBuffer.readInt32BE();
        this.platformInfo.fixRuntime.clientVersion = smartBuffer.readInt32BE();
        this.mmInfo.uin                            = smartBuffer.readBuffer(8);
        smartBuffer.readInt32BE();
        this.platformInfo.fixRuntime.clientIp = smartBuffer.readBuffer(4);
        smartBuffer.readInt8();
        this.mmInfo.md5   = smartBuffer.readBuffer(16);
        this.mmInfo.TGTGT = smartBuffer.readBuffer(16);
        smartBuffer.readInt32BE();
        this.platformInfo.fixRuntime.readflg  = smartBuffer.readInt8();
        let guid                              = smartBuffer.readBuffer(16);
        this.platformInfo.fixRuntime.subAppId = smartBuffer.readInt32BE();

        console.assert(smartBuffer.readInt32BE() == 1, 'should equal 1');
        smartBuffer.readBuffer(smartBuffer.readInt16BE());
        smartBuffer.readInt16BE();
    }
}
