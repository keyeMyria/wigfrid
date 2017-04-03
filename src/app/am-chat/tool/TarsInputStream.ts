import {SmartBuffer} from "@gradee/buffer";
import {isArray, isString} from "util";
import {Buffer} from "buffer";
import {TarsStructBase} from "./TarsStructBase";
import {TarsContext} from "./TarsContext";


export class HeadData {
    /**
     * @var byte
     */
    public type;
    public tag;
    public eof: boolean;

    public  clear() {
        this.type = 0;
        this.tag  = 0;
    }

    public  __toString() {
        return "[type]: `{this.type}` [tag]: `{this.tag}`";
    }
}

export class TarsInputStream {
    private bs: SmartBuffer;
    // 缓冲区
    public constructor(bs: any) {
        if (isString(bs)) {
            this.bs = new SmartBuffer(new Buffer(bs));
        } else if (bs instanceof Buffer) {
            this.bs = new SmartBuffer(bs);
        } else {
            this.bs = bs;
        }
    }

    /**
     * @param bs
     * @return TarsInputStream
     */
    public static fromString(bs) {
        return new TarsInputStream(Buffer.from(bs));
    }

    /**
     * @param bs
     * @return TarsInputStream
     */
    public static fromHexString(bs) {
        return new TarsInputStream(Buffer.from(bs, 'hex'));
    }

    /**
     * @param bs
     * @return TarsInputStream
     */
    public static fromBuffer(bs) {
        return new TarsInputStream(bs);
    }

    public readHead(hd): number {
        let b   = this.bs.readInt8();
        hd.type = b & 0xf;
        hd.tag  = (b & 0xf << 4) >> 4;
        if (hd.tag == 0xf) {
            hd.tag = this.bs.readInt8() & 0xff;
            return 2;
        }
        return 1;
    }

    peekHead(hd: HeadData) {
        //return this->readHead(hd, bs.duplicate());
        if (this.bs.readOffset >= this.bs.length) {
            hd.eof = true;
            return false;
        }
        let readOffset     = this.bs.readOffset;
        let head           = this.readHead(hd);
        this.bs.readOffset = readOffset;
        return head;
    }

    private skip(len) {
        this.bs.readOffset += len;
    }

    public skipToTag(tag): boolean {
        try {
            let hd = new HeadData();
            while (true) {
                let len = this.peekHead(hd);
                if (hd.type == TarsStructBase.STRUCT_END) {
                    return false;
                }
                if (tag <= hd.tag) {
                    return tag == hd.tag;
                }
                this.skip(len);
                this.skipField(hd.type);
            }
        } catch (e) {
        }
        return false;
    }

    public skipToStructEnd() {
        let hd = new HeadData();
        do {
            this.readHead(hd);
            this.skipField(hd.type);
        } while (hd.type != TarsStructBase.STRUCT_END);
    }

    /**
     * @param type
     */
    private skipField(type = null) {
        let hd;
        if (type == null) {
            hd = new HeadData();
            this.readHead(hd);
            type = hd.type;
        }
        switch (type) {
            case TarsStructBase.BYTE:
                this.skip(1);
                break;
            case TarsStructBase.SHORT:
                this.skip(2);
                break;
            case TarsStructBase.INT:
                this.skip(4);
                break;
            case TarsStructBase.LONG:
                this.skip(8);
                break;
            case TarsStructBase.FLOAT:
                this.skip(4);
                break;
            case TarsStructBase.DOUBLE:
                this.skip(8);
                break;
            case TarsStructBase.STRING1:
                let len = this.bs.readUInt8();
                this.skip(len);
                break;
            case TarsStructBase.STRING4:
                this.skip(this.bs.readUInt32BE());
                break;
            case TarsStructBase.MAP:
                let size = this.readInt(0, 0, true);
                for (let i = 0; i < size * 2; ++i) {
                    this.skipField();
                }
                break;
            case TarsStructBase.LIST:
                size = this.readInt(0, 0, true);
                for (let i = 0; i < size; ++i) {
                    this.skipField();
                }
                break;
            case TarsStructBase.SIMPLE_LIST:
                hd = new HeadData();
                this.readHead(hd);
                if (hd.type != TarsStructBase.BYTE) {
                    throw new Error("TarsDecodeException skipField with invalid type, type value: {type}, {hd.type}");
                }
                size = this.readInt(0, 0, true);
                this.skip(size);
                break;
            case TarsStructBase.STRUCT_BEGIN:
                this.skipToStructEnd();
                break;
            case TarsStructBase.STRUCT_END:
            case TarsStructBase.ZERO_TAG:
                break;
            default:
                throw new Error("TarsDecodeException invalid type.");
        }
    }

