import "botmm/BufferBundle/Buffer/Buffer";
class Tlv_t166 extends Tlv_t
{
    public  Tlv_t166()
    {
        super();
        this._cmd = 358;
    }
    public  get_tlv_166(img_type)
    {
        body = new Buffer(1);
        pos = 0;
        body.writeInt8(img_type, pos);
        pos += 1;
        this.fill_head(this._cmd);
        this.fill_body(body, pos);
        this.set_length();
        return this.get_buf();
    }
}