import {Tlv_t} from "./Tlv_t";
import {injectable} from "inversify";
/**
 * Class Tlv_t194
 * md5(IMSI)
 * 登录时此信息可选

 *
 *@package botmm\GradeeBundle\Oicq\Tlv
 */
@injectable()
export class Tlv_t194 extends Tlv_t {
    /** @var int _t194_body_len */
    protected _t194_body_len;

    public constructor() {
        super();
        this._t194_body_len = 16;
        this._cmd           = 0x194;
    }

    /**
     * @param imsi 5f 64 aa b8 ed a2 e7 73 ca 1d 79 5d e6 19 19 68
     */
    public  get_tlv_194(imsi: Buffer) {
        let body = new Buffer(this._t194_body_len);
        let p    = 0;
        imsi.copy(body, p, 0, 16);
        p += 16;
        this.fill_head(this._cmd);
        this.fill_body(body, p);
        this.set_length();
        return this.get_buf();
    }
}
