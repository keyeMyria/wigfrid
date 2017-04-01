class Tlv_t122 extends Tlv_t
{
    protected _lg;
    protected _ln;
    protected _ls;
    protected _ly;
    protected _pg;
    protected _pn;
    protected _ps;
    protected _py;
    public  Tlv_t122()
    {
        super();
        this._lg = 0;
        this._ln = 0;
        this._ly = 0;
        this._ls = 0;
        this._pg = 0;
        this._pn = 0;
        this._py = 0;
        this._ps = 0;
        this._cmd = 0x122;
    }
    public  verify()
    {
        if (this._body_len < 2) {
            return false;
        }
        this._lg = this._buf.readInt16BE(this._head_len);
        if (this._body_len < this._lg + 2 + 2) {
            return false;
        }
        this._ln = this._buf.readInt16BE(this._head_len + 2 + this._lg);
        if (this._body_len < this._lg + 2 + 2 + this._ln) {
            return false;
        }
        this._ly = this._buf.readInt16BE(this._head_len + 2 + this._lg + 2 + this._ln);
        if (this._body_len < this._lg + 2 + 2 + this._ln + 2 + this._ly) {
            return false;
        }
        this._ls = this._buf.readInt16BE(this._head_len + 2 + this._lg + 2 + this._ln + 2 + this._ly);
        this._pg = this._head_len + 2;
        this._pn = this._head_len + 2 + this._lg + 2;
        this._py = this._head_len + 2 + this._lg + 2 + this._ln + 2;
        this._ps = this._head_len + 2 + this._lg + 2 + this._ln + 2 + this._ly + 2;
        return true;
    }
    public  get_g()
    {
        return this._buf.read(this._pg, this._lg);
    }
    public  get_n()
    {
        return this._buf.read(this._pn, this._ln);
    }
    public  get_y()
    {
        return this._buf.read(this._py, this._ly);
    }
    public  get_x()
    {
        return this._buf.read(this._ps, this._ls);
    }
}