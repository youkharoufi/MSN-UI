import { LoginUser } from './Entities/loginUser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import * as fromAccounts from './AccountStore/account.reducers';
import { AccountEffects } from './AccountStore/account.effects';
import { ACCOUNT_API_ENDPOINT } from './AccountStore/account.token';





@NgModule({
  imports: [
    CommonModule,

    StoreModule.forFeature(
      fromAccounts.ACCOUNT_FEATURE_KEY,
      fromAccounts.reducer
    ),
    EffectsModule.forFeature([AccountEffects]),
  ],
  providers: [
    { provide: ACCOUNT_API_ENDPOINT, useValue: '' },
  ],
})
export class MsnDomainModule {}
