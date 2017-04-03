import "botmm/BufferBundle/Buffer/Buffer";
class Tlv_t143 extends Tlv_t
{
    public _t143_body_len;
    public  Tlv_t143()
    {
        super();
        this._t143_body_len = 0;
        this._cmd = 323;
    }
    public  get_tlv143(b)
    {
        this._t143_body_len = strlen(b);
        body = new Buffer(this._t143_body_len);
        body.write(b, 0);
        this.fill_head(this._cmd);
        this.fill_body(body, this._t143_body_len);
        this.set_length();
        return this.get_buf();
    }
}