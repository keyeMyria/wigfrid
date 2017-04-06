import {Component} from "@angular/core";
import {container} from "clarity-angular/am-botmm/config/config.inversify";
import {Tlv_t1} from "clarity-angular/am-botmm/oicq/tlv/Tlv_t1";
import {LoginPack} from "../../../clarity-angular/am-botmm/pack/login-pack";
import {WupBuffer} from "../../../clarity-angular/am-botmm/pack/wup-buffer";
import {SsoMessage} from "../../../clarity-angular/am-botmm/pack/sso-message";
import {Buffer} from "buffer";

@Component({
    moduleId: module.id,
    selector: "am-chat-websocket-test-tool",
    templateUrl: "./am-chat-pack-login.demo.html"
})
export class AmChatPackLoginDemo {

    public messageOutput = "no result right now";

    public constructor() {

    }

    public pack() {
        let tlv1 = container.get(Tlv_t1);

        console.log(tlv1);

        let loginPack = container.get(LoginPack);

        console.log(loginPack);

        let pack = loginPack.pack();

        console.log(pack);

        let wupbuffer = container.get<WupBuffer>(WupBuffer);

        let packedWupBuffer = wupbuffer.packWithDefaultKey(0x0810, pack, false);

        let ssoMessage = container.get<SsoMessage>(SsoMessage);

        let packedSsoMessage = ssoMessage.send(
            "wtlogin.login",
            Buffer.from("B6CC78FC", "hex"),
            Buffer.from(""),
            packedWupBuffer
        );

        this.messageOutput = packedSsoMessage.toString("hex");
    }


}
