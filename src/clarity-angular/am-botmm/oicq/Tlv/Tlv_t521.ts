import {Tlv_t} from "./Tlv_t";
export class Tlv_t521 extends Tlv_t {
    public constructor() {
        super();
        this._cmd = 0x521;
    }

    /**
     * @param productType
     * @return mixed
     */
    public get_tlv_521(productType: number) {
        let body = new Buffer(6);
        let p    = 0;
        body.writeInt32BE(productType, 0);
        p += 4;
        body.writeInt16BE(0, p);
        p += 2;
        this.fill_head(this._cmd);
        this.fill_body(body, p);
        this.set_length();
        return this.get_buf();
    }
}
