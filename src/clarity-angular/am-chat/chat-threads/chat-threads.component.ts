import {
  Component,
  OnInit,
  Inject
} from '@angular/core';
import { Observable } from 'rxjs';
import { Thread } from '../thread/thread.model';
import { ThreadsService } from './../thread/threads.service';

@Component({
  moduleId: module.id,
  selector: 'chat-threads',
  templateUrl: './chat-threads.component.html',
})
export class ChatThreadsComponent {
  threads: Observable<any>;

  constructor(public threadsService: ThreadsService) {
    this.threads = threadsService.orderedThreads;
  }
}
