import { allUsers } from './../AccountStore/account.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, from, map, of, switchMap, tap } from 'rxjs';
import * as FriendActions from './friend.actions';
import { ApplicationUser } from '../Entities/applicationUser';
import { FriendService } from './friend.service';
import { MessageService } from 'primeng/api';
import { Injectable } from '@angular/core';
import { FriendRequest } from '../Entities/friendRequest';

@Injectable()
export class FriendEffects {
  sendFriendRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FriendActions.sendFriendRequest),
      switchMap((action) =>
        from(
          this.backend.sendFriendRequest(
            action.currentUserName,
            action.senderUserName
          )
        ).pipe(
          map((user: ApplicationUser) =>
            FriendActions.sendFriendRequestSuccess({ user })
          ),
          catchError((error) =>
            of(FriendActions.sendFriendRequestFailure({ error }))
          )
        )
      )
    )
  );

  sendFriendRequestSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(FriendActions.sendFriendRequestSuccess),
        tap(() => {
          this.messageService.add({
            key: 'friendReqSent',
            severity: 'success',
            summary: 'Success',
            detail: 'Friend request sent successfully !',
          });
        })
      ),
    { dispatch: false }
  );


  confirmFriendRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FriendActions.confirmFriendRequest),
      switchMap((action) =>
        this.backend
          .confirmFriendRequest(action.currentUserName, action.senderUserName)
          .pipe(
            map((user: ApplicationUser) =>
              FriendActions.confirmFriendRequestSuccess({ user })
            ),
            catchError((error) =>
              of(FriendActions.confirmFriendRequestFailure({ error }))
            )
          )
      )
    )
  );

  friendRequestAccepted$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(FriendActions.confirmFriendRequestSuccess),
        tap(() => {
          this.messageService.add({
            key: 'acceptFriendReq',
            severity: 'success',
            summary: 'Success',
            detail: 'Friend request accepted successfully !',
          });
        })
      ),
    { dispatch: false }
  );

  denyFriendRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FriendActions.deleteFriendRequest),
      switchMap((action) =>
        this.backend
          .denyFriendRequest(action.currentUserName, action.senderUserName)
          .pipe(
            map((user: ApplicationUser) =>
              FriendActions.deleteFriendRequestSuccess({ user })
            ),
            catchError((error) =>
              of(FriendActions.deleteFriendRequestFailure({ error }))
            )
          )
      )
    )
  );

  friendRequestDenied$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(FriendActions.deleteFriendRequestSuccess),
        tap(() => {
          this.messageService.add({
            key: 'denyFriendReq',
            severity: 'warning',
            summary: 'Warning',
            detail: 'You have denied the friend request',
          });
        })
      ),
    { dispatch: false }
  );

  getFriendRequestsCount$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FriendActions.getFriendRequestCount),
      switchMap((action) =>
        this.backend.getFriendRequestsCount(action.currentUserName).pipe(
          map((count: number) =>
            FriendActions.getFriendRequestCountSuccess({ count })
          ),
          catchError((error) =>
            of(FriendActions.getFriendRequestCountFailure({ error }))
          )
        )
      )
    )
  );

  getAllFriendRequests$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FriendActions.getAllFriendRequests),
      switchMap((action) =>
        this.backend.getAllFriendRequests(action.currentUserName).pipe(
          map((friendRequests: FriendRequest[]) =>
            FriendActions.getAllFriendRequestsSuccess({ friendRequests })
          ),
          catchError((error) =>
            of(FriendActions.getAllFriendRequestsFailure({ error }))
          )
        )
      )
    )
  );

  getAllUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FriendActions.getAllUsers),
      switchMap((action) =>
        this.backend.getAllUsers(action.currentUserName).pipe(
          map((allUsers: ApplicationUser[]) =>
            FriendActions.getAllUsersSuccess({ allUsers })
          ),
          catchError((error) => of(FriendActions.getAllUsersFailure({ error })))
        )
      )
    )
  );

  getAllFriend$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FriendActions.getAllFriends),
      switchMap((action) =>
        this.backend.getAllFriends(action.currentUserName).pipe(
          map((allFriends: ApplicationUser[]) =>
            FriendActions.getAllFriendsSuccess({ allFriends })
          ),
          catchError((error) =>
            of(FriendActions.getAllFriendsFailure({ error }))
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private backend: FriendService,
    private messageService: MessageService
  ) {}
}
