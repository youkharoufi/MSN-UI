import { createAction, props } from "@ngrx/store";
import { ApplicationUser } from "../Entities/applicationUser";
import { LoginUser } from "../Entities/loginUser";



export enum AccountActionsTypes {

  LOGIN_ACCOUNT = '[Account] Login',
  LOGIN_ACCOUNT_SUCCESS = '[Account/API] Login Account Success',
  LOGIN_ACCOUNT_ERROR = '[Account/API] Login Account Failure',

  REGISTER_ACCOUNT = '[Account] Register',
  REGISTER_ACCOUNT_SUCCESS = '[Account/API] Register Account Success',
  REGISTER_ACCOUNT_ERROR = '[Account/API] Register Account Failure',

}

export const loginAccount = createAction(
  AccountActionsTypes.LOGIN_ACCOUNT,
  props<{ loginUser: LoginUser }>()
);

export const loginAccountSuccess = createAction(
  AccountActionsTypes.LOGIN_ACCOUNT_SUCCESS,
  props<{ loginUser: ApplicationUser }>()
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
  props<{ registerUser: ApplicationUser }>()
);

export const registerAccountFailure = createAction(
  AccountActionsTypes.REGISTER_ACCOUNT_ERROR,
  props<{ error: Error | any }>()
);

