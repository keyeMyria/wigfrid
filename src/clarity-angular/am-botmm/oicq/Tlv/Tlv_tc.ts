class Tlv_tc extends Tlv_t
{
    public  Tlv_tc()
    {
        super();
        this._cmd = 12;
    }
    public  verify()
    {
        if (this._body_len < 14) {
            return false;
        }
        return true;
    }
    public  get_tlv_tc(_in, len)
    {
        this.set_buf(_in, len);
    }
}