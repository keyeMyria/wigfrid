import {Tlv_t} from "./Tlv_t";
import {Cryptor} from "../crypt/Cryptor";
import {injectable} from "inversify";

@injectable()
export class Tlv_t144 extends Tlv_t {
    public _t144_body_len;

    public constructor() {
        super();
        this._t144_body_len = 0;
        this._cmd           = 324;
    }

    /**
     * @param list  _109
     *              _124
     *              _128
     *              _147
     *              _148
     *              _151
     *              _153
     *
     * @param key
     * @return mixed
     */
    public  get_tlv_144(list: Buffer[], key: Buffer) {
        let tlv_num = list.length;
        let in_len  = 0;

        list.map((pack) => {
            in_len += pack.length;
        });

        let body = new Buffer(in_len + 2);
        let pos  = 0;
        body.writeInt16BE(tlv_num, pos);
        pos += 2;
        for (let i = 0; i < list.length; i++) {
            list[i].copy(body, pos);
            pos += list[i].length;
        }
        body                = Cryptor.encrypt(body, key);
        this._t144_body_len = body.length;
        this.fill_head(this._cmd);
        this.fill_body(body, this._t144_body_len);
        this.set_length();
        return this.get_buf();
    }
}
