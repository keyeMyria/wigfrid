import "botmm/BufferBundle/Buffer/Buffer";
class Tlv_ta extends Tlv_t
{
    protected _msg_len;
    public  Tlv_ta()
    {
        super();
        this._msg_len = 0;
        this._cmd = 10;
    }
    public  verify()
    {
        if (this._body_len < 6) {
            return false;
        }
        len = this._buf.readInt16BE(this._head_len + 4);
        if (len + 6 != this._body_len) {
            return false;
        }
        this._msg_len = len;
        return true;
    }
    public  get_tlv_ta(_in, len)
    {
        this.set_buf(_in, len);
    }
    public  get_msg()
    {
        if (this._msg_len > 0) {
            return this._buf.read(this._head_len + 6, this._msg_len);
        }
        return '';
    }
}