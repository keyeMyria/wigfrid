import {SmartBuffer} from "smart-buffer";
import {TarsStructBase} from "./TarsStructBase";
import {Buffer} from "buffer";
import {isArray, isBoolean, isNumber, isObject, isString} from "util";

class TarsOutputStream {
    private bs: SmartBuffer;

    public  TarsOutputStream(bs = null) {
        if (bs == null) {
            this.bs = new SmartBuffer();
        } else {
            this.bs = bs;
        }
    }

    public  getByteBuffer() {
        return this.bs.toBuffer();
    }

    public  writeHead(type, tag) {
        let b;
        if (tag < 15) {
            b = tag << 4 | type;
            //$this->bs.put($b);
            this.bs.writeInt8(b);
        } else {
            if (tag < 256) {
                b = 0xf << 4 | type;
                //$this->bs.put($b);
                //$this->bs.put($tag);
                this.bs.writeInt8(b);
                this.bs.writeInt8(tag);
            } else {
                throw new Error("TarsEncodeException tag is too large: {tag}");
            }
        }
    }

    public  writeBoolean(b, tag) {
        let by;
        by = b ? 0x1 : 0;
        this.writeByte(by, tag);
    }

    public  writeByte(b, tag) {
        //$this->reserve(3);
        if (b == 0) {
            this.writeHead(TarsStructBase.ZERO_TAG, tag);
        } else {
            this.writeHead(TarsStructBase.BYTE, tag);
            //$this->bs.put($b);
            this.bs.writeInt8(b);
        }
    }

    public  writeShort(n, tag) {
        //$this->reserve(4);
        if (n >= -128 && n <= 127) {
            this.writeByte(n, tag);
        } else {
            this.writeHead(TarsStructBase.SHORT, tag);
            //$this->bs.putShort($n);
            this.bs.writeInt16BE(n);
        }
    }

    public  writeInt(n, tag) {
        //$this->reserve(6);
        if (n >= -32768 && n <= 32767) {
            this.writeShort(n, tag);
        } else {
            this.writeHead(TarsStructBase.INT, tag);
            //$this->bs . putInt($n);
            this.bs.writeInt32BE(n);
        }
    }

    /**
     * must be hex string
     * @param n
     * @param tag
     */
    public  writeHexLong(n, tag) {
        //$this->reserve(10);
        // if (n >= -0x80000000 && n <= 0x7fffffff) {
        //     this.writeInt(n, tag);
        // } else {
        this.writeHead(TarsStructBase.LONG, tag);
        //$this->bs . putLong($n);
        this.bs.writeString(n, 'hex');
        // }
    }

    public  writeFloat(n, tag) {
        //reserve(6);
        this.writeHead(TarsStructBase.FLOAT, tag);
        //$this->bs . putFloat($n);
        this.bs.writeFloatBE(n);
    }

    public  writeDouble(n, tag) {
        //reserve(10);
        this.writeHead(TarsStructBase.DOUBLE, tag);
        //$this->bs . putDouble($n);
        this.bs.writeDoubleBE(n);
    }

    public  writeHexString(s, tag) {
        let by = Buffer.from(s, 'hex');
        //reserve(10 + by.length);
        if (by.length > 255) {
            this.writeHead(TarsStructBase.STRING4, tag);
            this.bs.writeInt32BE(by.length);
            this.bs.writeBuffer(by);
        } else {
            this.writeHead(TarsStructBase.STRING1, tag);
            this.bs.writeInt8(by.length);
            this.bs.writeBuffer(by);
        }
    }

    public  writeByteString(s, tag) {
        //reserve(10 + s . length());
        let by = Buffer.from(s);
        if (by.length > 255) {
            this.writeHead(TarsStructBase.STRING4, tag);
            this.bs.writeInt32BE(by.length);
            this.bs.writeBuffer(by);
        } else {
            this.writeHead(TarsStructBase.STRING1, tag);
            this.bs.writeInt8(by.length);
            this.bs.writeBuffer(by);
        }
    }

    public  writeString(s, tag, encode = "UTF-8") {
        let by = Buffer.from(s, encode);
        //reserve(10 + by . length);
        if (by.length > 255) {
            this.writeHead(TarsStructBase.STRING4, tag);
            this.bs.writeInt32BE(by.length);
            this.bs.writeBuffer(by);
        } else {
            this.writeHead(TarsStructBase.STRING1, tag);
            this.bs.writeInt8(by.length);
            this.bs.writeBuffer(by);
        }
    }

