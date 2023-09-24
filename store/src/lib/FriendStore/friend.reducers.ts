import { allUsers } from './../AccountStore/account.actions';
import { FriendRequest } from './../Entities/friendRequest';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as FriendActions from './friend.actions';
import { ApplicationUser } from '../Entities/applicationUser';
import { createReducer, on, Action } from '@ngrx/store';

export const FRIEND_FEATURE_KEY = 'friend-key';

export interface State extends EntityState<ApplicationUser> {
  selectedId?: string | number;
  loaded: boolean;
  error?: Error | null;
  count?: number;
  friendRequests?: FriendRequest[];
  allUsers?:ApplicationUser[],
  allFriends?:ApplicationUser[]
}

export interface FriendPartialState {
  readonly [FRIEND_FEATURE_KEY]: State;
}

export const friendAdapter: EntityAdapter<ApplicationUser> =
  createEntityAdapter<ApplicationUser>();

export const initialState: State = friendAdapter.getInitialState({
  // set initial required properties
  loaded: false,
  user:undefined,
  number:0,
  friendRequest:[],
  allUsers:[],
  allFriends:[]
});


export const friendReducer = createReducer(
  initialState,


  on(FriendActions.sendFriendRequest, (state, { currentUserName, senderUserName }) => ({
    ...state,
    loaded: false,
    error: null,
    currentUserName,
    senderUserName
  })),
  on(FriendActions.sendFriendRequestSuccess, (state, { user }) =>
    ({ ...state, loaded: true, user })
  ),
  on(FriendActions.sendFriendRequestFailure, (state, { error }) => ({
    ...state,
    error,
  })),


  on(FriendActions.confirmFriendRequest, (state, { currentUserName, senderUserName }) => ({
    ...state,
    loaded: false,
    error: null,
    currentUserName,
    senderUserName
  })),
  on(FriendActions.confirmFriendRequestSuccess, (state, { user }) =>
    ({ ...state, loaded: true, user })
  ),
  on(FriendActions.confirmFriendRequestFailure, (state, { error }) => ({
    ...state,
    error,
  })),

  on(FriendActions.deleteFriendRequest, (state, { currentUserName, senderUserName }) => ({
    ...state,
    loaded: false,
    error: null,
    currentUserName,
    senderUserName
  })),
  on(FriendActions.deleteFriendRequestSuccess, (state, { user }) =>
    ({ ...state, loaded: true, user })
  ),
  on(FriendActions.deleteFriendRequestFailure, (state, { error }) => ({
    ...state,
    error,
  })),

  on(FriendActions.getFriendRequestCount, (state, { currentUserName }) => ({
    ...state,
    loaded: false,
    error: null,
    currentUserName,
  })),
  on(FriendActions.getFriendRequestCountSuccess, (state, { count }) =>
    ({ ...state, loaded: true, count })
  ),
  on(FriendActions.getFriendRequestCountFailure, (state, { error }) => ({
    ...state,
    error,
  })),

  on(FriendActions.getAllFriendRequests, (state, { currentUserName }) => ({
    ...state,
    loaded: false,
    error: null,
    currentUserName,
  })),
  on(FriendActions.getAllFriendRequestsSuccess, (state, { friendRequests }) =>
    ({ ...state, loaded: true, friendRequests })
  ),
  on(FriendActions.getAllFriendRequestsFailure, (state, { error }) => ({
    ...state,
    error,
  })),


  on(FriendActions.getFriendRequest, (state, { currentUserName , senderUserName}) => ({
    ...state,
    loaded: false,
    error: null,
    currentUserName,
    senderUserName
  })),
  on(FriendActions.getFriendRequestSuccess, (state, { friendRequest }) =>
    ({ ...state, loaded: true, friendRequest })
  ),
  on(FriendActions.getFriendRequestFailure, (state, { error }) => ({
    ...state,
    error,
  })),

  on(FriendActions.getAllUsers, (state, { currentUserName}) => ({
    ...state,
    loaded: false,
    error: null,
    currentUserName,
  })),
  on(FriendActions.getAllUsersSuccess, (state, { allUsers }) =>
    ({ ...state, loaded: true, allUsers })
  ),
  on(FriendActions.getAllUsersFailure, (state, { error }) => ({
    ...state,
    error,
  })),

  on(FriendActions.getAllFriends, (state, { currentUserName}) => ({
    ...state,
    loaded: false,
    error: null,
    currentUserName,
  })),
  on(FriendActions.getAllFriendsSuccess, (state, { allFriends }) =>
    ({ ...state, loaded: true, allFriends })
  ),
  on(FriendActions.getAllFriendsFailure, (state, { error }) => ({
    ...state,
    error,
  })),




);

export function reducer(state: State | undefined, action: Action) {
  return friendReducer(state, action);
}
