import "botmm/BufferBundle/Buffer/Buffer";
class Tlv_t113 extends Tlv_t
{
    public  Tlv_t113()
    {
        super();
        this._cmd = 0x113;
    }
    public  get_uin()
    {
        return this._buf.readInt32BE(this._head_len);
    }
}