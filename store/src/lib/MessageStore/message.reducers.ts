import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as MessageActions from './message.actions';
import { createReducer, on, Action } from '@ngrx/store';
import { MessageSent } from '../Entities/messageSent';
import { MessageThread } from '../Entities/messageThread';
import { ChatMessage } from '../Entities/chatMessage';

export const MESSAGE_FEATURE_KEY = 'message-key';

export interface State extends EntityState<ChatMessage> {
  selectedId?: string | number;
  loaded: boolean;
  error?: Error | null;
  messageSent?: MessageSent;
  messageThread?:MessageThread;
  chatMessage?:ChatMessage;
}

export interface MessagePartialState {
  readonly [MESSAGE_FEATURE_KEY]: State;
}

export const messageAdapter: EntityAdapter<ChatMessage> =
  createEntityAdapter<ChatMessage>();

export const initialState: State = messageAdapter.getInitialState({
  loaded: false,
  chatMessage: undefined,
});

export const messageReducer = createReducer(
  initialState,

  on(MessageActions.createMessage, (state, { messageSent }) =>
    messageAdapter.addOne(messageSent, {
      ...state,
      loaded: false,
      error: null,
    })
  ),
  on(MessageActions.createMessageSuccess, (state, { messageSent }) => ({
    ...state,
    loaded: true,
    messageSent,
  })),
  on(MessageActions.createMessageFailure, (state, { error }) => ({
    ...state,
    error,
  })),

  on(MessageActions.messageInbox, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(MessageActions.messageInboxSuccess, (state, {inboxMessages}) => ({
    ...state,
    loaded: true,
    inboxMessages
  })),
  on(MessageActions.messageInboxFailure, (state, { error }) => ({
    ...state,
    error,
  })),

  on(MessageActions.messageOutbox, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(MessageActions.messageOutboxSuccess, (state) => ({
    ...state,
    loaded: true,
  })),
  on(MessageActions.messageOutboxFailure, (state, { error }) => ({
    ...state,
    error,
  })),

  on(MessageActions.messagesThread, (state, { messageThread }) => ({
    ...state,
    loaded: false,
    error: null,
    messageThread,
  })),
  on(MessageActions.messageThreadSuccess, (state, { messages }) => ({
    ...state,
    loaded: true,
    messages,
  })),
  on(MessageActions.messageThreadFailure, (state, { error }) => ({
    ...state,
    error,
  })),

  on(MessageActions.messageCount, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(MessageActions.messageCountSuccess, (state, {count}) => ({
    ...state,
    loaded: true,
    count
  })),
  on(MessageActions.messageCountFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return messageReducer(state, action);
}
