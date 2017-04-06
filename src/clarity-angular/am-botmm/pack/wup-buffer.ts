import {SmartBuffer} from "smart-buffer";
import {PlatformInfo} from "../platform-info/platform-info";
import {MmInfo} from "../mm-info/mm-info";
import {inject, injectable} from "inversify";
import {Buffer} from "buffer";

@injectable()
export class WupBuffer {

    public static subcmd = 0;

    constructor(
        @inject(PlatformInfo)
        public platformInfo: PlatformInfo,
        @inject(MmInfo)
        public mmInfo: MmInfo
    ) {

    }


    public packWithDefaultKey(cmd: number, encrypted: Buffer, isSecond: boolean) {
        return this.pack(
            cmd,
            encrypted,
            this.mmInfo.randKey,
            this.mmInfo.pubKey,
            isSecond
        )
    }

    public pack(cmd: number, encrypted: Buffer, randKey: Buffer, pubKey: Buffer, isSecond: boolean) {

        let finalBuffer = new SmartBuffer();
        //step01
        finalBuffer.writeUInt8(0x02);
        //step02
        let pack = this._pack(cmd, encrypted, randKey, pubKey, isSecond);
        finalBuffer.writeUInt16BE(pack.length + 4); //27+2+body_len
        //step03
        finalBuffer.writeBuffer(pack);

        finalBuffer.writeUInt8(0x03);

        return finalBuffer.toBuffer();
    }

    private _pack(cmd: number, encrypted: Buffer, randKey: Buffer, pubKey: Buffer, isSecond: boolean) {
        let pack = new SmartBuffer();
        //step03
        pack.writeUInt16BE(this.platformInfo.fixRuntime.pcVer);
        //step04
        pack.writeUInt16BE(cmd);
        //step05
        pack.writeUInt16BE(++WupBuffer.subcmd);//sequence
        //step06
        pack.writeUInt32BE(this.mmInfo.uin32);

        pack.writeUInt8(0x03);
        pack.writeUInt8(0x87);//4.5=0x00; 4.7=0x07; 6.6.9=0x87或0x45
        pack.writeUInt8(0x00);//retry
        pack.writeUInt32BE(0x00000002);//type
        pack.writeUInt32BE(0x00000000);//no
        pack.writeUInt32BE(0x00000000);//instance

        if (!isSecond) {
            pack.writeString("0101", null, "hex");
            pack.writeBuffer(randKey);
            pack.writeString("0102", null, "hex");
            pack.writeUInt16BE(pubKey.length);
            pack.writeBuffer(pubKey);
        } else {
            pack.writeString("0102", null, "hex");
            pack.writeBuffer(randKey);
            pack.writeString("0102", null, "hex");
            pack.writeUInt16BE(0);
        }

        pack.writeBuffer(encrypted);
        return pack.toBuffer();
    }
}
