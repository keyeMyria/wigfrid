import {Tlv_t} from "./Tlv_t";
import {injectable} from "inversify";

@injectable()
export class Tlv_t109 extends Tlv_t {
    protected _t109_body_len;

    public constructor() {
        super();
        this._t109_body_len = 0;
        this._cmd           = 265;
    }

    public  get_tlv_109(IMEI: Buffer) {
        this._t109_body_len = IMEI.length;
        let body            = new Buffer(this._t109_body_len);
        IMEI.copy(body);
        this.fill_head(this._cmd);
        this.fill_body(body, this._t109_body_len);
        this.set_length();
        return this.get_buf();
    }
}