    public readBoolean(tag, isRequire): boolean {
        let c = this.readByte(tag, isRequire);
        return c != 0;
    }

    /**
     * @return int
     * @param tag
     * @param isRequire
     * @param sign
     */
    public readByte(tag, isRequire, sign = true) {
        let c = null;
        if (this.skipToTag(tag)) {
            let hd = new HeadData();
            this.readHead(hd);
            switch (hd.type) {
                case TarsStructBase.ZERO_TAG:
                    c = 0x0;
                    break;
                case TarsStructBase.BYTE:
                    if (sign) {
                        c = this.bs.readInt8();
                    } else {
                        c = this.bs.readUInt8();
                    }
                    break;
                default:
                    throw new Error("TarsDecodeException type mismatch.");
            }
        } else {
            if (isRequire) {
                throw new Error("TarsDecodeException require field not exist.");
            }
        }
        return c;
    }

    /**
     * @return short|int
     * @internal param short n
     * @param tag
     * @param isRequire
     * @param sign
     */
    public readShort(tag, isRequire, sign = true) {
        let n = null;
        if (this.skipToTag(tag)) {
            let hd = new HeadData();
            this.readHead(hd);
            switch (hd.type) {
                case TarsStructBase.ZERO_TAG:
                    n = 0;
                    break;
                case TarsStructBase.BYTE:
                    if (sign) {
                        n = this.bs.readInt8();
                    } else {
                        n = this.bs.readUInt8();
                    }
                    break;
                case TarsStructBase.SHORT:
                    if (sign) {
                        n = this.bs.readInt16BE();
                    } else {
                        n = this.bs.readUInt16BE();
                    }
                    break;
                default:
                    throw new Error("TarsDecodeException type mismatch.");
            }
        } else {
            if (isRequire) {
                throw new Error("TarsDecodeException require field not exist.");
            }
        }
        return n;
    }

    /**
     * @return int|null
     * @param tag
     * @param isRequire
     * @param sign
     */
    public readInt(tag, isRequire, sign = true) {
        let n = null;
        if (this.skipToTag(tag)) {
            let hd = new HeadData();
            this.readHead(hd);
            switch (hd.type) {
                case TarsStructBase.ZERO_TAG:
                    n = 0;
                    break;
                case TarsStructBase.BYTE:
                    if (sign) {
                        n = this.bs.readInt8();
                    } else {
                        n = this.bs.readUInt8();
                    }
                    break;
                case TarsStructBase.SHORT:
                    if (sign) {
                        n = this.bs.readInt16BE();
                    } else {
                        n = this.bs.readUInt16BE();
                    }
                    break;
                case TarsStructBase.INT:
                    if (sign) {
                        n = this.bs.readInt32BE();
                    } else {
                        n = this.bs.readUInt32BE();
                    }
                    break;
                default:
                    throw new Error("TarsDecodeException type mismatch.");
            }
        } else {
            if (isRequire) {
                throw new Error("TarsDecodeException require field not exist.");
            }
        }
        return n;
    }

