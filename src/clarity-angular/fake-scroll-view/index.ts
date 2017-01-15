

import {Type} from "@angular/core";
import {FakeScrollViewContentPresenter} from "./fake-scroll-view-content-presenter";
import {FakeScrollView} from "./fake-scroll-view";

export const FAKE_SCROLL_VIEW_DIRECTIVES: Type<any>[] = [
    FakeScrollViewContentPresenter,
    FakeScrollView,
];
