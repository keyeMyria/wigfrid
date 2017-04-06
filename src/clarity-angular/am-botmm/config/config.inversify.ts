import {Container} from "inversify";
import {
    Tlv_t,
    Tlv_t1,
    Tlv_t100,
    Tlv_t102,
    Tlv_t103,
    Tlv_t104,
    Tlv_t105,
    Tlv_t106,
    Tlv_t107,
    Tlv_t108,
    Tlv_t109,
    Tlv_t10a,
    Tlv_t10b,
    Tlv_t10c,
    Tlv_t10d,
    Tlv_t10e,
    Tlv_t113,
    Tlv_t114,
    Tlv_t116,
    Tlv_t119,
    Tlv_t11a,
    Tlv_t11c,
    Tlv_t11d,
    Tlv_t11f,
    Tlv_t120,
    Tlv_t121,
    Tlv_t122,
    Tlv_t124,
    Tlv_t125,
    Tlv_t126,
    Tlv_t128,
    Tlv_t129,
    Tlv_t130,
    Tlv_t132,
    Tlv_t133,
    Tlv_t134,
    Tlv_t135,
    Tlv_t136,
    Tlv_t138,
    Tlv_t140,
    Tlv_t141,
    Tlv_t142,
    Tlv_t143,
    Tlv_t144,
    Tlv_t145,
    Tlv_t146,
    Tlv_t147,
    Tlv_t148,
    Tlv_t149,
    Tlv_t150,
    Tlv_t151,
    Tlv_t152,
    Tlv_t153,
    Tlv_t154,
    Tlv_t164,
    Tlv_t165,
    Tlv_t166,
    Tlv_t167,
    Tlv_t169,
    Tlv_t16a,
    Tlv_t16b,
    Tlv_t16e,
    Tlv_t171,
    Tlv_t172,
    Tlv_t177,
    Tlv_t18,
    Tlv_t187,
    Tlv_t188,
    Tlv_t191,
    Tlv_t194,
    Tlv_t2,
    Tlv_t202,
    Tlv_t305,
    Tlv_t511,
    Tlv_t516,
    Tlv_t521,
    Tlv_t522,
    Tlv_t525,
    Tlv_t8,
    Tlv_ta,
    Tlv_tc
} from "../oicq/index";
import {PlatformInfo} from "../platform-info/platform-info";
import {Android} from "../platform-info/android";
import {Apk} from "../platform-info/apk";
import {FixRuntime} from "../platform-info/fix-runtime";
import {Network} from "../platform-info/network";
import {MmInfo} from "../mm-info/mm-info";
import {LoginPack} from "../pack/login-pack";
import {WupBuffer} from "../pack/wup-buffer";
import {SsoMessage} from "../pack/sso-message";


let container = new Container();

container.bind(LoginPack).to(LoginPack);

container.bind(WupBuffer).to(WupBuffer);
container.bind(SsoMessage).to(SsoMessage);

container.bind(Android).to(Android).inSingletonScope();
container.bind(Apk).to(Apk).inSingletonScope();
container.bind(FixRuntime).to(FixRuntime).inSingletonScope();
container.bind(Network).to(Network).inSingletonScope();
container.bind(PlatformInfo).to(PlatformInfo).inSingletonScope();

container.bind(MmInfo).to(MmInfo).inSingletonScope();

