import "botmm/BufferBundle/Buffer/Buffer";
class Tlv_t109 extends Tlv_t
{
    protected _t109_body_len;
    public  Tlv_t109()
    {
        super();
        this._t109_body_len = 0;
        this._cmd = 265;
    }
    public  get_tlv_109(IMEI)
    {
        this._t109_body_len = strlen(IMEI);
        body = new Buffer(this._t109_body_len);
        body.write(IMEI, 0);
        this.fill_head(this._cmd);
        this.fill_body(body, this._t109_body_len);
        this.set_length();
        return this.get_buf();
    }
}