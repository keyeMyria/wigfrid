import {Buffer} from "buffer";
import {Tlv_t} from "./Tlv_t";
class Tlv_t16e extends Tlv_t {
    protected _t16e_body_len;

    public constructor() {
        super();
        this._t16e_body_len = 0;
        this._cmd           = 366;
    }

    /**
     * @param device
     * @return mixed
     */
    public get_tlv_16e(device: Buffer) {
        let i = 64;
        if (device == null) {
            device = Buffer.alloc(64)
        }
        if (device.length < i) {
            i = device.length;
        }
        this._t16e_body_len = i;
        let body            = new Buffer(this._t16e_body_len);
        device.copy(body);
        this.fill_head(this._cmd);
        this.fill_body(body, this._t16e_body_len);
        this.set_length();
        return this.get_buf();
    }
}
