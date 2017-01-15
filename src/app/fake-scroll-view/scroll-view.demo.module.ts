

import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {ROUTING} from "./scroll-view.demo.routing";
import {ScrollViewDemo} from "./scroll-view.demo";
import {ScrollViewBasicScrollDemo} from "./scroll-view-basic-scroll";
import {ScrollViewOffsetCullingDemo} from "./scroll-view-offset-culling-demo";
import {ScrollViewScrollContentDemo} from "./scroll-view-scroll-content-demo";
import {ClarityModule} from "../../clarity-angular/clarity.module";
@NgModule({
              imports: [
                  CommonModule,
                  ClarityModule,
                  FormsModule,
                  ROUTING
              ],
              declarations: [
                  ScrollViewDemo,
                  ScrollViewBasicScrollDemo,
                  ScrollViewOffsetCullingDemo,
                  ScrollViewScrollContentDemo
              ],
              exports: [
                  ScrollViewDemo,
                  ScrollViewBasicScrollDemo,
                  ScrollViewOffsetCullingDemo,
                  ScrollViewScrollContentDemo
              ]
          })
export default class ScrollViewDemoModule {

}
