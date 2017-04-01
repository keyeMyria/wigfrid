import "botmm/BufferBundle/Buffer/Buffer";
class Tlv_t188 extends Tlv_t
{
    protected _t188_body_len = 0;
    public  Tlv_t188()
    {
        super();
        this._cmd = 392;
    }
    /**
     * hex 4D BF 65 33 D9 08 C2 73 63 6D E5 CD AE 83 C0 43
     *
     * @param $android_id
     * @return mixed
     */
    public  get_tlv_188(android_id)
    {
        arg_len = 16;
        if (android_id != null) {
            arg_len = strlen(android_id);
        }
        this._t188_body_len = arg_len;
        body = new Buffer(this._t188_body_len);
        body.write(android_id, 0, arg_len);
        this.fill_head(this._cmd);
        this.fill_body(body, this._t188_body_len);
        this.set_length();
        return this.get_buf();
    }
}