import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as AccountActions from './account.actions';
import { ApplicationUser } from '../Entities/applicationUser';
import { createReducer, on, Action } from '@ngrx/store';

export const ACCOUNT_FEATURE_KEY = 'account-key';

export interface State extends EntityState<ApplicationUser> {
  selectedId?: string | number; // which Bookmarks record has been selected
  loaded: boolean; // has the Bookmarks list been loaded
  error?: Error | null; // last known error (if any)
  user?: ApplicationUser
}

export interface AccountPartialState {
  readonly [ACCOUNT_FEATURE_KEY]: State;
}

export const accountAdapter: EntityAdapter<ApplicationUser> =
  createEntityAdapter<ApplicationUser>();

export const initialState: State = accountAdapter.getInitialState({
  // set initial required properties
  loaded: false,
  user:undefined
});

export const accountReducer = createReducer(
  initialState,


  on(AccountActions.loginAccount, (state, { loginUser }) => ({
    ...state,
    loaded: false,
    error: null,
    loginUser
  })),
  on(AccountActions.loginAccountSuccess, (state, { loginUser }) =>
    ({ ...state, loaded: true, loginUser })
  ),
  on(AccountActions.loginAccountFailure, (state, { error }) => ({
    ...state,
    error,
  })),


  on(AccountActions.registerAccount, (state, { registerUser }) =>
    accountAdapter.addOne(registerUser,{
    ...state,
    loaded: false,
    error: null,
  })),
  on(AccountActions.registerAccountSuccess, (state, { registerUser }) =>
    ({ ...state, loaded: true, registerUser })
  ),
  on(AccountActions.registerAccountFailure, (state, { error }) => ({
    ...state,
    error,
  })),
);

export function reducer(state: State | undefined, action: Action) {
  return accountReducer(state, action);
}
