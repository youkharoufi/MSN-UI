import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as MessageActions from './message.actions'
import { catchError, map, of, switchMap } from 'rxjs';
import { MessageService } from './message.service';
import { ChatMessage } from '../Entities/chatMessage';
import { MessageThread } from "../Entities/messageThread";

@Injectable()
export class MessageEffects {


  createMessage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MessageActions.createMessage),
      switchMap((action) =>
        this.backend.createMessage(action.messageSent).pipe(
            map((messageSent:ChatMessage) =>
            MessageActions.createMessageSuccess({ messageSent })
            ),
            catchError((error) =>
              of(MessageActions.createMessageFailure({ error }))
            )
        )
      )
    )
  );

  inbox$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MessageActions.messageInbox),
      switchMap((action) =>
        this.backend.inbox().pipe(
            map((inboxMessages : ChatMessage[]) =>
            MessageActions.messageInboxSuccess({inboxMessages})
            ),
            catchError((error) =>
              of(MessageActions.messageInboxFailure({ error }))
            )
        )
      )
    )
  );

  outbox$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MessageActions.messageOutbox),
      switchMap((action) =>
        this.backend.inbox().pipe(
            map((outboxMessages : ChatMessage[]) =>
            MessageActions.messageOutboxSuccess({outboxMessages})
            ),
            catchError((error) =>
              of(MessageActions.messageOutboxFailure({ error }))
            )
        )
      )
    )
  );

  messagesThread$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MessageActions.messagesThread),
      switchMap((action) =>
        this.backend.messageThread(action.messageThread).pipe(
            map((messages:ChatMessage[]) =>
            MessageActions.messageThreadSuccess({ messages })
            ),
            catchError((error) =>
              of(MessageActions.messageThreadFailure({ error }))
            )
        )
      )
    )
  );

  messageCount$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MessageActions.messageCount),
      switchMap((action) =>
        this.backend.unreadMessagesCount().pipe(
            map((count:number) =>
            MessageActions.messageCountSuccess({ count })
            ),
            catchError((error) =>
              of(MessageActions.messageCountFailure({ error }))
            )
        )
      )
    )
  );




  constructor(private actions$: Actions, private backend: MessageService) { }


}
