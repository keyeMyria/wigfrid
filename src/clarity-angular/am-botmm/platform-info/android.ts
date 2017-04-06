import {Buffer} from "buffer";

import {injectable} from "inversify";

@injectable()
export class Android {
    public imei;
    public version;
    // public appId;
    // public pcVersion;
    public osType: string;
    public osVersion: string;
    public imsi;
    // public networkType;
    // public netDetail;
    // public apn;
    public device;
    public deviceType: Buffer;
    public deviceName;
    public guid;
    public deviceBrand;
    public android_device_id;

    /** 网络环境md5, 在java中可能用的是imei变量名*/
    public android_device_mac_hash;

    constructor() {
        this.imei                    = Buffer.from("864394010160994");
        this.version                 = Buffer.from("foo");
        this.osType                  = "android";
        this.osVersion               = "4.4.2";
        // imsi: "5F 64 AA B8 ED A2 E7 73 CA 1D 79 5D E6 19 19 68" #"460071609915509" #md5(imsi)   //md5(imsi) SIM Subscriber ID
        this.imsi                    = Buffer.from("5F64AAB8EDA2E773CA1D795DE6191968", "hex");
        this.device                  = Buffer.from("foo");
        this.deviceType              = Buffer.from("MI 4LTE");
        this.guid                    = Buffer.from("d16160d5b356a0a54fb99324a363286b", "hex");
        this.deviceBrand             = Buffer.from("Xiaomi");
        this.deviceName              = Buffer.from("Xiaomi");
        //#"A0999B095FFF0000"
        this.android_device_id       = Buffer.from("9006af4d148c1822881f7efe8e6df239", "hex");
        this.android_device_mac_hash = Buffer.from("d16160d5b356a0a54fb99324a363286b", "hex");
    }
}
