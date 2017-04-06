import {SmartBuffer} from "smart-buffer";
import {
    Tlv_t1,
    Tlv_t100,
    Tlv_t106,
    Tlv_t107,
    Tlv_t108,
    Tlv_t116,
    Tlv_t141,
    Tlv_t142,
    Tlv_t144,
    Tlv_t145,
    Tlv_t147,
    Tlv_t154,
    Tlv_t172,
    Tlv_t177,
    Tlv_t18,
    Tlv_t187,
    Tlv_t188,
    Tlv_t191,
    Tlv_t194,
    Tlv_t202,
    Tlv_t511,
    Tlv_t516,
    Tlv_t521,
    Tlv_t525,
    Tlv_t8
} from "../oicq/index";
import {MmInfo} from "../mm-info/mm-info";
import {Cryptor} from "../oicq/crypt/Cryptor";
import {injectable} from "inversify";

@injectable()
export class LoginPack {

    public rollbackSig;

    public constructor(
        public tlv18: Tlv_t18,
        public tlv1: Tlv_t1,
        public tlv106: Tlv_t106,
        public tlv116: Tlv_t116,
        public tlv100: Tlv_t100,
        public tlv107: Tlv_t107,
        public tlv108: Tlv_t108,
        public tlv142: Tlv_t142,
        public tlv144: Tlv_t144,
        public tlv145: Tlv_t145,
        public tlv147: Tlv_t147,
        public tlv154: Tlv_t154,
        public tlv141: Tlv_t141,
        public tlv8: Tlv_t8,
        public tlv511: Tlv_t511,
        public tlv172: Tlv_t172,
        public tlv187: Tlv_t187,
        public tlv188: Tlv_t188,
        public tlv194: Tlv_t194,
        public tlv191: Tlv_t191,
        public tlv202: Tlv_t202,
        public tlv177: Tlv_t177,
        public tlv516: Tlv_t516,
        public tlv521: Tlv_t521,
        public tlv525: Tlv_t525,
        public mm: MmInfo
    ) {

    }

    public pack() {
        let loginBuffer = new SmartBuffer();

        loginBuffer.writeString("0009", "hex");
        if (this.rollbackSig) {
            loginBuffer.writeUInt16BE(0x19);//tlv num
        } else {
            loginBuffer.writeUInt16BE(0x18);//tlv num
        }
        // loginBuffer.writeBuffer(this.tlv18);
        loginBuffer.writeBuffer(this.tlv18.serialize());
        loginBuffer.writeBuffer(this.tlv1.serialize());
        loginBuffer.writeBuffer(this.tlv106.serialize());
        loginBuffer.writeBuffer(this.tlv116.serialize());
        loginBuffer.writeBuffer(this.tlv100.serialize());
        loginBuffer.writeBuffer(this.tlv107.serialize());
        loginBuffer.writeBuffer(this.tlv108.serialize());
        loginBuffer.writeBuffer(this.tlv142.serialize());
        loginBuffer.writeBuffer(this.tlv144.serialize());
        loginBuffer.writeBuffer(this.tlv145.serialize());
        loginBuffer.writeBuffer(this.tlv147.serialize());
        loginBuffer.writeBuffer(this.tlv154.serialize());
        loginBuffer.writeBuffer(this.tlv141.serialize());
        loginBuffer.writeBuffer(this.tlv8.serialize());
        loginBuffer.writeBuffer(this.tlv511.serialize());
        if (this.rollbackSig) {
            loginBuffer.writeBuffer(this.tlv172.serialize());
        }
        loginBuffer.writeBuffer(this.tlv187.serialize());
        loginBuffer.writeBuffer(this.tlv188.serialize());
        loginBuffer.writeBuffer(this.tlv194.serialize());
        loginBuffer.writeBuffer(this.tlv191.serialize());
        loginBuffer.writeBuffer(this.tlv202.serialize());
        loginBuffer.writeBuffer(this.tlv177.serialize());
        loginBuffer.writeBuffer(this.tlv516.serialize());
        loginBuffer.writeBuffer(this.tlv521.serialize());
        loginBuffer.writeBuffer(this.tlv525.serialize());

        let encrypted = null;
        if (!this.rollbackSig) {
            encrypted = Cryptor.encrypt(loginBuffer.toBuffer(), this.mm.shareKey);
        } else {
            encrypted = Cryptor.encrypt(loginBuffer.toBuffer(), this.mm.randKey);
        }

        return encrypted;
    }
}
