import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MESSAGE_FEATURE_KEY, State, messageAdapter } from './message.reducers';


// Lookup the 'Figure' feature state managed by NgRx
export const getMessageState = createFeatureSelector<State>(MESSAGE_FEATURE_KEY);



const { selectAll, selectEntities } = messageAdapter.getSelectors();




export const getMessage = createSelector(
  getMessageState,
  (state: State) => state.messageSent
);

export const getMessageError = createSelector(
  getMessageState,
  (state: State) => state.error
);

export const getAllMessages = createSelector(getMessageState, (state: State) =>
  selectAll(state)
);

export const getMessageEntities = createSelector(
  getMessageState,
  (state: State) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getMessageState,
  (state: State) => state.selectedId
);

export const getSelected = createSelector(
  getMessageEntities,
  getSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId]
);
