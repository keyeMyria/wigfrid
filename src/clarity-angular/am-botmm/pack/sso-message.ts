import {SmartBuffer} from "smart-buffer";
import {Cryptor} from "../oicq/crypt/Cryptor";
import {MmInfo} from "../mm-info/mm-info";
export class SsoMessage {

    public static ssoSequenceId;

    public constructor(public mm: MmInfo) {

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
    public foo(ssoSequenceId, imei, ksid, version, serviceCmd, msgCookie, appId, msfAppId, mm, extBin, wupBuffer) {
        let encrypted = this.bar(ssoSequenceId, imei, ksid, version, serviceCmd, msgCookie, appId, msfAppId, extBin, wupBuffer);
        let pack      = new SmartBuffer();
        pack.writeUInt32BE(4 + 10 + 4 + mm.length + encrypted.length);
        pack.writeString("0000000A020000000400", "hex");
        //stream.writeHex("00 00 00 0B 02 00 00 82 97 00"); //sendSsoMsgSimple
        pack.writeUInt32BE(mm.length + 4);
        pack.writeString(mm);
        pack.writeBuffer(encrypted);
    }

    public bar(ssoSequenceId, imei: Buffer, ksid, version, serviceCmd: Buffer, msgCookie: Buffer, appId, msfAppId, extBin, wupBuffer) {
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
        pack.writeString("010000000000000000000000");
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

        let encrypted = Cryptor.encrypt(pack.toBuffer(), this.mm.key);
        return encrypted;
    }

    public buz() {

    }
}
