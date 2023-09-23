import { Injectable } from "@angular/core";
import { Store, select } from "@ngrx/store";
import * as fromFriend from './friend.reducers';
import { confirmFriendRequest, deleteFriendRequest, getAllFriendRequests, getAllUsers, getFriendRequest, getFriendRequestCount, sendFriendRequest } from "./friend.actions";
import * as friendSelectors from './friend.selectors';



@Injectable({ providedIn: 'root' })
export class FriendFacade {

  count$ = this.store.pipe(select(friendSelectors.getFriendCount));
  friendRequest$ = this.store.pipe(select(friendSelectors.getAllFriendRequests))
  allUser$ = this.store.pipe(select(friendSelectors.getAllUsersFR));

  constructor(private store: Store<fromFriend.FriendPartialState>) { }

  sendFriendRequest(currentUserName: string, senderUserName: string) {
    this.store.dispatch(sendFriendRequest({currentUserName, senderUserName}));
  }


  confirmFriendRequest(currentUserName: string, senderUserName: string) {
    this.store.dispatch(confirmFriendRequest({currentUserName, senderUserName}));
  }

  denyFriendRequest(currentUserName: string, senderUserName: string) {
    this.store.dispatch(deleteFriendRequest({currentUserName, senderUserName}));
  }

  getFriendRequestsCount(currentUserName: string) {
    this.store.dispatch(getFriendRequestCount({currentUserName}));
  }

  getFriendRequest(currentUserName: string,  senderUserName: string) {
    this.store.dispatch(getFriendRequest({currentUserName,  senderUserName}));
  }

  getAllFriendRequests(currentUserName: string) {
    this.store.dispatch(getAllFriendRequests({currentUserName}));
  }

  getAllUsers(currentUserName: string) {
    this.store.dispatch(getAllUsers({currentUserName}));
  }



}
