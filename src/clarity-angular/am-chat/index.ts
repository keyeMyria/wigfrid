import {Type} from "@angular/core";
import {FromNowPipe} from "./pipes/from-now.pipe";
import {ChatPageComponent} from "./chat-page/chat-page.component";
import {ChatWindowComponent} from "./chat-window/chat-window.component";
import {ChatThreadsComponent} from "./chat-threads/chat-threads.component";
import {ChatMessageComponent} from "./chat-message/chat-message.component";
import {ChatThreadComponent} from "./chat-thread/chat-thread.component";
import {ChatNavBarComponent} from "./chat-nav-bar/chat-nav-bar.component";


export const AM_CHAT_DIRECTIVES: Type<any>[] = [
  ChatMessageComponent,
  ChatThreadComponent,
  ChatNavBarComponent,
  ChatThreadsComponent,
  ChatWindowComponent,
  ChatPageComponent,
  FromNowPipe
];
