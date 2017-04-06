import {Tlv_t} from "./Tlv_t";
import {injectable} from "inversify";
import {Buffer} from "buffer";

@injectable()
export class Tlv_t146 extends Tlv_t {
    public _errorinfo_len;
    public _msg_len;
    public _title_len;

    public constructor() {
        super();
        this._title_len     = 0;
        this._msg_len       = 0;
        this._errorinfo_len = 0;
        this._cmd           = 326;
    }

    public  verify() {
        if (this._body_len < 12) {
            return false;
        }
        let templen = this._buf.readInt16BE(this._head_len + 4);
        if (this._body_len < templen + 12) {
            return false;
        }
        this._title_len = templen;
        templen         = this._buf.readInt16BE(this._head_len + 6 + this._title_len);
        if (this._body_len < this._title_len + 12 + templen) {
            return false;
        }
        this._msg_len = templen;
        templen       = this._buf.readInt16BE(this._head_len + 10 + this._title_len + this._msg_len);
        if (this._body_len < this._title_len + 12 + this._msg_len + templen) {
            return false;
        }
        this._errorinfo_len = templen;
        return true;
    }

    public  get_ver() {
        this._buf.readInt16BE(this._head_len);
    }

    public  get_code() {
        return this._buf.readInt16BE(this._head_len + 2);
    }

    public  get_title() {
        return this._buf.slice(
            this._head_len + 6,
            this._head_len + 6 + this._title_len);
    }

    public  get_msg() {
        return this._buf.slice(
            this._head_len + 6 + this._title_len,
            this._head_len + 6 + this._title_len + this._msg_len,
        );
    }

    public  get_type() {
        return this._buf.readInt16BE(this._head_len + 8 + this._title_len + this._msg_len);
    }

    public  get_errorinfo() {
        return this._buf.slice(
            this._head_len + 8 + this._title_len + this._msg_len + 4,
            this._head_len + 8 + this._title_len + this._msg_len + 4 + this._msg_len,
        );
    }
}
