import { ApplicationUser } from '@msn-ui/store';
import { Injectable } from '@angular/core';
import { Update } from '@ngrx/entity';
import { select, Store } from '@ngrx/store';
import { MessageService } from 'primeng/api';

import { allUsers, allUsersSuccess, confirmAccount, connectedUser, getUserByUsername, loginAccount, registerAccount } from './account.actions';
import * as fromAccount from './account.reducers';
import * as AccountSelectors from './account.selectors';
import { LoginUser } from '../Entities/loginUser';
import { ConfirmationEmail } from '../Entities/emailConfirmation';
import { tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AccountFacade {

  allUsers$ = this.store.pipe(select(AccountSelectors.getAllUsers));
  connectedUser$ = this.store.pipe(select(AccountSelectors.selectConnectedUser));
  byUsernameUser$ = this.store.pipe(
    select(AccountSelectors.selectByUsername),
    tap(value => {
      console.log(value)
    })
  );
  constructor(private store: Store<fromAccount.AccountPartialState>, private messageService : MessageService) { }

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

  connectedUser(username:string){
    this.store.dispatch(connectedUser({username}));
  }

  getUserByUserName(userName:string){
    this.store.dispatch(getUserByUsername({userName}));
  }

}
