import {Tlv_t} from "./Tlv_t";
class Tlv_t124 extends Tlv_t {
    protected _t124_body_len;

    public constructor() {
        super();
        this._t124_body_len = 0;
        this._cmd           = 292;
    }

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
     * @param ostype        byte[]|string
     * @param osver         byte[]|string
     * @param nettype       int
     * @param netdetail     byte[]|string
     * @param addr      byte[]|string
     * @param apn       byte[]|string
     */
    public  get_tlv_124(ostype, osver, nettype, netdetail, addr, apn) {
        let ostype_len      = this.limit_len(ostype, 16);
        let osver_len       = this.limit_len(osver, 16);
        let netdetail_len   = this.limit_len(netdetail, 16);
        let addr_len        = this.limit_len(addr, 32);
        let apn_len         = this.limit_len(apn, 16);
        this._t124_body_len = ostype_len + 2 + osver_len + 2 + 2 + netdetail_len + 2 + addr_len + 2 + apn_len + 2;
        let body            = new Buffer(this._t124_body_len);
        let pos             = 0;
        body.writeInt16BE(ostype_len, pos);
        pos += 2;
        body.write(ostype, pos);
        pos += ostype_len;
        body.writeInt16BE(osver_len, pos);
        pos += 2;
        body.write(osver, pos, osver_len);
        pos += osver_len;
        body.writeInt16BE(nettype, pos);
        pos += 2;
        body.writeInt16BE(netdetail_len, pos);
        pos += 2;
        body.write(netdetail, pos, netdetail_len);
        pos += netdetail_len;
        body.writeInt16BE(addr_len, pos);
        pos += 2;
        body.write(addr, pos, addr_len);
        pos += addr_len;
        body.writeInt16BE(apn_len, pos);
        pos += 2;
        body.write(apn, pos, apn_len);
        pos += apn_len;
        this.fill_head(this._cmd);
        this.fill_body(body, this._t124_body_len);
        this.set_length();
        return this.get_buf();
    }
}
