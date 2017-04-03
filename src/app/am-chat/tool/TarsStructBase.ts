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
                debugContext.setField(`${hd.tag}|BYTE`, tarsInputStream.readByte(hd.tag, true));
                break;
            case TarsStructBase.SHORT:
                debugContext.setField(`${hd.tag}|SHORT`, tarsInputStream.readShort(hd.tag, true));
                break;
            case TarsStructBase.INT:
                debugContext.setField(`${hd.tag}|INT`, tarsInputStream.readInt(hd.tag, true));
                break;
            case TarsStructBase.LONG:
                debugContext.setField(`${hd.tag}|LONG`, tarsInputStream.readLong(hd.tag, true));
                break;
            case TarsStructBase.FLOAT:
                debugContext.setField(`${hd.tag}|FLOAT`, tarsInputStream.readFloat(hd.tag, true));
                break;
            case TarsStructBase.DOUBLE:
                debugContext.setField(`${hd.tag}|DOUBLE`, tarsInputStream.readDouble(hd.tag, true));
                break;
            case TarsStructBase.STRING1:
                debugContext.setField(`${hd.tag}|STRING1`, tarsInputStream.readString(hd.tag, true));
                break;
            case TarsStructBase.STRING4:
                debugContext.setField(`${hd.tag}|STRING4`, tarsInputStream.readString(hd.tag, true));
                break;
            case TarsStructBase.ZERO_TAG:
                debugContext.setField(`${hd.tag}|ZERO_TAG`, tarsInputStream.readByte(hd.tag, true));
                break;
            case TarsStructBase.MAP:
                let map = <Map<any, any>>tarsInputStream.read(hd.tag, true);

                let mapList                      = [];
                map.forEach((mValue, mKey) => {
                    if (mKey instanceof Buffer) {
                        let ctx = new TarsContext();
                        this.tryParse(TarsInputStream.fromBuffer(mKey), ctx);
                        debugContext.setField(`0|MapKey`, ctx);
                    } else {
                        debugContext.setField(`0|MapKey`, mKey);
                    }
                    if (mValue instanceof Buffer) {
                        let ctx = new TarsContext();
                        this.tryParse(TarsInputStream.fromBuffer(mValue), ctx);
                        debugContext.setField(`1|MapValue`, ctx);
                    } else {
                        debugContext.setField(`1|MapValue`, mValue);
                    }
                    mapList.push(ctx);
                });
                break;
            case TarsStructBase.LIST:
                debugContext[`${hd.tag}|${key}`] = tarsInputStream.read(hd.tag, true);
                break;
            case TarsStructBase.STRUCT_BEGIN:
                let ctx = new TarsContext();
                tarsInputStream.read(hd.tag, true, ctx);
                debugContext.setField(`${hd.tag}|STRUCT`, ctx);
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

}
