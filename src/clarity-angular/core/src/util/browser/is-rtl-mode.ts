import {createElement} from "../dom/create-element";
import { RtlMode } from "../enum/rtl-mode";

export function isRtlMode() {
    const el = createElement(
        '<div dir="rtl" style="visibility:hidden;width:100px;height:100px;overflow:auto">' +
        '<div style="width:2000px;height:2000px"></div>' +
        '</div>'
    );

    document.body.appendChild(el);
    const sl = el.scrollLeft;
    el.scrollLeft = -1000;
    const sln = el.scrollLeft;
    document.body.removeChild(el);

    return sln < 0 ? RtlMode.Negative : sl > 0 ? RtlMode.Reverse : RtlMode.Standard;
}