    /**
     * @param tag
     * @param isRequire
     * @param sign
     * @return long|int|string
     */
    public readLong(tag, isRequire, sign = true) {
        let n = null;
        if (this.skipToTag(tag)) {
            let hd = new HeadData();
            this.readHead(hd);
            switch (hd.type) {
                case TarsStructBase.ZERO_TAG:
                    n = 0;
                    break;
                case TarsStructBase.BYTE:
                    n = this.bs.readInt8();
                    if (sign && n > 0x7f) {
                        n -= 0x100;
                    }
                    break;
                case TarsStructBase.SHORT:
                    n = this.bs.readInt16BE();
                    if (sign && n > 0x7fff) {
                        n -= 0x10000;
                    }
                    break;
                case TarsStructBase.INT:
                    n = this.bs.readInt32BE();
                    if (sign && n > 0x7fffffff) {
                        n -= 0x100000000;
                    }
                    break;
                case TarsStructBase.LONG:
                    let highN = this.bs.readInt32BE();
                    let lowN  = this.bs.readUInt32BE();
                    if (sign &&
                        highN > -(1 << 21) &&
                        highN < 0
                    ) {
                        n = -(highN * Math.pow(2, 32) + lowN);
                    } else if (highN < 1 << 21) {
                        n = Math.pow(2, 32) * highN + lowN;
                    } else {
                        console.warn("the safe long int should only between between -(2^53 - 1) and 2^53 - 1.")
                        n = this.bs.readBuffer(8);
                    }
                    break;
                default:
                    throw new Error("TarsDecodeException type mismatch.");
            }
        } else {
            if (isRequire) {
                throw new Error("TarsDecodeException require field not exist.");
            }
        }
        return n;
    }

    public readFloat(tag, isRequire) {
        let n = null;
        if (this.skipToTag(tag)) {
            let hd = new HeadData();
            this.readHead(hd);
            switch (hd.type) {
                case TarsStructBase.ZERO_TAG:
                    n = 0;
                    break;
                case TarsStructBase.FLOAT:
                    n = this.bs.readFloatBE();
                    break;
                default:
                    throw new Error("TarsDecodeException type mismatch.");
            }
        } else {
            if (isRequire) {
                throw new Error("TarsDecodeException require field not exist.");
            }
        }
        return n;
    }

    public readDouble(tag, isRequire) {
        let n = null;
        if (this.skipToTag(tag)) {
            let hd = new HeadData();
            this.readHead(hd);
            switch (hd.type) {
                case TarsStructBase.ZERO_TAG:
                    n = 0;
                    break;
                case TarsStructBase.FLOAT:
                    n = this.bs.readFloatBE();
                    break;
                case TarsStructBase.DOUBLE:
                    n = this.bs.readDoubleBE();
                    break;
                default:
                    throw new Error("TarsDecodeException type mismatch.");
            }
        } else {
            if (isRequire) {
                throw new Error("TarsDecodeException require field not exist.");
            }
        }
        return n;
    }

    public readHexString(tag, isRequire): string {
        let hex = '';
        let str = this.readByteString(tag, isRequire);

        for (let i = 0; i < str.length; i++) {
            hex += '' + str.charCodeAt(i).toString(16);
        }
        return hex;
    }

    public readByteString(tag, isRequire): string {
        let s = null;
        if (this.skipToTag(tag)) {
            let hd = new HeadData();
            this.readHead(hd);
            let len;
            switch (hd.type) {
                case TarsStructBase.STRING1:
                    len = this.bs.readInt8();
                    if (len < 0) {
                        len += 256;
                    }
                    s = this.bs.readString(len);
                    break;
                case TarsStructBase.STRING4:
                    len = this.bs.readInt32BE();
                    if (len > TarsStructBase.MAX_STRING_LENGTH || len < 0) {
                        throw new Error("TarsDecodeException String too long: {len}");
                    }
                    s = this.bs.readString(len);
                    break;
                default:
                    throw new Error("TarsDecodeException type mismatch.");
            }
        } else {
            if (isRequire) {
                throw new Error("TarsDecodeException require field not exist.");
            }
        }
        return s;
    }

