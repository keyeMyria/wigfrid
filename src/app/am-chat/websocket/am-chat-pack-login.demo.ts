import {Component} from "@angular/core";
import {Container} from "inversify";
import {container} from "clarity-angular/am-botmm/config/config.inversify";
import {Tlv_t1} from "clarity-angular/am-botmm/oicq/tlv/Tlv_t1";
import {LoginPack} from "../../../clarity-angular/am-botmm/pack/login-pack";

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

        this.messageOutput = "result is xx xx xx xx";
    }


}
