import {Buffer} from "buffer";
import {Cryptor} from "../crypt/Cryptor";


export class Tlv_t {
    protected _body_len;
    protected _buf: Buffer;
    protected _cmd;
    protected _head_len;
    protected _max;
    protected _pos;
    //protected $_type;
    public Tlv_t() {
        this._max      = 128;
        this._pos      = 0;
        //$this->_type     = 0;
        this._head_len = 4;
        this._body_len = 0;
        this._buf      = Buffer.alloc(this._max);
        this._cmd      = 0;
    }

    //public function get_type()
    //{
    //    return $this->_cmd;
    //}
    public get_buf() {
        return this._buf.slice(0, this._pos);
    }

    public get_data() {
        return this._buf.slice(this._head_len, this._body_len);
    }

    public get_data_len() {
        return this._body_len;
    }

    /**
     * @param _in
     * @param len
     */
    public set_data(_in: Buffer, len: number) {
        if (this._head_len + len > this._max) {
            this._max = this._head_len + len + 128;
            let buf1  = new Buffer(this._max);
            this._buf.copy(buf1, 0, 0, this._head_len);
            this._buf = buf1;
        }
        this._pos = this._head_len + len;
        _in.copy(this._buf, this._head_len, 0, len);
        this._body_len = len;
        this._buf.writeInt16BE(this._cmd, 0);
        this._buf.writeInt16BE(this._body_len, 2);
    }

    public set_buf() {
        let args = arguments;
        switch (args.length) {
            case 2:
                return this.set_buf2.apply(this, args);
            case 3:
                return this.set_buf3.apply(this, args);
            case 5:
                return this.set_buf5.apply(this, args);
            default:
                throw new Error("InvalidArgumentException set_buf arguments error");
        }
    }

    /**
     * @param _in
     * @param len
     */
    protected set_buf2(_in: Buffer, len: number) {
        if (len > this._max) {
            this._max = len + 128;
            this._buf = new Buffer(this._max);
        }
        this._pos = len;
        this._buf = new Buffer(len);
        _in.copy(this._buf, 0);
        this._cmd      = this._buf.readInt16BE(0);
        this._body_len = len - this._head_len;
    }

    /**
     * @param _in
     * @param pos
     * @param len
     */
    protected set_buf3(_in: Buffer, pos: number, len: number) {
        if (len > this._max) {
            this._max = len + 128;
            this._buf = new Buffer(this._max);
        }
        this._pos = len;
        _in.copy(this._buf, pos, pos, pos + len);
        this._cmd      = _in.readInt16BE(0);
        this._body_len = len - this._head_len;
    }

    protected set_buf5(_in: Buffer, pos: number, len: number, cmd, body_len: number) {
        if (len > this._max) {
            this._max = len + 128;
            this._buf = new Buffer(this._max);
        }
        this._pos = len;
        _in.copy(this._buf, 0, pos, pos + len);
        _in.copy(this._buf, pos, pos, pos + len);
        this._cmd      = cmd;
        this._body_len = body_len;
    }

    public  fill_head(type) {
        this._buf.writeInt16BE(type, this._pos);
        this._pos += 2;
        this._buf.writeInt16BE(0, this._pos);
        this._pos += 2;
    }

    public  set_length() {
        this._buf.writeInt16BE(this._pos - this._head_len, 2);
    }

    public fill_body(_in: Buffer, len) {
        if (len > this._max - this._head_len) {
            this._max   = this._head_len + len + 64;
            let new_buf = new Buffer(this._max);
            this._buf.copy(new_buf, 0, 0, this._pos);
            this._buf = new_buf;
        }
        this._body_len = len;
        _in.copy(this._buf, this._pos, 0, len);
        this._pos += len;
    }

    /**
     *
     * @param _in
     * @param pos
     * @param len
     * @param type
     * @returns {any}
     */
    public search_tlv(_in: Buffer, pos, len, type) {
        //if($len == null){
        let max      = _in.length;
        //}
        let inBuffer = new Buffer(_in);
        while (pos < max && pos + 2 <= max) {
            if (inBuffer.readInt16BE(pos) == type) {
                return pos;
            }
            pos += 2;
            if (pos + 2 > max) {
                return -1;
            }
            pos += inBuffer.readInt16BE(pos) + 2;
        }
        return -1;
    }