    public readString(tag, isRequire): string {
        let s = null;
        if (this.skipToTag(tag)) {
            let hd = new HeadData();
            this.readHead(hd);
            let len, ss;
            switch (hd.type) {
                case TarsStructBase.STRING1:
                    len = this.bs.readInt8();
                    if (len < 0) {
                        len += 256;
                    }
                    ss = this.bs.readString(len);
                    s  = ss;
                    // s = mb_convert_encoding(ss, "UTF-8", ["UTF-8", this.sServerEncoding, "auto"]);
                    break;
                case TarsStructBase.STRING4:
                    len = this.bs.readInt32BE();
                    if (len > TarsStructBase.MAX_STRING_LENGTH || len < 0) {
                        throw new Error("TarsDecodeException String too long: {len}");
                    }
                    ss = this.bs.readString(len);
                    s  = ss;
                    // s = mb_convert_encoding(ss, ["UTF-8", this.sServerEncoding, "auto"]);
                    break;
                default:
                    throw new Error("TarsDecodeException type mismatch.");
            }
        } else {
            if (isRequire) {
                throw new Error("TarsDecodeException require field not exist.");
            }
        }
        return s;
    }

    public readStringMap(tag, isRequire) {
        let mr = new Map();
        if (this.skipToTag(tag)) {
            let hd = new HeadData();
            this.readHead(hd);
            switch (hd.type) {
                case TarsStructBase.MAP:
                    let size = this.readInt(0, true);
                    if (size < 0) {
                        throw new Error(`TarsDecodeException size invalid: {${size}}`);
                    }
                    for (let i = 0; i < size; ++i) {
                        let k = this.readString(0, true);
                        let v = this.readString(1, true);
                        mr.set(k, v);
                    }
                    break;
                default:
                    throw new Error("TarsDecodeException type mismatch.");
            }
        } else {
            if (isRequire) {
                throw new Error("TarsDecodeException require field not exist.");
            }
        }
        return mr;
    }

    public readTypeMap(mt, tag, isRequire) {
        let mr     = new Map(),
            mKey   = null,
            mValue = null;
        mt.forEach((tmpValue, tmpKey) => {
            mKey   = tmpKey.upperFirst();
            mValue = tmpValue.upperFirst();
        });
        if (this.skipToTag(tag)) {
            let hd = new HeadData();
            this.readHead(hd);
            switch (hd.type) {
                case TarsStructBase.MAP:
                    let size = this.readInt(0, true);
                    if (size < 0) {
                        throw new Error(`TarsDecodeException size invalid: {${size}}`);
                    }
                    for (let i = 0; i < size; ++i) {
                        let k = this[`read${mKey}`](0, true);
                        let v = this[`read${mValue}`](1, true);
                        mr.set(k, v);
                    }
                    break;
                default:
                    throw new Error("TarsDecodeException type mismatch.");
            }
        } else {
            if (isRequire) {
                throw new Error("TarsDecodeException require field not exist.");
            }
        }
        return mr;
    }

    public  readMap(tag, isRequire) {
        let mr = new Map();
        if (this.skipToTag(tag)) {
            let hd = new HeadData();
            this.readHead(hd);
            switch (hd.type) {
                case TarsStructBase.MAP:
                    let size = this.readInt(0, true);
                    if (size < 0) {
                        throw new Error("TarsDecodeException size invalid: {size}");
                    }
                    for (let i = 0; i < size; ++i) {
                        let k = this.read(0, true);
                        let v = this.read(1, true);
                        mr.set(k, v);
                    }
                    break;
                default:
                    throw new Error("TarsDecodeException type mismatch.");
            }
        } else {
            if (isRequire) {
                throw new Error("TarsDecodeException require field not exist.");
            }
        }
        return mr;
    }

