import { Type } from "@angular/core";

import {ScrollBar} from "./scroll-bar";
import {ScrollBarThumb} from "./scroll-bar-thumb";
import {ScrollBarTrack} from "./scroll-bar-track";

export * from "./scroll-bar";
export {ScrollEvent} from "./EventData/ScrollEvent"

export const SCROLL_BAR_DIRECTIVES: Type<any>[] = [
    ScrollBar,
    ScrollBarThumb,
    ScrollBarTrack
];
