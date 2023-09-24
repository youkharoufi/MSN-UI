import { createFeatureSelector, createSelector } from '@ngrx/store';
import {  FRIEND_FEATURE_KEY, State, friendAdapter } from './friend.reducers';


export const getFriendState = createFeatureSelector<State>(FRIEND_FEATURE_KEY);



const { selectAll, selectEntities } = friendAdapter.getSelectors();



export const getFriendError = createSelector(
  getFriendState,
  (state: State) => state.error
);

export const getFriendCount = createSelector(
  getFriendState,
  (state: State) => state.count
);

export const getAllFriends = createSelector(
  getFriendState,
  (state: State) => state.allFriends
);

export const getAllUsersFR = createSelector(
  getFriendState,
  (state: State) => state.allUsers
);

export const getAllFriendRequests = createSelector(
  getFriendState,
  (state: State) => state.friendRequests
);

export const getAllUsers = createSelector(getFriendState, (state: State) =>
  selectAll(state)
);

export const getAccountEntities = createSelector(
  getFriendState,
  (state: State) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getFriendState,
  (state: State) => state.selectedId
);

export const getSelected = createSelector(
  getAccountEntities,
  getSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId]
);
