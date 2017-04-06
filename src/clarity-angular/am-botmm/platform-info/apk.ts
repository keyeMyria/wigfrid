import {Buffer} from "buffer";
import {injectable} from "inversify";
@injectable()
export class Apk {
    public version: Buffer;
    public apk_version: Buffer;
    public sign: Buffer;
    public apkId: Buffer;

    public constructor() {
        this.version     = Buffer.from("|460071609915509|A6.6.9.257295");
        this.apkId       = Buffer.from("com.tencent.mobileqq");
        this.apk_version = Buffer.from("6.6.9");
        this.sign        = Buffer.from("A6B745BF24A2C277527716F6F36EB68D", "hex") //tlv147
    }
}
