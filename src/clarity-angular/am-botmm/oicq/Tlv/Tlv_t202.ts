import {Tlv_t} from "./Tlv_t";
class Tlv_t202 extends Tlv_t {
    /** @var int _t202_body_len */
    protected _t202_body_len;

    public constructor() {
        super();
        this._t202_body_len = 16;
        this._cmd           = 0x202;
    }

    /**
     * @param bssid_addr md5(bssid_addr)
     * @param ssid_addr ssid_addr wifi ssid (AndroidAP ...)
     * @return
     */
    public  get_tlv_202(bssid_addr: Buffer, ssid_addr: Buffer = null) {
        let baseAddr_Len = bssid_addr.length;
        if (!baseAddr_Len) {
            baseAddr_Len = 16;
        }
        let ssid_Len        = ssid_addr.length;
        this._t202_body_len = 2 + baseAddr_Len + 2 + ssid_Len;
        let body            = new Buffer(this._t202_body_len);
        let p               = 0;
        body.writeInt16BE(baseAddr_Len, p);
        p += 2;
        bssid_addr.copy(body, p, 0, baseAddr_Len);
        p += baseAddr_Len;
        body.writeInt16BE(ssid_Len, p);
        p += 2;
        ssid_addr.copy(body, p, 0, ssid_Len);
        p += ssid_Len;
        this.fill_head(this._cmd);
        this.fill_body(body, p);
        this.set_length();
        return this.get_buf();
    }
}
