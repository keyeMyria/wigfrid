import {encrypt as teaEncrypt, decrypt as teaDecrypt} from "crypto-tea";

import {Buffer} from "buffer";

export class Cryptor {


    public static encrypt(inBuffer, keyBuffer) {
        return teaEncrypt(inBuffer, keyBuffer);
    }

    public static decrypt(inBuffer, keyBuffer) {
        return teaDecrypt(inBuffer, keyBuffer);
    }

    public static encryptWith(inBuffer: Buffer, start, length, keyBuffer: Buffer) {
        let copyBuf = Buffer.allocUnsafe(length);
        inBuffer.copy(copyBuf, 0, start, start + length);
        return teaEncrypt(copyBuf, keyBuffer);
    }

    public static decryptWith(inBuffer: Buffer, start, length, keyBuffer: Buffer) {
        let copyBuf = Buffer.allocUnsafe(length);
        inBuffer.copy(copyBuf, 0, start, start + length);
        return teaDecrypt(copyBuf, keyBuffer);
    }
}
