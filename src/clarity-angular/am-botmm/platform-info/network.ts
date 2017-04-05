import {injectable} from "inversify";
import {Buffer} from "buffer";

@injectable()
export class Network {
    public bssid;
    public ssid;
    public networkType: number;
    public operatorName;
    public netDetail;
    public apn;
    public clientIp;

    public addr = 0;

    private mac: Buffer;
    public macHash: Buffer;

    public constructor() {
        //bssid: "FA DB FA D6 6E F7 15 71 BD 7B 99 2D 9D 9C 5D B7" # //md5(bassaddr) mac md5((XX:XX:XX:XX:XX:XX).tolowercase())
        this.bssid       = Buffer.from("FADBFAD66EF71571BD7B992D9D9C5DB7");
        this.ssid        = Buffer.from("AndroidAP");
        this.networkType = 0x2;
        this.netDetail   = Buffer.from("CMCC");
        this.apn         = Buffer.from("wifi");
        this.mac         = Buffer.from("A0:99:9B:09:5F:FF");
        this.macHash     = Buffer.from("a3138a8dd17ee1a58463d75683180e87");
        this.clientIp    = Buffer.alloc(4, 0);
    }
}
