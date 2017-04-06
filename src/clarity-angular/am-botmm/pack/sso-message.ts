import {SmartBuffer} from "smart-buffer";
import {Cryptor} from "../oicq/crypt/Cryptor";
import {MmInfo} from "../mm-info/mm-info";
import {inject, injectable} from "inversify";
import {PlatformInfo} from "../platform-info/platform-info";
import {Buffer} from "buffer";
// import {PlatformInfo} from "../platform-info/platform-info";
@injectable()
export class SsoMessage {

    public constructor(
        @inject(PlatformInfo)
        private platformInfo: PlatformInfo,
        @inject(MmInfo)
        private mmInfo: MmInfo
    ) {

    }


    public send(serviceCmd: string, cookies: Buffer, extBin: Buffer, wupBuffer: Buffer,) {

        this.platformInfo.fixRuntime.increaseRequestId();

        return this.pack(
            this.platformInfo.fixRuntime.requestId,
            this.platformInfo.android.imei,
            this.platformInfo.fixRuntime.ksid,
            this.platformInfo.apk.version,
            Buffer.from(serviceCmd),
            cookies,
            0x20029f53,// this.platformInfo.fixRuntime.wxAppId,
            0x20029f53,// this.platformInfo.fixRuntime.wxAppId,
            this.mmInfo.mm,
            extBin,
            wupBuffer
        );
    }

    /**
     *
     * @param ssoSequenceId
     * @param imei
     * @param ksid
     * @param version BaseApplication.getContext().getAssets().open("revision.txt").read(bArr, 0, 64);
     * @param serviceCmd
     * @param msgCookie
     * @param appId
     * @param msfAppId
     * @param mm
     * @param extBin
     * @param wupBuffer
     */
    public pack(ssoSequenceId: number, imei: Buffer, ksid: Buffer, version: Buffer, serviceCmd: Buffer, msgCookie: Buffer, appId, msfAppId, mm: string, extBin: Buffer, wupBuffer: Buffer) {
        let encrypted = this._pack(ssoSequenceId, imei, ksid, version, serviceCmd, msgCookie, appId, msfAppId, extBin, wupBuffer);
        let pack      = new SmartBuffer();
        pack.writeUInt32BE(4 + 10 + 4 + mm.length + encrypted.length);
        pack.writeString("0000000A020000000400", "hex");
        //stream.writeHex("00 00 00 0B 02 00 00 82 97 00"); //sendSsoMsgSimple
        pack.writeUInt32BE(mm.length + 4);
        pack.writeString(mm);
        pack.writeBuffer(encrypted);
        return pack.toBuffer();
    }

    public _pack(ssoSequenceId: number, imei: Buffer, ksid: Buffer, version: Buffer, serviceCmd: Buffer, msgCookie: Buffer, appId, msfAppId, extBin, wupBuffer) {
        // msgCookie = Hex::HexStringToBin("B6 CC 78 FC");

        let pack = new SmartBuffer();
        pack.writeUInt32BE(
            4 + //self
            4 + 4 + 4 + 12 +
            4 + extBin.length +
            4 + serviceCmd.length +
            4 + msgCookie.length +
            4 + imei.length +
            4 + ksid.length +
            2 + version.length +
            4
        );
        pack.writeUInt32BE(ssoSequenceId);
        pack.writeUInt32BE(appId);
        pack.writeUInt32BE(msfAppId);
        //new 71 00 00 00 00 00 00 00 00 00 00 00
        pack.writeString("010000000000000000000000", "hex");
        pack.writeUInt32BE(extBin.length + 4);
        pack.writeBuffer(extBin);
        pack.writeUInt32BE(serviceCmd.length + 4);
        pack.writeBuffer(serviceCmd);
        pack.writeUInt32BE(msgCookie.length + 4);
        pack.writeBuffer(msgCookie);
        pack.writeUInt32BE(imei.length + 4);
        pack.writeBuffer(imei);
        pack.writeUInt32BE(ksid.length + 4);
        pack.writeBuffer(ksid);
        pack.writeUInt16BE(version.length + 2);
        pack.writeBuffer(version);
        pack.writeUInt32BE(0 + 4);
        //pack.write();

        pack.writeUInt32BE(wupBuffer.length + 4);
        pack.writeBuffer(wupBuffer);

        return Cryptor.encrypt(pack.toBuffer(), this.mmInfo.key);
    }

}
