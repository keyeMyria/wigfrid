/*
 * Copyright (c) 2016 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import { ModuleWithProviders, NgModule } from "@angular/core";

import {ALERT_DIRECTIVES} from "./alert/index";
import {CHECKBOX_DIRECTIVES} from "./checkboxes/index";
import {CODE_HIGHLIGHT_DIRECTIVES} from "./code/index";
import {DATAGRID_DIRECTIVES} from "./datagrid/index";
import {DROPDOWN_DIRECTIVES} from "./dropdown/index";
import {LAYOUT_DIRECTIVES} from "./layout/index";
import {MODAL_DIRECTIVES} from "./modal/index";
import {NAVIGATION_DIRECTIVES} from "./nav/index";
import {STACK_VIEW_DIRECTIVES} from "./stack-view/index";
import {TABS_DIRECTIVES} from "./tabs/index";
import {WIZARD_DIRECTIVES} from "./wizard/index";
import {ICON_DIRECTIVES} from "./iconography/index";

import {ClrResponsiveNavigationService} from "./nav/clrResponsiveNavigationService";
import {SCROLL_BAR_DIRECTIVES} from "./scroll-bar/index";
import {SCROLL_VIEW_DIRECTIVES} from "./scroll-view/index";
import {FAKE_SCROLL_VIEW_DIRECTIVES} from "./fake-scroll-view/index";
import {FLEX_GRID_DIRECTIVES} from "./wigfrid/index";

@NgModule({
              imports: [
                  CommonModule,
                  FormsModule,
                  // WigfridModule,
              ],
              declarations: [
                  //wigfrid
                  FLEX_GRID_DIRECTIVES,

                  //clarity
                  ALERT_DIRECTIVES,
                  CHECKBOX_DIRECTIVES,
                  CODE_HIGHLIGHT_DIRECTIVES,
                  DATAGRID_DIRECTIVES,
                  DROPDOWN_DIRECTIVES,
                  LAYOUT_DIRECTIVES,
                  MODAL_DIRECTIVES,
                  NAVIGATION_DIRECTIVES,
                  SCROLL_BAR_DIRECTIVES,
                  SCROLL_VIEW_DIRECTIVES,
                  FAKE_SCROLL_VIEW_DIRECTIVES,
                  STACK_VIEW_DIRECTIVES,
                  TABS_DIRECTIVES,
                  WIZARD_DIRECTIVES,
                  ICON_DIRECTIVES
              ],
              exports: [
                  //wigfrid
                  FLEX_GRID_DIRECTIVES,

                  //clarity
                  ALERT_DIRECTIVES,
                  CHECKBOX_DIRECTIVES,
                  CODE_HIGHLIGHT_DIRECTIVES,
                  DATAGRID_DIRECTIVES,
                  DROPDOWN_DIRECTIVES,
                  LAYOUT_DIRECTIVES,
                  MODAL_DIRECTIVES,
                  NAVIGATION_DIRECTIVES,
                  SCROLL_BAR_DIRECTIVES,
                  SCROLL_VIEW_DIRECTIVES,
                  FAKE_SCROLL_VIEW_DIRECTIVES,
                  STACK_VIEW_DIRECTIVES,
                  TABS_DIRECTIVES,
                  WIZARD_DIRECTIVES,
                  ICON_DIRECTIVES
              ]
          })
export class ClarityModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: ClarityModule,
            providers: [ ClrResponsiveNavigationService ]
        };
    }

    static forChild(): ModuleWithProviders {
        return {
            ngModule: ClarityModule,
            providers: []
        };
    }
}
