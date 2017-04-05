import * as xxtea from "xxtea";

import {Buffer} from "buffer";

export class Cryptor {


    public static encrypt(inBuffer, keyBuffer) {
        let outBuffer = xxtea.encrypt(inBuffer, keyBuffer);
        return Buffer.from(outBuffer);
    }

    public static decrypt(inBuffer, keyBuffer) {
        let outBuffer = xxtea.decrypt(inBuffer, keyBuffer);
        return Buffer.from(outBuffer);
    }

    public static encryptWith(inBuffer: Buffer, start, length, keyBuffer: Buffer) {
        let copyBuf = Buffer.allocUnsafe(length);
        inBuffer.copy(copyBuf, 0, start, start + length);
        let outBuffer = xxtea.encrypt(copyBuf, keyBuffer);

        return Buffer.from(outBuffer);
    }

    public static decryptWith(inBuffer: Buffer, start, length, keyBuffer: Buffer) {
        let copyBuf = Buffer.allocUnsafe(length);
        inBuffer.copy(copyBuf, 0, start, start + length);
        let outBuffer = xxtea.decrypt(copyBuf, keyBuffer);

        return Buffer.from(outBuffer);
    }
}
