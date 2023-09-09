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
            map((loginUser: ApplicationUser) =>
              AccountActions.loginAccountSuccess({ loginUser })
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
          map((registerUser: ApplicationUser) =>
            AccountActions.registerAccountSuccess({ registerUser })
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

  constructor(private actions$: Actions, private backend: AccountService) { }

        }
