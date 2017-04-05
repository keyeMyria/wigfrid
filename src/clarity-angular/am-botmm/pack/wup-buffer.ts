import {SmartBuffer} from "smart-buffer";
import {PlatformInfo} from "../platform-info/platform-info";
import {MmInfo} from "../mm-info/mm-info";
export class WupBuffer {

    public static subcmd = 0;

    constructor(public platformInfo: PlatformInfo,
                public mm: MmInfo) {

    }

    public bar(cmd: number, encrypted: Buffer, randKey: Buffer, pubKey: Buffer, isSecond: boolean) {

        let finalBuffer = new SmartBuffer();
        //step01
        finalBuffer.writeInt8(0x02);
        //step02
        let pack = this.foo(cmd, encrypted, randKey, pubKey, isSecond);
        finalBuffer.writeInt16BE(pack.length + 4); //27+2+body_len
        //step03
        finalBuffer.writeBuffer(pack);

        finalBuffer.writeInt8(0x03);

        return finalBuffer.toBuffer();
    }

    public foo(cmd: number, encrypted: Buffer, randKey: Buffer, pubKey: Buffer, isSecond: boolean) {
        let pack = new SmartBuffer();
        //step03
        pack.writeInt16BE(this.platformInfo.fixRuntime.pcVer);
        //step04
        pack.writeInt16BE(cmd);
        //step05
        pack.writeInt16BE(++WupBuffer.subcmd);//sequence
        //step06
        pack.writeBuffer(this.mm.uin);

        pack.writeInt8(0x03);
        pack.writeInt8(0x87);//4.5=0x00; 4.7=0x07; 6.6.9=0x87或0x45
        pack.writeInt8(0x00);//retry
        pack.writeInt32BE(0x00000002);//type
        pack.writeInt32BE(0x00000000);//no
        pack.writeInt32BE(0x00000000);//instance

        if (!isSecond) {
            pack.writeString("0101", null, "hex");
            pack.writeBuffer(randKey);
            pack.writeString("0102", null, "hex");
            pack.writeInt16BE(pubKey.length);
            pack.writeBuffer(pubKey);
        } else {
            pack.writeString("0102", null, "hex");
            pack.writeBuffer(randKey);
            pack.writeString("0102", null, "hex");
            pack.writeInt16BE(0);
        }

        pack.writeBuffer(encrypted);
        return pack.toBuffer();
    }
}
