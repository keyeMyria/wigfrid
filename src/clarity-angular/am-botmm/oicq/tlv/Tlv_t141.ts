import {Tlv_t} from "./Tlv_t";
export class Tlv_t141 extends Tlv_t {
    protected _version;

    public constructor() {
        super();
        this._version = 1;
        this._cmd     = 321;
    }

    /**
     * @param byte[]|string operator_name
     * @param int network_type
     * @param byte[]|string apn
     * @return mixed
     */
    public get_tlv_141(operator_name: Buffer, network_type: number, apn: Buffer) {
        let operator_name_len = operator_name.length;
        let apn_len           = apn.length;
        let _t141_body_len    = operator_name_len + 4 + 2 + 2 + apn_len;
        let body              = new Buffer(_t141_body_len);
        let p                 = 0;
        body.writeInt16BE(this._version, p);
        p += 2;
        body.writeInt16BE(operator_name_len, p);
        p += 2;
        operator_name.copy(body, p, 0, operator_name_len);
        p += operator_name_len;
        body.writeInt16BE(network_type, p);
        p += 2;
        body.writeInt16BE(apn_len, p);
        p += 2;
        apn.copy(body, p, 0, apn_len);
        p += apn_len;
        this.fill_head(this._cmd);
        this.fill_body(body, p);
        this.set_length();
        return this.get_buf();
    }
}