    public writeMap(m: Map<any, any>, tag) {
        //reserve(8);
        this.writeHead(TarsStructBase.MAP, tag);
        this.writeInt(m == null ? 0 : m.size, 0);
        if (m != null) {
            m.forEach((mValue, mKey) => {
                this.write(mKey, 0);
                this.write(mValue, 1);
            });
        }
    }

    /**
     * @param l
     * @param tag
     */
    public  writeBooleanArray(l: boolean[], tag) {
        //reserve(8);
        this.writeHead(TarsStructBase.LIST, tag);
        this.writeInt(l.length, 0);
        for (let e of l) {
            this.writeBoolean(e, 0);
        }
    }

    /**
     * @param l
     * @param tag
     */
    public  writeByteArray(l: number[], tag) {
        //reserve(8 + l . length);
        this.writeHead(TarsStructBase.SIMPLE_LIST, tag);
        this.writeHead(TarsStructBase.BYTE, 0);
        this.writeInt(l.length, 0);
        //bs . put(l);
        for (let e of l) {
            this.bs.writeInt8(e);
        }
    }

    /**
     * @param l
     * @param tag
     */
    public  writeShortArray(l: number[], tag) {
        //reserve(8);
        this.writeHead(TarsStructBase.LIST, tag);
        this.writeInt(l.length, 0);
        for (let e of l) {
            this.writeShort(e, 0);
        }
    }

    public  writeIntArray(l, tag) {
        //reserve(8);
        this.writeHead(TarsStructBase.LIST, tag);
        this.writeInt(l.length, 0);
        for (let e of l) {
            this.writeInt(e, 0);
        }
    }

    /**
     * @param l
     * @param tag
     */
    public  writeHexLongArray(l, tag) {
        //reserve(8);
        this.writeHead(TarsStructBase.LIST, tag);
        this.writeInt(l.length, 0);
        for (let e of l) {
            this.writeHexLong(e, 0);
        }
    }

    public  writeFloatArray(l, tag) {
        //reserve(8);
        this.writeHead(TarsStructBase.LIST, tag);
        this.writeInt(l.length, 0);
        for (let e of l) {
            this.writeFloat(e, 0);
        }
    }

    public  writeDoubleArray(l, tag) {
        //reserve(8);
        this.writeHead(TarsStructBase.LIST, tag);
        this.writeInt(l.length, 0);
        for (let e of l) {
            this.writeDouble(e, 0);
        }
    }

    public  writeByteStringArray(l, tag) {
        this.writeHead(TarsStructBase.LIST, tag);
        this.writeInt(l.length, 0);
        for (let e of l) {
            this.writeByteString(e, 0);
        }
    }

    public  writeStringArray(l, tag, encode = "UTF-8") {
        this.writeHead(TarsStructBase.LIST, tag);
        this.writeInt(l.length, 0);
        for (let e of l) {
            this.writeString(e, 0, encode);
        }
    }

    public  writeArray(l, tag) {
        //reserve(8);
        this.writeHead(TarsStructBase.LIST, tag);
        this.writeInt(l.length, 0);
        for (let e of l) {
            this.write(e, tag);
        }
    }

    public  writeTarsStruct(o, tag) {
        //reserve(2);
        this.writeHead(TarsStructBase.STRUCT_BEGIN, tag);
        o.writeTo(this);
        //reserve(2);
        this.writeHead(TarsStructBase.STRUCT_END, 0);
    }

    /**
     * @param o
     * @param tag
     */
    public  write(o, tag) {
        if (isBoolean(o)) {
            this.writeBoolean(o, tag);
        }
        else if (Number(o) === o && o % 1 !== 0) {
            this.writeDouble(o, tag);
            //} else if (is_double($o)) {
            //    $this->writeDouble($o, $tag);
        }
        else if (isNumber(o) && o === Math.round(o)) {
            this.writeInt(o, tag);
        }
        else if (isString(o)) {
            this.writeString(o, tag);
        }
        else if (o instanceof Map) {
            this.writeMap(o, tag);
        }
        else if (o instanceof TarsStructBase) {
            this.writeTarsStruct(o, tag);
        }
        else if (isArray(o)) {
            this.writeArray(o, tag);
        }
        else if (isObject(o) && Symbol.iterator in o) {
            this.writeArray(o, tag);
        } else {
            throw new Error("TarsOutputStreamExt not implemented right now");
            // TarsOutputStreamExt.write(o, tag, this);
        }
    }

}
