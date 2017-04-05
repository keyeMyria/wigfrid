import {Tlv_t} from "./Tlv_t";
/**
 * Class Tlv_t108
 * Ksid
 *
 * @package botmm\GradeeBundle\Tlv
 */
export class Tlv_t108 extends Tlv_t {
    /** @var int _t108_body_len; */
    protected _t108_body_len;

    public constructor() {
        super();
        this._t108_body_len = 0;
        this._cmd           = 264;
    }

    /**
     * write in sd/msf/id2
     *
     * @param byte[]|string $ksid 5.8  93 33 4E AD B8 08 D3 42 82 55 B7 EF 28 E7 E8 F5
     *                     2013 A1 07 5A E4 E8 ED 11 45 87 AF DD A1 FD 8C F1 66
     *                     new  53 59 78 67 3f 3e c4 89 08 b9 f1 21 8c cf 69 2a
     * @return mixed
     */
    public  get_tlv_108(ksid: Buffer) {
        this._t108_body_len = ksid.length;
        let body            = new Buffer(this._t108_body_len);
        ksid.copy(body);
        this.fill_head(this._cmd);
        this.fill_body(body, this._t108_body_len);
        this.set_length();
        return this.get_buf();
    }
}
