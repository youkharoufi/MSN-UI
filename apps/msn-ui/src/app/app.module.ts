import { FormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { MsnDomainModule } from './../../../../store/src/lib/store.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { MainPageComponent } from './main-page/main-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PimeNgModule } from '@msn-ui/pime-ng';
import { StoreModule } from '@ngrx/store';
import { HttpClientModule } from '@angular/common/http';
import { ConfirmationService, MessageService } from 'primeng/api';

const routes : Routes = [
  {path:'', component:MainPageComponent}
]

@NgModule({
  declarations: [AppComponent, NxWelcomeComponent, MainPageComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes, { initialNavigation: 'enabledBlocking' }),
    MsnDomainModule,
    PimeNgModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    HttpClientModule,
    FormsModule

  ],
  providers:[ConfirmationService, MessageService],
  bootstrap: [AppComponent],
})
export class AppModule {}
