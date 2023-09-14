import { Injectable } from '@angular/core';
import { Update } from '@ngrx/entity';
import { select, Store } from '@ngrx/store';

import { createMessage, messageInbox, messageOutbox, messageCount, messagesThread } from './message.actions';
import * as fromMessage from './message.reducers';
import * as MessageSelectors from './message.selectors';
import { MessageSent } from '../Entities/messageSent';
import { MessageThread } from '../Entities/messageThread';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { ChatMessage } from '../Entities/chatMessage';
import { BehaviorSubject, take } from 'rxjs';
import { ApplicationUser } from '../Entities/applicationUser';
import { environment } from 'apps/msn-ui/src/environments/environment';

@Injectable({ providedIn: 'root' })
export class MessageFacade {

  hubUrl = environment.HUB_URL;

  private hubConnection?: HubConnection;
  private messageThreadSource = new BehaviorSubject<ChatMessage[]>([]);
  messageThread$ = this.messageThreadSource.asObservable();

  constructor(private store: Store<fromMessage.MessagePartialState>) { }

  createHubConnection(user: ApplicationUser | null, otherId: string) {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(this.hubUrl + 'message?user=' + otherId, {
        accessTokenFactory: () => user!.token || ""
      })
      .withAutomaticReconnect()
      .build();

    this.hubConnection.start().catch(error => console.log(error));

    this.hubConnection.on('ReceivedMessageThread', messages => {
      this.messageThreadSource.next(messages);
    })

    this.hubConnection.on('NewMessage', message => {
      this.messageThread$.pipe(take(1)).subscribe({
        next: messages => {
          this.messageThreadSource.next([...messages, message])
        }
      })
    })
  }

  stopHubConnection() {
    if (this.hubConnection) {
      this.hubConnection.stop();

    }
  }

  createMessage(messageSent: MessageSent) {
    return this.hubConnection?.invoke('SendMessage', { senderUsername: messageSent.senderUsername, targetId: messageSent.targetId, content: messageSent.content, messageSent:messageSent.messageSent})
    .catch(error => console.log(error));
    //this.store.dispatch(createMessage({messageSent}));
  }

  inbox() {
    this.store.dispatch(messageInbox());
  }

  outbox(){
    this.store.dispatch(messageOutbox())
  }

  messageThread(messageThread: MessageThread){
    this.store.dispatch(messagesThread({messageThread}))
  }

  messageCount(){
    this.store.dispatch(messageCount())
  }


}