    public readList(tag, isRequire) {
        //List lr = new ArrayList();
        let lr = [];
        if (this.skipToTag(tag)) {
            let hd = new HeadData();
            this.readHead(hd);
            switch (hd.type) {
                case TarsStructBase.LIST:
                    let size = this.readInt(0, true);
                    if (size < 0) {
                        throw new Error("TarsDecodeException size invalid: {size}");
                    }
                    for (let i = 0; i < size; ++i) {
                        let subH = new HeadData();
                        this.readHead(subH);
                        switch (subH.type) {
                            case TarsStructBase.BYTE:
                                this.skip(1);
                                break;
                            case TarsStructBase.SHORT:
                                this.skip(2);
                                break;
                            case TarsStructBase.INT:
                                this.skip(4);
                                break;
                            case TarsStructBase.LONG:
                                this.skip(8);
                                break;
                            case TarsStructBase.FLOAT:
                                this.skip(4);
                                break;
                            case TarsStructBase.DOUBLE:
                                this.skip(8);
                                break;
                            case TarsStructBase.STRING1:
                                let len = this.bs.readInt8();
                                if (len < 0) {
                                    len += 256;
                                }
                                this.skip(len);
                                break;
                            case TarsStructBase.STRING4:
                                this.skip(this.bs.readInt32BE());
                                break;
                            case TarsStructBase.MAP:
                                break;
                            case TarsStructBase.LIST:
                                break;
                            case TarsStructBase.SIMPLE_LIST:
                                break;
                            case TarsStructBase.STRUCT_BEGIN:
                                try {
                                    let struct = new TarsStructBase();
                                    struct.readFrom(this);
                                    this.skipToStructEnd();
                                    lr.push(struct);
                                } catch (e) {
                                    throw new Error("TarsDecodeException type mismatch. {e.getMessage()}");
                                }
                                break;
                            case TarsStructBase.ZERO_TAG:
                                lr.push(0);
                                break;
                            default:
                                throw new Error("TarsDecodeException type mismatch.");
                        }
                    }
                    break;
                default:
                    throw new Error("TarsDecodeException type mismatch.");
            }
        } else {
            if (isRequire) {
                throw new Error("TarsDecodeException require field not exist.");
            }
        }
        return lr;
    }

    public readSimpleList(tag, isRequire) {
        let lr;
        if (this.skipToTag(tag)) {
            let hd = new HeadData();
            this.readHead(hd);
            switch (hd.type) {
                case TarsStructBase.SIMPLE_LIST:
                    let hh = new HeadData();
                    this.readHead(hh);
                    if (hh.type != TarsStructBase.BYTE) {
                        throw new Error(`TarsDecodeException type mismatch, tag: ${tag}, type: ${hd.type}, ${hh.type}`);
                    }
                    let size = this.readInt(0, 0, true);
                    if (size < 0) throw new Error(`TarsDecodeException invalid size, tag: ${tag}, type: ${hd.type}, ${hh.type}, size: ${size}`);
                    lr = this.bs.readBuffer(size);
                    break;
                default:
                    throw new Error("TarsDecodeException type mismatch.");
            }
        } else {
            if (isRequire) {
                throw new Error("TarsDecodeException require field not exist.");
            }
        }
        return lr;
    }

    /**
     * @return mixed
     * @param tag
     * @param isRequire
     */
    public  readBooleanArray(tag, isRequire) {
        let lr = [];
        if (this.skipToTag(tag)) {
            let hd = new HeadData();
            this.readHead(hd);
            switch (hd.type) {
                case TarsStructBase.LIST:
                    let size = this.readInt(0, true);
                    if (size < 0) {
                        throw new Error("TarsDecodeException size invalid: {size}");
                    }
                    for (let i = 0; i < size; ++i) {
                        lr[i] = this.readBoolean(0, true);
                    }
                    break;
                default:
                    throw new Error("TarsDecodeException type mismatch.");
            }
        } else {
            if (isRequire) {
                throw new Error("TarsDecodeException require field not exist.");
            }
        }
        return lr;
    }

