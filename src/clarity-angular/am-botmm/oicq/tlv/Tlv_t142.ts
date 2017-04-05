import {Tlv_t} from "./Tlv_t";
import {inject, injectable} from "inversify";
import {MmInfo} from "../../mm-info/mm-info";
import {PlatformInfo} from "../../platform-info/platform-info";

@injectable()
export class Tlv_t142 extends Tlv_t {
    protected _t142_body_len;
    protected _version;

    public constructor(
        @inject(PlatformInfo)
        public platformInfo: PlatformInfo,
        @inject(MmInfo)
        public mmInfo: MmInfo,
    ) {
        super();
        this._version       = 0;
        this._t142_body_len = 0;
        this._cmd           = 0x142;
    }

    /**
     * @param $id ﻿_apk_id
     * @return mixed
     */
    public get_tlv_142(id: Buffer) {
        let id_len          = id.length;
        this._t142_body_len = id_len + 4;
        let body            = new Buffer(this._t142_body_len);
        let pos             = 0;
        body.writeUInt16BE(this._version, pos);
        pos += 2;
        body.writeUInt16BE(id_len, pos);
        pos += 2;
        id.copy(body, pos, 0, id_len);
        pos += id_len;
        this.fill_head(this._cmd);
        this.fill_body(body, pos);
        this.set_length();
        return this.get_buf();
    }

    public serialize(): Buffer {
        return this.get_tlv_142(
            this.platformInfo.apk.apkId
        )
    }
}
