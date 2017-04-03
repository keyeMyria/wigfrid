import {Tlv_t} from "./Tlv_t";
class Tlv_t144 extends Tlv_t {
    public _t144_body_len;

    public constructor() {
        super();
        this._t144_body_len = 0;
        this._cmd           = 324;
    }

    /**
     * @param string|byte[] $_109
     * @param string|byte[] $_124
     * @param string|byte[] $_128
     * @param string|byte[] $_147
     * @param string|byte[] $_148
     * @param string|byte[] $_151
     * @param string|byte[] $_153
     * @param $key
     * @return mixed
     */
    public  get_tlv_144() {
        args    = func_get_args();
        key     = array_pop(args);
        packs   = array_filter(args, function (pack) {
            if (pack != null && strlen(pack) > 0) {
                return true;
            } else {
                return false;
            }
        });
        tlv_num = count(packs);
        in_len  = 0;
        in_len  = array_reduce(packs, function (prev, pack) {
            prev += strlen(pack);
            return prev;
        }, in_len);
        body    = new Buffer(in_len + 2);
        pos     = 0;
        body.writeInt16BE(tlv_num, pos);
        pos += 2;
        for (i = 0; i < count(packs); i++) {
            body.write(packs[i], pos);
            pos += strlen(packs[i]);
        }
        body                = Cryptor.encrypt(body, 0, pos, key);
        this._t144_body_len = strlen(body);
        this.fill_head(this._cmd);
        this.fill_body(body, this._t144_body_len);
        this.set_length();
        return this.get_buf();
    }
}
