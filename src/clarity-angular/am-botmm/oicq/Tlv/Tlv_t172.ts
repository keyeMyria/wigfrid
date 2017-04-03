import "botmm/BufferBundle/Buffer/Buffer";
class Tlv_t172 extends Tlv_t
{
    public  Tlv_t172()
    {
        super();
        this._cmd = 370;
    }
    public  get_tlv_172(rollbackSig)
    {
        body = new Buffer();
        pos = 0;
        body.write(rollbackSig, pos);
        pos += strlen(rollbackSig);
        this.fill_head(this._cmd);
        this.fill_body(body, pos);
        this.set_length();
        return this.get_buf();
    }
}