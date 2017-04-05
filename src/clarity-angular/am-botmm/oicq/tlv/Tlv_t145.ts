import {Tlv_t} from "./Tlv_t";
import {injectable} from "inversify";

@injectable()
export class Tlv_t145 extends Tlv_t {
    public _t145_body_len;

    public constructor() {
        super();
        this._t145_body_len = 0;
        this._cmd           = 325;
    }

    public get_tlv_145(guid: Buffer) {
        let in_len   = 0;
        let guid_len = guid.length;
        if (guid != null) {
            in_len = 0 + guid_len;
        }
        let body = new Buffer(in_len);
        if (in_len > 0) {
            guid.copy(body);
        }
        this._t145_body_len = in_len;
        this.fill_head(this._cmd);
        this.fill_body(body, in_len);
        this.set_length();
        return this.get_buf();
    }
}