    /**
     * @return mixed
     * @param tag
     * @param isRequire
     */
    public  readByteArray(tag, isRequire) {
        let lr = [];
        if (this.skipToTag(tag)) {
            let hd = new HeadData();
            this.readHead(hd);
            switch (hd.type) {
                case TarsStructBase.SIMPLE_LIST:
                    let hh = new HeadData();
                    this.readHead(hh);
                    if (hh.type != TarsStructBase.BYTE) {
                        throw new Error("TarsDecodeException type mismatch, tag: {tag}, type: {hd.type}, {hh.type}");
                    }
                    let size = this.readInt(0, true);
                    if (size < 0) {
                        throw new Error("TarsDecodeException invalid size, tag: {tag}, type: {hd.type}, {hh.type}, size: {size}");
                    }
                    for (let i = 0; i < size; ++i) {
                        lr.push(this.bs.readInt8());
                    }
                    break;
                case TarsStructBase.LIST:
                    size = this.readInt(0, true);
                    if (size < 0) {
                        throw new Error("TarsDecodeException size invalid: {size}");
                    }
                    for (let i = 0; i < size; ++i) {
                        lr.push(this.readByte(0, true));
                    }
                    break;
                default:
                    throw new Error("TarsDecodeException type mismatch.");
            }
        } else {
            if (isRequire) {
                throw new Error("TarsDecodeException require field not exist.");
            }
        }
        return lr;
    }

    /**
     * @return array
     * @param tag
     * @param isRequire
     * @param sign
     */
    public  readShortArray(tag, isRequire, sign = true) {
        let lr = [];
        if (this.skipToTag(tag)) {
            let hd = new HeadData();
            this.readHead(hd);
            switch (hd.type) {
                case TarsStructBase.LIST:
                    let size = this.readInt(0, 0, true);
                    if (size < 0) {
                        throw new Error("TarsDecodeException size invalid: {size}");
                    }
                    for (let i = 0; i < size; ++i) {
                        lr[i] = this.readShort(0, true, sign);
                    }
                    break;
                default:
                    throw new Error("TarsDecodeException type mismatch.");
            }
        } else {
            if (isRequire) {
                throw new Error("TarsDecodeException require field not exist.");
            }
        }
        return lr;
    }

    /**
     * @return mixed
     * @internal param \int[] l
     * @param tag
     * @param isRequire
     * @param sign
     */
    public  readIntArray(tag, isRequire, sign = true) {
        let lr = [];
        if (this.skipToTag(tag)) {
            let hd = new HeadData();
            this.readHead(hd);
            switch (hd.type) {
                case TarsStructBase.LIST:
                    let size = this.readInt(0, true, sign);
                    if (size < 0) {
                        throw new Error("TarsDecodeException size invalid: {size}");
                    }
                    for (let i = 0; i < size; ++i) {
                        lr[i] = this.readInt(0, true, sign);
                    }
                    break;
                default:
                    throw new Error("TarsDecodeException type mismatch.");
            }
        } else {
            if (isRequire) {
                throw new Error("TarsDecodeException require field not exist.");
            }
        }
        return lr;
    }

    /**
     * @return mixed
     * @internal param long[] l
     * @param tag
     * @param isRequire
     * @param sign
     */
    public readLongArray(tag, isRequire, sign = true) {
        let lr = [];
        if (this.skipToTag(tag)) {
            let hd = new HeadData();
            this.readHead(hd);
            switch (hd.type) {
                case TarsStructBase.LIST:
                    let size = this.readInt(0, true, sign);
                    if (size < 0) {
                        throw new Error("TarsDecodeException size invalid: {size}");
                    }
                    for (let i = 0; i < size; ++i) {
                        lr[i] = this.readLong(0, true, sign);
                    }
                    break;
                default:
                    throw new Error("TarsDecodeException type mismatch.");
            }
        } else {
            if (isRequire) {
                throw new Error("TarsDecodeException require field not exist.");
            }
        }
        return lr;
    }

