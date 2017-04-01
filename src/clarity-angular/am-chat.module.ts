import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";

import {UsersService} from "./am-chat/user/users.service";
import {ThreadsService} from "./am-chat/thread/threads.service";
import {MessagesService} from "./am-chat/message/messages.service";

import {AM_CHAT_DIRECTIVES} from "./am-chat/index";
import {CommonModule} from "@angular/common";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule
  ],
  declarations: [
    AM_CHAT_DIRECTIVES
  ],
  exports: [
    AM_CHAT_DIRECTIVES
  ],
  providers: [
    MessagesService, ThreadsService, UsersService
  ],

})
export class AmChatModule {
}
