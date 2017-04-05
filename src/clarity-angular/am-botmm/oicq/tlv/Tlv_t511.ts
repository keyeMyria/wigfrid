import {Tlv_t} from "./Tlv_t";
import {injectable} from "inversify";

@injectable()
export class Tlv_t511 extends Tlv_t {
    public constructor() {
        super();
        this._cmd = 0x511;
    }

    /**
     */
    public get_tlv_511(list: any[]) {
        let body = Buffer.alloc(512);
        let p    = 0;
        body.writeInt16BE(list.length, p);
        p += 2;
        for (let index = 0; index < list.length; index++) {
            //$string = $list[$index];
            //$n2     = $string[0x28];
            //$n3     = $string[0x29];
            //if ($n2 == 0 && $n3 > 0) {
            //    $n4 = substr($string, $n2 + 1, $n3);
            //    $n2 = (0x100000 & $n4) > 0 ? 1 : 0;
            //    $n4 = ($n4 & 0x8000000) > 0 ? 1 : 0;
            //    if ($n4) {
            //        $by2 = $n2 | 2;
            //    } else {
            //        $by2 = $n2;
            //    }
            //    $string = substr($string, $n3 + 1);
            //} else {
            //    $by2 = 1;
            //}
            body.writeInt8(1, p);
            p++;
            body.writeInt16BE(list[index].length, p);
            p += 2;
            body.write(list[index]);
            p += list[index].length;
        }
        this.fill_head(this._cmd);
        this.fill_body(body, p);
        this.set_length();
        return this.get_buf();
    }
}
