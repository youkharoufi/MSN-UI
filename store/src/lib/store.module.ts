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

import * as fromFriend from './FriendStore/friend.reducers';
import { FriendEffects } from './FriendStore/friend.effects';
import { FRIEND_API_ENDPOINT } from './FriendStore/friend.token';

import { PimeNgModule } from '@msn-ui/pime-ng';



@NgModule({
  imports: [
    CommonModule,
    PimeNgModule,

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

    StoreModule.forFeature(
      fromFriend.FRIEND_FEATURE_KEY,
      fromFriend.reducer
    ),
    EffectsModule.forFeature([FriendEffects]),
  ],
  providers: [
    { provide: ACCOUNT_API_ENDPOINT, useValue: '' },
    { provide: MESSAGE_API_ENDPOINT, useValue: '' },
    { provide: FRIEND_API_ENDPOINT, useValue: '' },
  ],
})
export class MsnDomainModule {}
