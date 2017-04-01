import "botmm/BufferBundle/Buffer/Buffer";
class Tlv_t151 extends Tlv_t
{
    public  Tlv_t151()
    {
        super();
        this._cmd = 337;
    }
    public  get_tlv_151(data)
    {
        body_len = 0;
        if (data != null) {
            body_len = strlen(data);
        }
        body = new Buffer(body_len);
        if (body_len > 0) {
            body.write(data, 0, body_len);
        }
        this.fill_head(this._cmd);
        this.fill_body(body, body_len);
        this.set_length();
        return this.get_buf();
    }
}