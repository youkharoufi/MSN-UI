import { createAction, props } from "@ngrx/store";
import { ApplicationUser } from "../Entities/applicationUser";
import { LoginUser } from "../Entities/loginUser";
import { ConfirmationEmail } from "../Entities/emailConfirmation";



export enum AccountActionsTypes {

  LOGIN_ACCOUNT = '[Account] Login',
  LOGIN_ACCOUNT_SUCCESS = '[Account/API] Login Account Success',
  LOGIN_ACCOUNT_ERROR = '[Account/API] Login Account Failure',

  REGISTER_ACCOUNT = '[Account] Register',
  REGISTER_ACCOUNT_SUCCESS = '[Account/API] Register Account Success',
  REGISTER_ACCOUNT_ERROR = '[Account/API] Register Account Failure',

  CONFIRM_ACCOUNT = '[Account] Confirm',
  CONFIRM_ACCOUNT_SUCCESS = '[Account/API] Confirm Account Success',
  CONFIRM_ACCOUNT_ERROR = '[Account/API] Confirm Account Failure',

  GET_ALL_USERS = '[Account] All Users',
  GET_ALL_USERS_SUCCESS = '[Account/API] All Users Success',
  GET_ALL_USERS_ERROR = '[Account/API] All Users Failure',

  GET_CONNECTED_USER = '[Account] Connected User',
  GET_CONNECTED_USER_SUCCESS = '[Account/API] Connected User Success',
  GET_CONNECTED_USER_ERROR = '[Account/API] Connected User Failure',

  GET_USER_BY_USERNAME = '[Account] Get User by userName',
  GET_USER_BY_USERNAME_SUCCESS = '[Account/API] Get User by userName Success',
  GET_USER_BY_USERNAME_ERROR = '[Account/API] Get User by userName Failure',
}

export const loginAccount = createAction(
  AccountActionsTypes.LOGIN_ACCOUNT,
  props<{ loginUser: LoginUser }>()
);

export const loginAccountSuccess = createAction(
  AccountActionsTypes.LOGIN_ACCOUNT_SUCCESS,
  props<{ loggedUser: ApplicationUser }>()
);

export const loginAccountFailure = createAction(
  AccountActionsTypes.LOGIN_ACCOUNT_ERROR,
  props<{ error: Error | any }>()
);

export const registerAccount = createAction(
  AccountActionsTypes.REGISTER_ACCOUNT,
  props<{ registerUser: FormData }>()
);

export const registerAccountSuccess = createAction(
  AccountActionsTypes.REGISTER_ACCOUNT_SUCCESS,
  props<{ registeredUser: ApplicationUser }>()
);

export const registerAccountFailure = createAction(
  AccountActionsTypes.REGISTER_ACCOUNT_ERROR,
  props<{ error: Error | any }>()
);

export const confirmAccount = createAction(
  AccountActionsTypes.CONFIRM_ACCOUNT,
  props<{ confEmail: ConfirmationEmail }>()
);

export const confirmAccountSuccess = createAction(
  AccountActionsTypes.CONFIRM_ACCOUNT_SUCCESS,
  props<{ user: ApplicationUser }>()
);

export const confirmAccountFailure = createAction(
  AccountActionsTypes.CONFIRM_ACCOUNT_ERROR,
  props<{ error: Error | any }>()
);

export const allUsers = createAction(
  AccountActionsTypes.GET_ALL_USERS
);

export const allUsersSuccess = createAction(
  AccountActionsTypes.GET_ALL_USERS_SUCCESS,
  props<{ users: ApplicationUser[] }>()
);

export const allUsersFailure = createAction(
  AccountActionsTypes.GET_ALL_USERS_ERROR,
  props<{ error: Error | any }>()
);

export const connectedUser = createAction(
  AccountActionsTypes.GET_CONNECTED_USER,
  props<{ username: string }>()
);

export const connectedUserSuccess = createAction(
  AccountActionsTypes.GET_CONNECTED_USER_SUCCESS,
  props<{ connectedUser: ApplicationUser }>()
);

export const connectedUserFailure = createAction(
  AccountActionsTypes.GET_CONNECTED_USER_ERROR,
  props<{ error: Error | any }>()
);

export const getUserByUsername = createAction(
  AccountActionsTypes.GET_USER_BY_USERNAME,
  props<{ userName: string }>()
);

export const getUserByUsernameSuccess = createAction(
  AccountActionsTypes.GET_USER_BY_USERNAME_SUCCESS,
  props<{ byUsernameUser: ApplicationUser }>()
);

export const getUserByUsernameFailure = createAction(
  AccountActionsTypes.GET_USER_BY_USERNAME_ERROR,
  props<{ error: Error | any }>()
);


