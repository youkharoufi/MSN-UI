import { FormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { MainPageComponent } from './main-page/main-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PimeNgModule } from '@msn-ui/pime-ng';
import { StoreModule } from '@ngrx/store';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ConfirmationService, MessageService } from 'primeng/api';
import { EmailConfirmationComponent } from './email-confirmation/email-confirmation.component';
import { MenuComponent } from './menu/menu.component';
import { FriendRequestsComponent } from './friend-requests/friend-requests.component';
import { MsnDomainModule } from '@msn-ui/store';
import { HttpLoadingInterceptor } from './Interceptors/http-loading.interceptor';

const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'email-confirmation', component: EmailConfirmationComponent },
  { path: 'friend-requests', component: FriendRequestsComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    NxWelcomeComponent,
    MainPageComponent,
    EmailConfirmationComponent,
    MenuComponent,
    FriendRequestsComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes, { initialNavigation: 'enabledBlocking' }),
    MsnDomainModule,
    PimeNgModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    HttpClientModule,
    FormsModule,
  ],
  providers: [ConfirmationService, MessageService, MenuComponent, AppComponent,
    { provide: HTTP_INTERCEPTORS, useClass: HttpLoadingInterceptor, multi: true, deps: [AppComponent] }],
  bootstrap: [AppComponent],
})
export class AppModule {}
