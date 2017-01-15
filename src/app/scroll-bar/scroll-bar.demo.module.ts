
import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {ROUTING} from "./scroll-bar.demo.routing";
import {ScrollBarDemo} from "./scroll-bar.demo";
import {ScrollBarAngularBasicDemo} from "./scroll-bar-angular-basic";
import {ScrollBarStaticDemo} from "./scroll-bar-static";
import {ClarityModule} from "../../clarity-angular/clarity.module";

@NgModule({
              imports: [
                  CommonModule,
                  ClarityModule,
                  FormsModule,
                  ROUTING
              ],
              declarations: [
                  ScrollBarDemo,
                  ScrollBarAngularBasicDemo,
                  ScrollBarStaticDemo
              ],
              exports: [
                  ScrollBarDemo,
                  ScrollBarAngularBasicDemo,
                  ScrollBarStaticDemo
              ]
          })
export default class ScrollBarDemoModule {

}
