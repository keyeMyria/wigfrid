import {Component, EventEmitter, Input, Output} from "@angular/core";
import {Buffer} from "buffer";

@Component({
    moduleId: module.id,
    selector: "am-chat-draw-svg",
    template: `
        <svg id="图层_1" data-name="图层 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 233.96 173.55">
            <!--<defs>-->
                <!--<style>.cls-1 {-->
                    <!--fill: #fff;-->
                    <!--stroke: #000;-->
                    <!--stroke-miterlimit: 10;-->
                <!--}</style>-->
            <!--</defs>-->
            <title>未标题-1</title>
            <path class="cls-1"
                  d="M160.52,206.62c5.91,12.63,16.26,29.54,34.43,41.8,66.65,45,192.47-3.75,198.36-57.38,5.13-46.69-81.28-91.39-93.44-97.54"
                  transform="translate(-160.07 -93.06)"/>
        </svg>
    `,
    styles: [`
        svg path.cls-1 {
            fill: #fff;
            stroke: #000;
            stroke-miterlimit: 10;
        }
    `]
})
export class AmChatDrawSvgDemo {

}
