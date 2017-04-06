import {Tlv_t} from "./Tlv_t";
import {Cryptor} from "../crypt/Cryptor";
import {inject, injectable} from "inversify";
import {MmInfo} from "../../mm-info/mm-info";
import {PlatformInfo} from "../../platform-info/platform-info";
import {Tlv_t109} from "./Tlv_t109";
import {Tlv_t124} from "./Tlv_t124";
import {Tlv_t128} from "./Tlv_t128";
import {Tlv_t16e} from "./Tlv_t16e";
import {Buffer} from "buffer";

@injectable()
export class Tlv_t144 extends Tlv_t {
    public _t144_body_len;

    public constructor(
        @inject(PlatformInfo)
        public platformInfo: PlatformInfo,
        @inject(MmInfo)
        public mmInfo: MmInfo,
        @inject(Tlv_t109)
        private tlv109: Tlv_t109,
        @inject(Tlv_t124)
        private tlv124: Tlv_t124,
        @inject(Tlv_t128)
        private tlv128: Tlv_t128,
        @inject(Tlv_t16e)
        private tlv16e: Tlv_t16e
    ) {
        super();
        this._t144_body_len = 0;
        this._cmd           = 324;
    }

    /**
     * @param list  _109
     *              _124
     *              _128
     *              _147
     *              _148
     *              _151
     *              _153
     *
     * @param key
     * @return mixed
     */
    public  get_tlv_144(list: Buffer[], key: Buffer) {
        let tlv_num = list.length;
        let in_len  = 0;

        list.map((pack) => {
            in_len += pack.length;
        });

        let body = new Buffer(in_len + 2);
        let pos  = 0;
        body.writeUInt16BE(tlv_num, pos);
        pos += 2;
        for (let i = 0; i < list.length; i++) {
            list[i].copy(body, pos);
            pos += list[i].length;
        }
        body                = Cryptor.encrypt(body, key);
        this._t144_body_len = body.length;
        this.fill_head(this._cmd);
        this.fill_body(body, this._t144_body_len);
        this.set_length();
        return this.get_buf();
    }

    public serialize(): Buffer {
        return this.get_tlv_144(
            [
                this.tlv109.serialize(),
                this.tlv124.serialize(),
                this.tlv128.serialize(),
                this.tlv16e.serialize(),
            ],
            this.mmInfo.TGTGT
        )
    }
}
