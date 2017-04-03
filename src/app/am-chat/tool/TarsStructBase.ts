import {HeadData, TarsInputStream} from "./TarsInputStream";
import {Buffer} from "buffer";
import {TarsContext} from "./TarsContext";

export class TarsStructBase {
    public static BYTE              = 0;
    public static SHORT             = 1;
    public static INT               = 2;
    public static LONG              = 3;
    public static FLOAT             = 4;
    public static DOUBLE            = 5;
    public static STRING1           = 6;
    public static STRING4           = 7;
    public static MAP               = 8;
    public static LIST              = 9;
    public static STRUCT_BEGIN      = 10;
    public static STRUCT_END        = 11;
    public static ZERO_TAG          = 12;
    public static SIMPLE_LIST       = 13;
    public static MAX_STRING_LENGTH = 100 * 1024 * 1024;

    // abstract  writeTo(os);

    // abstract  readFrom(is);

    public  display(sb, level): void {
    }

    public  displaySimple(sb, level): void {
    }

    public  newInit() {
        return null;
    }

    public  recyle() {
    }

    public  containField(name) {
        return false;
    }

    public  getFieldByName(name) {
        return null;
    }

    public  setFieldByName(name, value) {
    }

    public readFrom(stream: TarsInputStream, debugContext = new TarsContext()) {
        let i = 1000, tag = 0;
        while (--i > 0) {
            let hd = new HeadData();
            if (!stream.peekHead(hd)) {
                break
            }
            if (tag++ > hd.tag) {
                break;
            }

            try {
                this.tryParse(stream, debugContext);
            } catch (e) {

            }
        }
        if (i == 0) throw new Error("TarsStruct read recursion");
    }

    private tryParse(tarsInputStream, debugContext: TarsContext) {
        let hd  = new HeadData();
        let key = '';
        tarsInputStream.peekHead(hd);
        switch (hd.type) {
            case TarsStructBase.BYTE:
                key                              = 'BYTE';
                debugContext[`${hd.tag}|${key}`] = tarsInputStream.readByte(hd.tag, true);
                break;
            case TarsStructBase.SHORT:
                key                              = 'SHORT';
                debugContext[`${hd.tag}|${key}`] = tarsInputStream.readShort(hd.tag, true);
                break;
            case TarsStructBase.INT:
                key                              = 'INT';
                debugContext[`${hd.tag}|${key}`] = tarsInputStream.readInt(hd.tag, true);
                break;
            case TarsStructBase.LONG:
                key                              = 'LONG';
                debugContext[`${hd.tag}|${key}`] = tarsInputStream.readLong(hd.tag, true);
                break;
            case TarsStructBase.FLOAT:
                key                              = 'FLOAT';
                debugContext[`${hd.tag}|${key}`] = tarsInputStream.readFloat(hd.tag, true);
                break;
            case TarsStructBase.DOUBLE:
                key                              = 'DOUBLE';
                debugContext[`${hd.tag}|${key}`] = tarsInputStream.readDouble(hd.tag, true);
                break;
            case TarsStructBase.STRING1:
                key                              = 'STRING1';
                debugContext[`${hd.tag}|${key}`] = tarsInputStream.readString(hd.tag, true);
                break;
            case TarsStructBase.STRING4:
                key                              = 'STRING4';
                debugContext[`${hd.tag}|${key}`] = tarsInputStream.readString(hd.tag, true);
                break;
            case TarsStructBase.ZERO_TAG:
                key                              = 'ZERO_TAG';
                debugContext[`${hd.tag}|${key}`] = tarsInputStream.readByte(hd.tag, true);
                break;
            case TarsStructBase.MAP:
                key     = 'MAP';
                let map = <Map<any, any>>tarsInputStream.read(hd.tag, true);

                let mapList                      = [];
                debugContext[`${hd.tag}|${key}`] = mapList;
                map.forEach((mValue, mKey) => {
                    let ctx = {};
                    if (mKey instanceof Buffer) {
                        ctx[`0|Buffer`] = this.tryParse(TarsInputStream.fromBuffer(mKey));
                    } else {
                        ctx[`0|todo`] = mKey;
                    }
                    if (mValue instanceof Buffer) {
                        ctx[`1|Buffer`] = this.tryParse(TarsInputStream.fromBuffer(mValue));
                    } else {
                        ctx[`1|todo`] = mValue;
                    }
                    mapList.push(ctx);
                });
                debugContext[`${hd.tag}|${key}`] = mapList;
                break;
            case TarsStructBase.LIST:
                debugContext[`${hd.tag}|${key}`] = tarsInputStream.read(hd.tag, true);
                break;
            case TarsStructBase.STRUCT_BEGIN:
                let ctx = {};
                tarsInputStream.read(hd.tag, true, ctx);
                debugContext[`${hd.tag}|${key}`] = ctx;
                break;
            case TarsStructBase.STRUCT_END:
                debugContext[`${hd.tag}|${key}`] = tarsInputStream.read(hd.tag, true);
                break;
            case TarsStructBase.SIMPLE_LIST:
                debugContext[`${hd.tag}|${key}`] = tarsInputStream.read(hd.tag, true);
                break;
            default:
        }
        return debugContext;
    }

    public  __toString() {
    }
}
