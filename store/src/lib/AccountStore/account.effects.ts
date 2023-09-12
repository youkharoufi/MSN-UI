import { ConfirmationEmail } from './../Entities/emailConfirmation';
import { environment } from './../../../../apps/msn-ui/src/environments/environment';
import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import * as AccountActions from './account.actions';
import { AccountService } from './account.service';
import { ApplicationUser } from '../Entities/applicationUser';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';

@Injectable()
export class AccountEffects {


  private currentUserSource = new BehaviorSubject<ApplicationUser | null>(null);
  public currentUser$ = this.currentUserSource.asObservable();

  setCurrentUser(user: ApplicationUser) {
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSource.next(user);
  }

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AccountActions.loginAccount),
      switchMap((action) =>
        this.backend.login(action.loginUser).pipe(
          tap((user:ApplicationUser) => {
            console.log(user.token);
            if (user) {
              console.log(user);
              this.setCurrentUser(user);
            }
          }),
            map((loggedUser: ApplicationUser) =>
              AccountActions.loginAccountSuccess({ loggedUser })
            ),
            catchError((error) =>
              of(AccountActions.loginAccountFailure({ error }))
            )

        )
      )
      )
  );

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AccountActions.registerAccount),
      switchMap((action) =>
        this.backend.register(action.registerUser).pipe(
          map((registeredUser: ApplicationUser) =>
            AccountActions.registerAccountSuccess({ registeredUser })
          ),
          catchError((error) =>
            of(AccountActions.registerAccountFailure({ error }))
          )

        )
      )
    )
  );

  confirm$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AccountActions.confirmAccount),
      switchMap((action) =>
        this.backend.emailConfirmation(action.confEmail).pipe(
          map((user:ApplicationUser ) =>
            AccountActions.confirmAccountSuccess({ user })
          ),
          catchError((error) =>
            of(AccountActions.confirmAccountFailure({ error }))
          )

        )
      )
    )
  );

  allUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AccountActions.allUsers),
      switchMap((action) =>
        this.backend.getAllUsers().pipe(
          map((users:ApplicationUser[] ) =>
            AccountActions.allUsersSuccess({ users })
          ),
          catchError((error) =>
            of(AccountActions.allUsersFailure({ error }))
          )

        )
      )
    )
  );

  connectedUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AccountActions.connectedUser),
      switchMap((action) =>
        this.backend.connectedUser().pipe(
          map((user:ApplicationUser) =>
            AccountActions.confirmAccountSuccess({ user })
          ),
          catchError((error) =>
            of(AccountActions.connectedUserFailure({ error }))
          )

        )
      )
    )
  );

  getUserByUsername$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AccountActions.getUserByUsername),
      switchMap((action) =>
        this.backend.getUserByUsername(action.userName).pipe(
          map((byUsernameUser:ApplicationUser) =>
            AccountActions.getUserByUsernameSuccess({ byUsernameUser })
          ),
          catchError((error) =>
            of(AccountActions.getUserByUsernameFailure({ error }))
          )

        )
      )
    )
  );

  constructor(private actions$: Actions, private backend: AccountService) { }

        }
