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
        from(this.backend.sendFriendRequest(action.currentUserName, action.senderUserName)).pipe(
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

  showFriendError$ = createEffect(() =>
  this.actions$.pipe(
    ofType(FriendActions.sendFriendRequestFailure),
    tap(() => {
      this.messageService.add({key:"FriendRequestError", severity:'error', summary: 'Error', detail: 'Error occured during friend request'});
    })
  ), { dispatch: false }
);

  confirmFriendRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FriendActions.confirmFriendRequest),
      switchMap((action) =>
        this.backend.confirmFriendRequest(action.currentUserName, action.senderUserName).pipe(
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

  denyFriendRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FriendActions.deleteFriendRequest),
      switchMap((action) =>
        this.backend.denyFriendRequest(action.currentUserName, action.senderUserName).pipe(
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
            catchError((error) =>
              of(FriendActions.getAllUsersFailure({ error }))
            )

        )
      )
      )
  );



  constructor(private actions$: Actions, private backend: FriendService, private messageService : MessageService) { }

        }