container.bind<Tlv_t>(Tlv_t1).to(Tlv_t1);
container.bind<Tlv_t>(Tlv_t2).to(Tlv_t2);
container.bind<Tlv_t>(Tlv_t8).to(Tlv_t8);
container.bind<Tlv_t>(Tlv_t10a).to(Tlv_t10a);
container.bind<Tlv_t>(Tlv_t10b).to(Tlv_t10b);
container.bind<Tlv_t>(Tlv_t10c).to(Tlv_t10c);
container.bind<Tlv_t>(Tlv_t10d).to(Tlv_t10d);
container.bind<Tlv_t>(Tlv_t10e).to(Tlv_t10e);
container.bind<Tlv_t>(Tlv_t11a).to(Tlv_t11a);
container.bind<Tlv_t>(Tlv_t11c).to(Tlv_t11c);
container.bind<Tlv_t>(Tlv_t11d).to(Tlv_t11d);
container.bind<Tlv_t>(Tlv_t11f).to(Tlv_t11f);
container.bind<Tlv_t>(Tlv_t16a).to(Tlv_t16a);
container.bind<Tlv_t>(Tlv_t16b).to(Tlv_t16b);
container.bind<Tlv_t>(Tlv_t16e).to(Tlv_t16e);
container.bind<Tlv_t>(Tlv_t18).to(Tlv_t18);
container.bind<Tlv_t>(Tlv_t100).to(Tlv_t100);
container.bind<Tlv_t>(Tlv_t102).to(Tlv_t102);
container.bind<Tlv_t>(Tlv_t103).to(Tlv_t103);
container.bind<Tlv_t>(Tlv_t104).to(Tlv_t104);
container.bind<Tlv_t>(Tlv_t105).to(Tlv_t105);
container.bind<Tlv_t>(Tlv_t106).to(Tlv_t106);
container.bind<Tlv_t>(Tlv_t107).to(Tlv_t107);
container.bind<Tlv_t>(Tlv_t108).to(Tlv_t108);
container.bind<Tlv_t>(Tlv_t109).to(Tlv_t109);
container.bind<Tlv_t>(Tlv_t113).to(Tlv_t113);
container.bind<Tlv_t>(Tlv_t114).to(Tlv_t114);
container.bind<Tlv_t>(Tlv_t116).to(Tlv_t116);
container.bind<Tlv_t>(Tlv_t119).to(Tlv_t119);
container.bind<Tlv_t>(Tlv_t120).to(Tlv_t120);
container.bind<Tlv_t>(Tlv_t121).to(Tlv_t121);
container.bind<Tlv_t>(Tlv_t122).to(Tlv_t122);
container.bind<Tlv_t>(Tlv_t124).to(Tlv_t124);
container.bind<Tlv_t>(Tlv_t125).to(Tlv_t125);
container.bind<Tlv_t>(Tlv_t126).to(Tlv_t126);
container.bind<Tlv_t>(Tlv_t128).to(Tlv_t128);
container.bind<Tlv_t>(Tlv_t129).to(Tlv_t129);
container.bind<Tlv_t>(Tlv_t130).to(Tlv_t130);
container.bind<Tlv_t>(Tlv_t132).to(Tlv_t132);
container.bind<Tlv_t>(Tlv_t133).to(Tlv_t133);
container.bind<Tlv_t>(Tlv_t134).to(Tlv_t134);
container.bind<Tlv_t>(Tlv_t135).to(Tlv_t135);
container.bind<Tlv_t>(Tlv_t136).to(Tlv_t136);
container.bind<Tlv_t>(Tlv_t138).to(Tlv_t138);
container.bind<Tlv_t>(Tlv_t140).to(Tlv_t140);
container.bind<Tlv_t>(Tlv_t141).to(Tlv_t141);
container.bind<Tlv_t>(Tlv_t142).to(Tlv_t142);
container.bind<Tlv_t>(Tlv_t143).to(Tlv_t143);
container.bind<Tlv_t>(Tlv_t144).to(Tlv_t144);
container.bind<Tlv_t>(Tlv_t145).to(Tlv_t145);
container.bind<Tlv_t>(Tlv_t146).to(Tlv_t146);
container.bind<Tlv_t>(Tlv_t147).to(Tlv_t147);
container.bind<Tlv_t>(Tlv_t148).to(Tlv_t148);
container.bind<Tlv_t>(Tlv_t149).to(Tlv_t149);
container.bind<Tlv_t>(Tlv_t150).to(Tlv_t150);
container.bind<Tlv_t>(Tlv_t151).to(Tlv_t151);
container.bind<Tlv_t>(Tlv_t152).to(Tlv_t152);
container.bind<Tlv_t>(Tlv_t153).to(Tlv_t153);
container.bind<Tlv_t>(Tlv_t154).to(Tlv_t154);
container.bind<Tlv_t>(Tlv_t164).to(Tlv_t164);
container.bind<Tlv_t>(Tlv_t165).to(Tlv_t165);
container.bind<Tlv_t>(Tlv_t166).to(Tlv_t166);
container.bind<Tlv_t>(Tlv_t167).to(Tlv_t167);
container.bind<Tlv_t>(Tlv_t169).to(Tlv_t169);
container.bind<Tlv_t>(Tlv_t171).to(Tlv_t171);
container.bind<Tlv_t>(Tlv_t172).to(Tlv_t172);
container.bind<Tlv_t>(Tlv_t177).to(Tlv_t177);
container.bind<Tlv_t>(Tlv_t187).to(Tlv_t187);
container.bind<Tlv_t>(Tlv_t188).to(Tlv_t188);
container.bind<Tlv_t>(Tlv_t191).to(Tlv_t191);
container.bind<Tlv_t>(Tlv_t194).to(Tlv_t194);
container.bind<Tlv_t>(Tlv_t202).to(Tlv_t202);
container.bind<Tlv_t>(Tlv_t305).to(Tlv_t305);
container.bind<Tlv_t>(Tlv_t511).to(Tlv_t511);
container.bind<Tlv_t>(Tlv_t516).to(Tlv_t516);
container.bind<Tlv_t>(Tlv_t521).to(Tlv_t521);
container.bind<Tlv_t>(Tlv_t522).to(Tlv_t522);
container.bind<Tlv_t>(Tlv_t525).to(Tlv_t525);
container.bind<Tlv_t>(Tlv_ta).to(Tlv_ta);
container.bind<Tlv_t>(Tlv_tc).to(Tlv_tc);

export {container};
