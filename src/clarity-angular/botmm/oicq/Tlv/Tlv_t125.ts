import "botmm/BufferBundle/Buffer/Buffer";
class Tlv_t125 extends Tlv_t
{
    protected _openid_len;
    protected _openkey_len;
    public  Tlv_t125()
    {
        super();
        this._openid_len = 0;
        this._openkey_len = 0;
        this._cmd = 0x125;
    }
    public  verify()
    {
        if (this._body_len < 2) {
            return false;
        }
        this._openid_len = this._buf.readInt16BE(this._head_len);
        this._openkey_len = this._buf.readInt16BE(this._head_len + 2 + this._openid_len);
        if (this._body_len < 2 + this._openid_len + 2 + this._openkey_len) {
            return false;
        }
        return true;
    }
    public  get_openid()
    {
        return this._buf.read(this._head_len + 2, this._openid_len);
    }
    public  get_openkey()
    {
        return this._buf.read(this._head_len + 2 + this._openid_len + 2, this._openkey_len);
    }
}