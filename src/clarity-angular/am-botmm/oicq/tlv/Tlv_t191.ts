import {Tlv_t} from "./Tlv_t";
import {injectable} from "inversify";

@injectable()
export class Tlv_t191 extends Tlv_t {
    public constructor() {
        super();
        this._cmd = 401;
    }

    /**
     * @return mixed
     */
    public  get_tlv_191() {
        let body = new Buffer(1);
        body.writeUInt8(0, 0);
        //or 0
        this.fill_head(this._cmd);
        this.fill_body(body, 1);
        this.set_length();
        return this.get_buf();
    }
}
