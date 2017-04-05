import {Tlv_t} from "./Tlv_t";
import {injectable} from "inversify";

@injectable()
export class Tlv_t128 extends Tlv_t {
    protected _t128_body_len;

    public constructor() {
        super();
        this._t128_body_len = 0;
        this._cmd           = 296;
    }

    /**
     * @param byte[] data
     * @param int    max_len
     * @return int|string
     */
    private limit_len(data: Buffer, max_len) {
        if (data == null) {
            return 0;
        }
        if (data.length > max_len) {
            return max_len;
        }
        return data.length;
    }

    /**
     * @param newins     00
     * @param readguid   01
     * @param guidchg    01|00
     * @param flag       01 00 02 00
     * @param devicetype 设备名
     * @param guid
     * @param deviceName
     * @return
     * @internal param $byte $
     */
    public get_tlv_128(newins: number, readguid: number, guidchg: number, flag: number, devicetype: Buffer, guid: Buffer, deviceName: Buffer) {
        let devicetype_len  = this.limit_len(devicetype, 32);
        let guid_len        = this.limit_len(guid, 16);
        let deviceName_len  = this.limit_len(deviceName, 16);
        this._t128_body_len = devicetype_len + 11 + 2 + guid_len + 2 + deviceName_len;
        let body            = new Buffer(this._t128_body_len);
        let pos             = 0;
        body.writeInt16BE(0, pos);
        pos += 2;
        body.writeInt8(newins, pos);
        pos++;
        body.writeInt8(readguid, pos);
        pos++;
        body.writeInt8(guidchg, pos);
        pos++;
        body.writeInt32BE(flag, pos);
        pos += 4;
        body.writeInt16BE(devicetype_len, pos);
        pos += 2;
        devicetype.copy(body, pos, 0, devicetype_len);
        pos += devicetype_len;
        body.writeInt16BE(guid_len, pos);
        pos += 2;
        guid.copy(body, pos, 0, guid_len);
        pos += guid_len;
        body.writeInt16BE(deviceName_len, pos);
        pos += 2;
        deviceName.copy(body, pos, 0, deviceName_len);
        pos += deviceName_len;
        this.fill_head(this._cmd);
        this.fill_body(body, this._t128_body_len);
        this.set_length();
        return this.get_buf();
    }
}
