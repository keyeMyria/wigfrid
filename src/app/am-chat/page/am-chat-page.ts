import { Component, Inject } from '@angular/core';
import { ChatExampleData } from '../../../clarity-angular/am-chat/data/chat-example-data';

import { UsersService } from '../../../clarity-angular/am-chat/user/users.service';
import { ThreadsService } from '../../../clarity-angular/am-chat/thread/threads.service';
import { MessagesService } from '../../../clarity-angular/am-chat/message/messages.service';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: './am-chat-page.component.html',
  styleUrls: ['../am-chat.demo.css']
})
export class AmChatPageDemo {
    constructor(public messagesService: MessagesService,
              public threadsService: ThreadsService,
              public usersService: UsersService) {
    ChatExampleData.init(messagesService, threadsService, usersService);

  }
}
