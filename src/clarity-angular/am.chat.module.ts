
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { UsersService } from './am-chat/user/users.service';
import { ThreadsService } from './am-chat/thread/threads.service';
import { MessagesService } from './am-chat/message/messages.service';

// import { AppComponent } from './app.component';
import { ChatMessageComponent } from './am-chat/chat-message/chat-message.component';
import { ChatThreadComponent } from './am-chat/chat-thread/chat-thread.component';
import { ChatNavBarComponent } from './am-chat/chat-nav-bar/chat-nav-bar.component';
import { ChatThreadsComponent } from './am-chat/chat-threads/chat-threads.component';
import { ChatWindowComponent } from './am-chat/chat-window/chat-window.component';
import { ChatPageComponent } from './am-chat/chat-page/chat-page.component';
import { FromNowPipe } from './am-chat/pipes/from-now.pipe';

@NgModule({
    declarations: [
        // AppComponent,
        ChatMessageComponent,
        ChatThreadComponent,
        ChatNavBarComponent,
        ChatThreadsComponent,
        ChatWindowComponent,
        ChatPageComponent,
        FromNowPipe
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule
    ],
    providers: [
        MessagesService, ThreadsService, UsersService
    ],

    // bootstrap: [AppComponent]
})
export class AmChatModule { }
