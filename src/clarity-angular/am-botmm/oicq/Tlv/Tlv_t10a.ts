import "botmm/BufferBundle/Buffer/Buffer";
class Tlv_t10a extends Tlv_t
{
    public  Tlv_t10a()
    {
        super();
        this._cmd = 0x10a;
    }
    public  get_tlv_10a(TGT)
    {
        body = new Buffer(strlen(TGT));
        p = 0;
        body.write(TGT, 0);
        p += strlen(TGT);
        this.fill_head(this._cmd);
        this.fill_body(body, p);
        this.set_length();
        return this.get_buf();
    }
}