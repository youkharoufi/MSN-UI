import { Injectable } from '@angular/core';
import { Update } from '@ngrx/entity';
import { select, Store } from '@ngrx/store';

import { loginAccount, registerAccount } from './account.actions';
import * as fromAccount from './account.reducers';
import * as AccountSelectors from './account.selectors';
import { ApplicationUser } from '../Entities/applicationUser';
import { LoginUser } from '../Entities/loginUser';

@Injectable({ providedIn: 'root' })
export class AccountFacade {

  allUsers$ = this.store.pipe(select(AccountSelectors.getAllUsers));
  oneUser$ = this.store.pipe(select(AccountSelectors.getUser));

  constructor(private store: Store<fromAccount.AccountPartialState>) { }

  login(loginUser: LoginUser) {
    this.store.dispatch(loginAccount({loginUser}));
  }

  register(registerUser: FormData) {
    this.store.dispatch(registerAccount({ registerUser }));
  }


}
