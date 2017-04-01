class Tlv_t167 extends Tlv_t
{
    public _url_len;
    public  Tlv_t167()
    {
        super();
        this._url_len = 0;
        this._cmd = 359;
    }
    public  verify()
    {
        if (this._body_len < 4) {
            return false;
        }
        len = this._buf.readInt16BE(this._head_len + 1 + 1);
        if (this._body_len < len + 4) {
            return false;
        }
        this._url_len = len;
        return true;
    }
    public  get_img_type()
    {
        return this._buf.readInt8(this._head_len);
    }
    public  get_img_format()
    {
        return this._buf.readInt8(this._head_len + 1);
    }
    public  get_img_url()
    {
        return this._buf.read(this._head_len + 1 + 1 + 2, this._url_len);
    }
}