import {inject, injectable} from "inversify";
import {Android} from "./android";
import {Network} from "./network";
import {Apk} from "./apk";
import {FixRuntime} from "./fix-runtime";
import {Buffer} from "buffer";

@injectable()
export class PlatformInfo {

    @inject(Android)
    public android: Android;

    @inject(Network)
    public network: Network;

    @inject(Apk)
    public apk: Apk;

    @inject(FixRuntime)
    public fixRuntime: FixRuntime;
}
