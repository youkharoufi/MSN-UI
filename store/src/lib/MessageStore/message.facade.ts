import { Injectable } from '@angular/core';
import { Update } from '@ngrx/entity';
import { select, Store } from '@ngrx/store';

import { createMessage, messageInbox, messageOutbox, messageCount, messagesThread } from './message.actions';
import * as fromMessage from './message.reducers';
import * as MessageSelectors from './message.selectors';
import { MessageSent } from '../Entities/messageSent';
import { MessageThread } from '../Entities/messageThread';

@Injectable({ providedIn: 'root' })
export class AccountFacade {


  constructor(private store: Store<fromMessage.MessagePartialState>) { }

  createMessage(messageSent: MessageSent) {
    this.store.dispatch(createMessage({messageSent}));
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
