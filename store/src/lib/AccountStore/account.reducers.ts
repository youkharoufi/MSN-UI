import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as AccountActions from './account.actions';
import { ApplicationUser } from '../Entities/applicationUser';
import { createReducer, on, Action } from '@ngrx/store';
import { LoginUser } from '../Entities/loginUser';
import { ConfirmationEmail } from '../Entities/emailConfirmation';

export const ACCOUNT_FEATURE_KEY = 'account-key';

export interface State extends EntityState<ApplicationUser> {
  selectedId?: string | number;
  loaded: boolean;
  error?: Error | null;
  user?: ApplicationUser;
  loginUser?: LoginUser;
  loggedUser?: ApplicationUser;
  registerUser?: FormData;
  registeredUser?: ApplicationUser;
  confEmail?: ConfirmationEmail;
  connectedUser?: ApplicationUser;
  userName?:string;
  byUsernameUser?: ApplicationUser;
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
  on(AccountActions.loginAccountSuccess, (state, { loggedUser }) =>
    ({ ...state, loaded: true, loggedUser:loggedUser })
  ),
  on(AccountActions.loginAccountFailure, (state, { error }) => ({
    ...state,
    error,
  })),


  on(AccountActions.registerAccount, (state, { registerUser }) => ({
    ...state,
    loaded: false,
    error: null,
    registerUser
  })),
  on(AccountActions.registerAccountSuccess, (state, { registeredUser }) =>
    ({ ...state, loaded: true, registeredUser })
  ),
  on(AccountActions.registerAccountFailure, (state, { error }) => ({
    ...state,
    error,
  })),

  on(AccountActions.confirmAccount, (state, { confEmail }) => ({
    ...state,
    loaded: false,
    error: null,
    confEmail
  })),
  on(AccountActions.confirmAccountSuccess, (state, { user }) =>
    ({ ...state, loaded: true, user })
  ),
  on(AccountActions.confirmAccountFailure, (state, { error }) => ({
    ...state,
    error,
  })),

  on(AccountActions.allUsers, (state) => ({
    ...state,
    loaded: false,
    error: null
  })),
  on(AccountActions.allUsersSuccess, (state, { users }) =>
  accountAdapter.upsertMany(users,{ ...state, loaded: true })
  ),
  on(AccountActions.allUsersFailure, (state, { error }) => ({
    ...state,
    error,
  })),

  on(AccountActions.connectedUser, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(AccountActions.connectedUserSuccess, (state, { connectedUser }) =>
    ({ ...state, loaded: true, connectedUser })
  ),
  on(AccountActions.connectedUserFailure, (state, { error }) => ({
    ...state,
    error,
  })),

  on(AccountActions.getUserByUsername, (state, {userName}) => ({
    ...state,
    loaded: false,
    error: null,
    userName
  })),
  on(AccountActions.getUserByUsernameSuccess, (state, { byUsernameUser }) =>
    ({ ...state, loaded: true, byUsernameUser })
  ),
  on(AccountActions.getUserByUsernameFailure, (state, { error }) => ({
    ...state,
    error,
  })),


);

export function reducer(state: State | undefined, action: Action) {
  return accountReducer(state, action);
}
