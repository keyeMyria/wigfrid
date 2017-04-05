

import {injectable} from "inversify";
import {Buffer} from "buffer";

@injectable()
export class Network {
    public bssid;
    public ssid;
    public networkType;
    public operatorName;
    public netDetail;
    public apn;
    public clientIp;

    public addr = 0;
}
