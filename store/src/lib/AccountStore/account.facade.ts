import { ApplicationUser } from '@msn-ui/store';
import { Injectable } from '@angular/core';
import { Update } from '@ngrx/entity';
import { select, Store } from '@ngrx/store';

import { allUsers, allUsersSuccess, confirmAccount, connectedUser, getUserByUsername, loginAccount, registerAccount } from './account.actions';
import * as fromAccount from './account.reducers';
import * as AccountSelectors from './account.selectors';
import { LoginUser } from '../Entities/loginUser';
import { ConfirmationEmail } from '../Entities/emailConfirmation';

@Injectable({ providedIn: 'root' })
export class AccountFacade {

  allUsers$ = this.store.pipe(select(AccountSelectors.getAllUsers));
  oneUser$ = this.store.pipe(select(AccountSelectors.getUser));
  connectedUser$ = this.store.pipe(select(AccountSelectors.selectConnectedUser));
  byUsernameUser$ = this.store.pipe(select(AccountSelectors.selectByUsername));

  constructor(private store: Store<fromAccount.AccountPartialState>) { }

  login(loginUser: LoginUser) {
    this.store.dispatch(loginAccount({loginUser}));
  }

  register(registerUser: FormData) {
    this.store.dispatch(registerAccount({ registerUser }));
  }

  confirmationEmail(confEmail:ConfirmationEmail){
    this.store.dispatch(confirmAccount({confEmail}))
  }

  allUsers(){
    this.store.dispatch(allUsers());
  }

  connectedUser(){
    this.store.dispatch(connectedUser());
  }

  getUserByUserName(userName:string){
    this.store.dispatch(getUserByUsername({userName}));
  }

}