    /**
     * @param float[] l
     * @param int     tag
     * @param bool    isRequire
     * @return mixed
     */
    public readFloatArray(l, tag, isRequire) {
        let lr = null;
        if (this.skipToTag(tag)) {
            let hd = new HeadData();
            this.readHead(hd);
            switch (hd.type) {
                case TarsStructBase.LIST:
                    let size = this.readInt(0, 0, true);
                    if (size < 0) {
                        throw new Error("TarsDecodeException size invalid: {size}");
                    }
                    for (let i = 0; i < size; ++i) {
                        lr[i] = this.readFloat(0, true);
                    }
                    break;
                default:
                    throw new Error("TarsDecodeException type mismatch.");
            }
        } else {
            if (isRequire) {
                throw new Error("TarsDecodeException require field not exist.");
            }
        }
        return lr;
    }

    /**
     * @return mixed
     * @param tag
     * @param isRequire
     */
    public  readDoubleArray(tag, isRequire) {
        let lr = null;
        if (this.skipToTag(tag)) {
            let hd = new HeadData();
            this.readHead(hd);
            switch (hd.type) {
                case TarsStructBase.LIST:
                    let size = this.readInt(0, 0, true);
                    if (size < 0) {
                        throw new Error(`TarsDecodeException size invalid: {${size}}`);
                    }
                    for (let i = 0; i < size; ++i) {
                        lr[i] = this.readDouble(0, true);
                    }
                    break;
                default:
                    throw new Error("TarsDecodeException type mismatch.");
            }
        } else {
            if (isRequire) {
                throw new Error("TarsDecodeException require field not exist.");
            }
        }
        return lr;
    }

    public readStringArray(tag, isRequire) {
        let lr = null;
        if (this.skipToTag(tag)) {
            let hd = new HeadData();
            this.readHead(hd);
            switch (hd.type) {
                case TarsStructBase.LIST:
                    let size = this.readInt(0, 0, true);
                    if (size < 0) {
                        throw new Error(`TarsDecodeException size invalid: {${size}}`);
                    }
                    for (let i = 0; i < size; ++i) {
                        lr[i] = this.readString(0, true);
                    }
                    break;
                default:
                    throw new Error("TarsDecodeException type mismatch.");
            }
        } else {
            if (isRequire) {
                throw new Error("TarsDecodeException require field not exist.");
            }
        }
        return lr;
    }

    /**
     *
     * @return mixed
     * @internal param l
     * @param mt
     * @param tag
     * @param isRequire
     */
    public  readArray(mt, tag, isRequire) {
        return this.readArrayImpl(mt, tag, isRequire);
    }

    /**
     * @return null
     * @param mt
     * @param tag
     * @param isRequire
     */
    private  readArrayImpl(mt, tag, isRequire) {
        if (this.skipToTag(tag)) {
            let hd = new HeadData();
            this.readHead(hd);
            switch (hd.type) {
                case TarsStructBase.LIST:
                    let size = this.readInt(0, true);
                    if (size < 0) {
                        throw new Error("TarsDecodeException size invalid: {size}");
                    }
                    let lr = [];
                    if (isArray(mt)) {
                        let readMethod = "readMap";
                        for (let i = 0; i < size; ++i) {
                            let t = this[readMethod](mt, 0, true);
                            lr[i] = t;
                        }
                        return lr;
                    } else if (isString(mt)) {
                        let readMethod = `read${mt.upperFirst()}`;
                        for (let i = 0; i < size; ++i) {
                            let t = this[readMethod](0, true);
                            lr[i] = t;
                        }
                        return lr;
                    } else {
                        throw new Error("InvalidArgumentException read array must be string or array");
                    }
                default:
                    throw new Error("TarsDecodeException type mismatch.");
            }
        } else {
            if (isRequire) {
                throw new Error("TarsDecodeException require field not exist.");
            }
        }
        return null;
    }

    public  directReadTarsStruct(o, tag, isRequire) {
        let ref = o;
        if (this.skipToTag(tag)) {
            //try {
            //    ref = o.newInit();
            //} catch (Exception e) {
            //    throw new TarsDecodeException(e->getMessage());
            //}
            let hd = new HeadData();
            this.readHead(hd);
            if (hd.type != TarsStructBase.STRUCT_BEGIN) {
                throw new Error("TarsDecodeException type mismatch.");
            }
            ref.readFrom(this);
            this.skipToStructEnd();
        } else {
            if (isRequire) {
                throw new Error("TarsDecodeException require field not exist.");
            }
        }
        return ref;
    }