    /**
     *
     * <p>
     *     <b>param</b> string $in  <br/>
     *     <b>param</b> int    $len        <br/>
     *     <b>return</b> int|string <br/>
     * </p>
     *<br/>
     * <p>
     *     <b>param</b> string $in  <br/>
     *     <b>param</b> int    $pos        <br/>
     *     <b>param</b> int    $len        <br/>
     *     <b>return</b> int|string <br/>
     * </p>
     *<br/>
     * <p>
     *     <b>param</b> string $in  <br/>
     *     <b>param</b> int    $pos        <br/>
     *     <b>param</b> int    $len        <br/>
     *     <b>param</b> string $key        <br/>
     *     <b>return</b> int|string <br/>
     * </p>
     */
    public get_tlv() {
        switch (arguments.length) {
            case 2:
                return this.get_tlv2.apply(this, arguments);
            case 3:
                if (arguments[2] instanceof Buffer) {
                    return this.get_tlv_cryptor.apply(this, arguments);
                } else {
                    return this.get_tlv3.apply(this, arguments);
                }
            case 4:
                return this.get_tlv4.apply(this, arguments);
            default:
                throw new Error("InvalidArgumentException get_tlv arguments error");
        }
    }

    protected get_tlv2(_in: Buffer, len: number) {
        if (this._head_len >= len) {
            return -1;
        }
        let inBuffer   = new Buffer(_in);
        this._body_len = inBuffer.readInt16BE(2);
        if (this._head_len + this._body_len > len) {
            return -1;
        }
        this.set_buf2(_in, this._head_len + this._body_len);
        if (this.verify()) {
            return 0;
        }
        return -1005;
    }

    /**
     * @return int
     * @param _in
     * @param pos
     * @param len
     */
    protected get_tlv3(_in: Buffer, pos: number, len: number) {
        let p = this.search_tlv(_in, pos, len, this._cmd);
        if (p < 0) {
            return -1;
        }
        len -= p - pos;
        pos = p;
        if (this._head_len >= len) {
            return -1;
        }
        let inBuffer   = new Buffer(_in);
        this._body_len = inBuffer.readInt16BE(pos + 2);
        if (this._head_len + this._body_len > len) {
            return -1;
        }
        this.set_buf3(_in, pos, this._head_len + this._body_len);
        if (this.verify()) {
            return this._head_len + p + this._body_len;
        }
        return -1005;
    }

    /**
     * @return int|string
     * @param _in
     * @param pos
     * @param len
     * @param key
     */
    protected get_tlv4(_in: Buffer, pos: number, len: number, key: Buffer) {
        let p = this.search_tlv(_in, pos, len, this._cmd);
        if (p < 0) {
            return -1;
        }
        len -= p - pos;
        let in1 = new Buffer(len);
        _in.copy(in1, 0, p, p + len);
        return this.get_tlv_cryptor(in1, len, key);
    }

    /**
     * @param _in
     * @param len
     * @param key
     * @return int
     */
    get_tlv_cryptor(_in: Buffer, len, key: Buffer) {
        if (this._head_len >= len) {
            return -1;
        }
        let inBuffer   = new Buffer(_in);
        this._body_len = inBuffer.readInt16BE(2);
        if (this._head_len + this._body_len > len) {
            return -1;
        }
        let decrypt_body        = Cryptor.decryptWith(_in, this._head_len, this._body_len, key);
        let decrypt_body_length = decrypt_body.length;
        if (decrypt_body == null) {
            return -1015;
        }
        if (this._head_len + decrypt_body_length > this._max) {
            this._max = this._head_len + decrypt_body.length;
            this._buf = new Buffer(this._max);
        }

        this._pos = 0;
        _in.copy(this._buf, 0, 0, this._head_len);
        this._pos += this._head_len;
        decrypt_body.copy(this._buf, this._pos, 0, decrypt_body_length);
        this._pos += decrypt_body_length;
        this._body_len = decrypt_body_length;
        return !this.verify() ? -1005 : 0;
    }

    /**
     * @return bool
     */
    public verify() {
        return true;
    }

    /**
     * @return mixed
     */
    public get_sizeof() {
        return this._pos;
    }
}
