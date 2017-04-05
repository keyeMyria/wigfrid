import {createHash, randomBytes} from "crypto";
import * as Int64 from "node-int64";
import {Buffer} from "buffer";
import {injectable} from "inversify";

@injectable()
export class MmInfo {

    public Account;        // 文本型       qq
    public mm;             // 文本型       qq 10
    public uin: Buffer;            // 64位
    public uin32: number;          // 32位
    // public ksid;           // 字节集
    public user;           // 字节集       qq_hex
    public caption;        // 字节集       qq_utf-8
    public pass;           // 文本型
    public md5;            // 字节集
    public md52;           // 字节集
    public time;           // 字节集
    public key;            // 字节集
    public nick;           // 文本型
    public Token002C;      // 字节集
    public Token004C;      // 字节集      A2
    public Token0058;      // 字节集
    //public $TGTKey;         // 字节集
    public shareKey;       // 字节集
    public pubKey;         // 字节集
    public randKey;        // 字节集
    public mST1Key;        // 字节集      transport秘药
    public stweb;          // 文本型
    public skey;           // 字节集
    public pskey;          // 字节集      01 6C 暂时没返回
    public superkey;       // 字节集      01 6D 暂时没返回
    public vkey;           // 字节集
    public sid;            // 字节集
    public sessionKey;     // 字节集
    public loginState;     // 整数型      登陆是否验证成功
    public VieryToken;     // 字节集      验证码token
    public VieryToken2;    // 字节集      验证码token
    public Viery;          // 字节集      验证码

    public TGTGT;
    public bitmap  = 0x57ff7c; //WtloginHelper mMiscBitmap
    public get_sig = 0x10400; //WtloginHelper mSubSigMap
    public picType;
    public capType;
    public picSize;
    public retType;

    public rollbackSig;

    public constructor() {
        let mm, pwd;
        this.mm = mm = pwd = "999999999012";
        this.uin   = new Int64(parseInt(mm).toString(16)).toBuffer();
        this.uin32 = this.uin.readUInt32BE(4);

        this.md5 = createHash('md5').update(pwd).digest();

        this.md52 = createHash('md5').update(this.md5).update(this.uin).digest();

        this.TGTGT = randomBytes(16);

        this.randKey  = Buffer.from("223610B9E907A9165A6D388EAE3C7748");
        this.pubKey   = Buffer.from("034B6B9F22CEC867839787AA32067AE2B3BD9D578F20976DB4");
        this.shareKey = Buffer.from("7d1ffc96239d17a236f122d2b497a300");
        this.key      = Buffer.alloc(16, 0);
    }

    public init(mm: string, pwd: string) {

        this.mm    = mm;
        this.uin   = new Int64(parseInt(mm).toString(16)).toBuffer();
        this.uin32 = this.uin.slice(4, 8).readUInt32BE(0);

        this.md5 = createHash('md5').update(pwd).digest();

        this.md52 = createHash('md5').update(this.md5).update(this.uin).digest();
    }

}