    /**
     * @return null|ReflectionClass
     * @param o
     * @param tag
     * @param isRequire
     */
    public readTarsStruct(o, tag, isRequire) {
        let ref = null;
        if (this.skipToTag(tag)) {
            if (true == true) {
                throw Error('not implemented yet');
            }
            try {
                //ref = o.getClass().newInstance();
                /** @var TarsStructBase ref */
                if (o instanceof TarsStructBase) {
                    ref = o;
                } else {
                    // ref = new ReflectionClass(o);
                }
            } catch (e) {
                throw new Error(`TarsDecodeException ${e.getMessage()}`);
            }
            let hd = new HeadData();
            this.readHead(hd);
            if (hd.type != TarsStructBase.STRUCT_BEGIN) {
                throw new Error("TarsDecodeException type mismatch.");
            }
            ref.readFrom(this);
            this.skipToStructEnd();
        } else {
            if (isRequire) {
                throw new Error("TarsDecodeException require field not exist.");
            }
        }
        return ref;
    }

    /**
     * @return mixed
     * @param o
     * @param tag
     * @param isRequire
     */
    public readTarsStructArray(o, tag, isRequire) {
        return this.readArray(o, tag, isRequire);
    }

    public read(tag, isRequire, debugContext = new TarsContext()) {
        let lr = [];
        if (this.skipToTag(tag)) {
            let hd = new HeadData();
            this.peekHead(hd);
            switch (hd.type) {
                case TarsStructBase.BYTE:
                    return this.readByte(tag, isRequire);
                case TarsStructBase.SHORT:
                    return this.readShort(tag, isRequire);
                case TarsStructBase.INT:
                    return this.readInt(tag, isRequire);
                case TarsStructBase.LONG:
                    return this.readLong(tag, isRequire);
                case TarsStructBase.FLOAT:
                    return this.readFloat(tag, isRequire);
                case TarsStructBase.DOUBLE:
                    return this.readDouble(tag, isRequire);
                case TarsStructBase.STRING1:
                    return this.readString(tag, isRequire);
                case TarsStructBase.STRING4:
                    return this.readString(tag, isRequire);
                case TarsStructBase.MAP:
                    return this.readMap(tag, isRequire);
                case TarsStructBase.LIST:
                    return this.readList(tag, isRequire);
                case TarsStructBase.SIMPLE_LIST:
                    return this.readSimpleList(tag, isRequire);
                case TarsStructBase.STRUCT_BEGIN:
                    /** inline parse */
                    let struct;
                    try {
                        struct = new TarsStructBase();
                    } catch (e) {
                        throw new Error(`TarsDecodeException type mismatch. ${e.message}`);
                    }
                    this.readHead(hd);
                    struct.readFrom(this, debugContext);
                    this.skipToStructEnd();
                    lr.push(struct);
                    break;
                case TarsStructBase.ZERO_TAG:
                    lr.push(0);
                    break;
                default:
                    throw new Error("TarsDecodeException type mismatch.");
            }
        } else {
            if (isRequire) {
                throw new Error("TarsDecodeException require field not exist.");
            }
        }
    }

    public readStruct(o, tag, isRequire) {
        let ref: TarsStructBase = null;
        if (this.skipToTag(tag)) {
            try {
                ref = o.getClass().newInstance();
            } catch (e) {
                throw new Error(`TarsDecodeException ${e.message}`);
            }

            let hd = new HeadData();
            this.readHead(hd);
            if (hd.type != TarsStructBase.STRUCT_BEGIN) throw new Error("TarsDecodeException type mismatch.");
            ref.readFrom(this);
            this.skipToStructEnd();
        } else if (isRequire) {
            throw new Error("TarsDecodeException require field not exist.");
        }
        return ref;
    }

    public getBs() {
        return this.bs;
    }
}
