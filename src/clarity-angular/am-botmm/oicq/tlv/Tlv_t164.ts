import {Tlv_t} from "./Tlv_t";
import {injectable} from "inversify";

@injectable()
export class Tlv_t164 extends Tlv_t {
    public constructor() {
        super();
        this._cmd = 356;
    }
}
