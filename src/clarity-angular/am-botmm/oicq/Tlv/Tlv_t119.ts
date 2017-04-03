import "botmm/BufferBundle/Buffer/Buffer";
class Tlv_t119 extends Tlv_t
{
    protected _t119_body_len;
    public  Tlv_t119()
    {
        super();
        this._cmd = 0x119;
    }
    public  verify()
    {
        return true;
    }
}