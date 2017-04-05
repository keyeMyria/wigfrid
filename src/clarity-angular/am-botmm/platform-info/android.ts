import {Buffer} from "buffer";

import {injectable} from "inversify";

@injectable()
export class Android {
    public imei;
    public version;
    public appId;
    public pcVersion;
    public osType;
    public osVersion;
    public imsi;
    public networkType;
    public netDetail;
    public apn;
    public device;
    public deviceType;
    public deviceName;
    public guid;
    public deviceBrand;
    public android_device_id;
    /**
     * 网络环境md5, 在java中可能用的是imei变量名
     * @var string
     */
    public android_device_mac_hash;
}
