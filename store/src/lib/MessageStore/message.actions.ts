import { createAction, props } from "@ngrx/store";
import { MessageSent } from "../Entities/messageSent";
import { MessageThread } from "../Entities/messageThread";
import { ChatMessage } from "../Entities/chatMessage";



export enum MessageActionsTypes {

  CREATE_MESSAGE = '[Message] Create',
  CREATE_MESSAGE_SUCCESS = '[Message/API] Message Creation Success',
  CREATE_MESSAGE_ERROR = '[Message/API] Message Creation Failure',

  MESSAGE_INBOX = '[Message] Inbox',
  MESSAGE_INBOX_SUCCESS = '[Message/API] Message Inbox Success',
  MESSAGE_INBOX_ERROR = '[Message/API] Message Inbox Failure',

  MESSAGE_OUTBOX = '[Message] Outbox',
  MESSAGE_OUTBOX_SUCCESS = '[Message/API] Message Outbox Success',
  MESSAGE_OUTBOX_ERROR = '[Message/API] Message Outbox Failure',

  MESSAGE_THREAD = '[Message] Thread',
  MESSAGE_THREAD_SUCCESS = '[Message/API] Message Thread Success',
  MESSAGE_THREAD_ERROR = '[Message/API] Message Thread Failure',

  MESSAGE_COUNT = '[Message] Count',
  MESSAGE_COUNT_SUCCESS = '[Message/API] Message Count Success',
  MESSAGE_COUNT_ERROR = '[Message/API] Message Count Failure',
}

export const createMessage = createAction(
  MessageActionsTypes.CREATE_MESSAGE,
  props<{ messageSent: MessageSent }>()
);

export const createMessageSuccess = createAction(
  MessageActionsTypes.CREATE_MESSAGE_SUCCESS,
  props<{ messageSent: ChatMessage }>()
);

export const createMessageFailure = createAction(
  MessageActionsTypes.CREATE_MESSAGE_ERROR,
  props<{ error: Error | any }>()
);

export const messageInbox = createAction(
  MessageActionsTypes.MESSAGE_INBOX
);

export const messageInboxSuccess = createAction(
  MessageActionsTypes.MESSAGE_INBOX_SUCCESS,
  props<{ inboxMessages: ChatMessage[] }>()
);

export const messageInboxFailure = createAction(
  MessageActionsTypes.MESSAGE_INBOX_ERROR,
  props<{ error: Error | any }>()
);

export const messageOutbox = createAction(
  MessageActionsTypes.MESSAGE_OUTBOX
);

export const messageOutboxSuccess = createAction(
  MessageActionsTypes.MESSAGE_OUTBOX_SUCCESS,
  props<{ outboxMessages: ChatMessage[] }>()
);

export const messageOutboxFailure = createAction(
  MessageActionsTypes.MESSAGE_OUTBOX_ERROR,
  props<{ error: Error | any }>()
);

export const messagesThread = createAction(
  MessageActionsTypes.MESSAGE_THREAD,
  props<{ messageThread: MessageThread }>()
);

export const messageThreadSuccess = createAction(
  MessageActionsTypes.MESSAGE_THREAD_SUCCESS,
  props<{ messages: ChatMessage[] }>()
);

export const messageThreadFailure = createAction(
  MessageActionsTypes.MESSAGE_THREAD_ERROR,
  props<{ error: Error | any }>()
);

export const messageCount = createAction(
  MessageActionsTypes.MESSAGE_COUNT
);

export const messageCountSuccess = createAction(
  MessageActionsTypes.MESSAGE_COUNT_SUCCESS,
  props<{ count: number }>()
);

export const messageCountFailure = createAction(
  MessageActionsTypes.MESSAGE_COUNT_ERROR,
  props<{ error: Error | any }>()
);



