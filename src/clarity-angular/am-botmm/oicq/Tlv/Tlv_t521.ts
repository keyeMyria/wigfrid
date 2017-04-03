import "botmm/BufferBundle/Buffer/Buffer";
class Tlv_t521 extends Tlv_t
{
    public  Tlv_t521()
    {
        super();
        this._cmd = 0x521;
    }
    /**
     * @param $productType
     * @return mixed
     */
    public  get_tlv_521(productType)
    {
        body = new Buffer(6);
        p = 0;
        body.writeInt32BE(productType, 0);
        p += 4;
        body.writeInt16BE(0, p);
        p += 2;
        this.fill_head(this._cmd);
        this.fill_body(body, p);
        this.set_length();
        return this.get_buf();
    }
}