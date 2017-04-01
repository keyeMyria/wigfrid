import "botmm/BufferBundle/Buffer/Buffer";
class Tlv_t11a extends Tlv_t
{
    public _nick_len;
    public  Tlv_t11a()
    {
        super();
        this._nick_len = 0;
        this._cmd = 0x11a;
    }
    public  verify()
    {
        if (this._body_len < 5) {
            return false;
        }
        l = this._buf.readInt8(this._head_len + 2 + 1 + 1);
        if (this._body_len < l + 5) {
            return false;
        }
        this._nick_len = l;
        return true;
    }
    public  get_face()
    {
        return this._buf.read(this._head_len, 2);
    }
    public  get_age()
    {
        return this._buf.read(this._head_len + 2, 1);
    }
    public  get_gander()
    {
        return this._buf.read(this._head_len + 2 + 1, 1);
    }
    public  get_nick()
    {
        return this._buf.read(this._head_len + 2 + 1 + 1 + 1, strlen(this._nick_len));
    }
}