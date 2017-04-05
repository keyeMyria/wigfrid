import {SmartBuffer} from "smart-buffer";
import {Tlv_t18} from "../oicq/tlv/Tlv_t18";
import {Tlv_t1} from "../oicq/tlv/Tlv_t1";
import {Tlv_t106} from "../oicq/tlv/Tlv_t106";
export class LoginPack {

    public rollbackSig;

    public constructor(
        public tlv18: Tlv_t18,
        public tlv1: Tlv_t1,
        public tlv106: Tlv_t106,

    ) {

    }

    public foo() {
        let loginBuffer = new SmartBuffer();

        loginBuffer.writeString("0009", "hex");
        if (this.rollbackSig) {
            loginBuffer.writeInt16BE(0x19);//tlv num
        } else {
            loginBuffer.writeInt16BE(0x18);//tlv num
        }
        // loginBuffer.writeBuffer(this.tlv18);



    }
}
