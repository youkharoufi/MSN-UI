import { createAction, props } from "@ngrx/store";
import { ApplicationUser } from "../Entities/applicationUser";
import { LoginUser } from "../Entities/loginUser";
import { ConfirmationEmail } from "../Entities/emailConfirmation";
import { FriendRequest } from "../Entities/friendRequest";



export enum FriendActionsTypes {

  SEND_FRIEND_REQUEST = '[Friend] Send Friend Request',
  SEND_FRIEND_REQUEST_SUCCESS = '[Friend/API] Send Friend Request Success',
  SEND_FRIEND_REQUEST_ERROR = '[Friend/API] Send Friend Request Failure',

  CONFIRM_FRIEND_REQUEST = '[Friend] Confirm Friend Request',
  CONFIRM_FRIEND_REQUEST_SUCCESS = '[Friend/API] Confirm Friend Request Success',
  CONFIRM_FRIEND_REQUEST_ERROR = '[Friend/API] Confirm Friend Request Failure',

  DELETE_FRIEND_REQUEST = '[Friend] Delete Friend Request',
  DELETE_FRIEND_REQUEST_SUCCESS = '[Friend/API] Delete Friend Request Success',
  DELETE_FRIEND_REQUEST_ERROR = '[Friend/API] Delete Friend Request Failure',

  GET_FRIEND_REQUEST_COUNT = '[Friend] Get Friend Request Count',
  GET_FRIEND_REQUEST_COUNT_SUCCESS = '[Friend/API] Get Friend Request Count Success',
  GET_FRIEND_REQUEST_COUNT_ERROR = '[Friend/API] Get Friend Request Count Failure',

  GET_ALL_FRIEND_REQUESTS = '[Friend] Get All Friend Requests Count',
  GET_ALL_FRIEND_REQUESTS_SUCCESS = '[Friend/API] Get All Friend Requests Count Success',
  GET_ALL_FRIEND_REQUESTS_ERROR = '[Friend/API] Get All Friend Requests Count Failure',

  GET_FRIEND_REQUEST = '[Friend] Get Friend Request',
  GET_FRIEND_REQUEST_SUCCESS = '[Friend/API] Get Friend Request Success',
  GET_FRIEND_REQUEST_ERROR = '[Friend/API] Get Friend Request Failure',

  GET_ALL_USERS = '[Friend] Get All Users',
  GET_ALL_USERS_SUCCESS = '[Friend/API] Get All Users',
  GET_ALL_USERS_ERROR = '[Friend/API] Get All Users Failure',

}

export const sendFriendRequest = createAction(
  FriendActionsTypes.SEND_FRIEND_REQUEST,
  props<{ currentUserName: string, senderUserName: string }>()
);

export const sendFriendRequestSuccess = createAction(
  FriendActionsTypes.SEND_FRIEND_REQUEST_SUCCESS,
  props<{ user: ApplicationUser }>()
);

export const sendFriendRequestFailure = createAction(
  FriendActionsTypes.SEND_FRIEND_REQUEST_ERROR,
  props<{ error: Error | any }>()
);

export const confirmFriendRequest = createAction(
  FriendActionsTypes.CONFIRM_FRIEND_REQUEST,
  props<{ currentUserName: string, senderUserName: string }>()
);

export const confirmFriendRequestSuccess = createAction(
  FriendActionsTypes.CONFIRM_FRIEND_REQUEST_SUCCESS,
  props<{ user: ApplicationUser }>()
);

export const confirmFriendRequestFailure = createAction(
  FriendActionsTypes.CONFIRM_FRIEND_REQUEST_ERROR,
  props<{ error: Error | any }>()
);

export const deleteFriendRequest = createAction(
  FriendActionsTypes.DELETE_FRIEND_REQUEST,
  props<{ currentUserName: string, senderUserName: string }>()
);

export const deleteFriendRequestSuccess = createAction(
  FriendActionsTypes.DELETE_FRIEND_REQUEST_SUCCESS,
  props<{ user: ApplicationUser }>()
);

export const deleteFriendRequestFailure = createAction(
  FriendActionsTypes.DELETE_FRIEND_REQUEST_ERROR,
  props<{ error: Error | any }>()
);

export const getFriendRequestCount = createAction(
  FriendActionsTypes.GET_FRIEND_REQUEST_COUNT,
  props<{ currentUserName: string }>()
);

export const getFriendRequestCountSuccess = createAction(
  FriendActionsTypes.GET_FRIEND_REQUEST_COUNT_SUCCESS,
  props<{ count: number }>()
);

export const getFriendRequestCountFailure = createAction(
  FriendActionsTypes.GET_FRIEND_REQUEST_COUNT_ERROR,
  props<{ error: Error | any }>()
);

export const getAllFriendRequests = createAction(
  FriendActionsTypes.GET_ALL_FRIEND_REQUESTS,
  props<{ currentUserName: string }>()
);

export const getAllFriendRequestsSuccess = createAction(
  FriendActionsTypes.GET_ALL_FRIEND_REQUESTS_SUCCESS,
  props<{ friendRequests: FriendRequest[] }>()
);

export const getAllFriendRequestsFailure = createAction(
  FriendActionsTypes.GET_ALL_FRIEND_REQUESTS_ERROR,
  props<{ error: Error | any }>()
);

export const getFriendRequest = createAction(
  FriendActionsTypes.GET_FRIEND_REQUEST,
  props<{ currentUserName: string, senderUserName: string }>()
);

export const getFriendRequestSuccess = createAction(
  FriendActionsTypes.GET_FRIEND_REQUEST_SUCCESS,
  props<{ friendRequest: FriendRequest }>()
);

export const getFriendRequestFailure = createAction(
  FriendActionsTypes.GET_FRIEND_REQUEST_ERROR,
  props<{ error: Error | any }>()
);

export const getAllUsers = createAction(
  FriendActionsTypes.GET_ALL_USERS,
  props<{ currentUserName: string }>()
);

export const getAllUsersSuccess = createAction(
  FriendActionsTypes.GET_ALL_USERS_SUCCESS,
  props<{ allUsers: ApplicationUser[] }>()
);

export const getAllUsersFailure = createAction(
  FriendActionsTypes.GET_ALL_USERS_ERROR,
  props<{ error: Error | any }>()
);

