import { LoginUser } from './Entities/loginUser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import * as fromAccounts from './AccountStore/account.reducers';
import { AccountEffects } from './AccountStore/account.effects';
import { ACCOUNT_API_ENDPOINT } from './AccountStore/account.token';

import * as fromMessages from './MessageStore/message.reducers';
import { MessageEffects } from './MessageStore/message.effects';
import { MESSAGE_API_ENDPOINT } from './MessageStore/message.token';



@NgModule({
  imports: [
    CommonModule,

    StoreModule.forFeature(
      fromAccounts.ACCOUNT_FEATURE_KEY,
      fromAccounts.reducer
    ),
    EffectsModule.forFeature([AccountEffects]),

    StoreModule.forFeature(
      fromMessages.MESSAGE_FEATURE_KEY,
      fromMessages.reducer
    ),
    EffectsModule.forFeature([MessageEffects]),
  ],
  providers: [
    { provide: ACCOUNT_API_ENDPOINT, useValue: '' },
    { provide: MESSAGE_API_ENDPOINT, useValue: '' },
  ],
})
export class MsnDomainModule {}
