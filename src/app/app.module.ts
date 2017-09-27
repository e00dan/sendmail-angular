import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatInputModule,
  MatProgressSpinnerModule,
  MatDialogModule,
  MatCheckboxModule
} from '@angular/material';
import { RouterModule, Routes } from '@angular/router';
import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { SendComponent } from './send/send.component';

import { MailSenderService } from './mail-sender.service';
import { MailProviderSendgridService } from './mail-provider-sendgrid.service';
import { MailProviderMailgunService } from './mail-provider-mailgun.service';
import { SettingsService } from './settings.service';

import { SuccessDialogComponent } from './success-dialog/success-dialog.component';
import { ErrorDialogComponent } from './error-dialog/error-dialog.component';
import { WelcomeDialogComponent } from './welcome-dialog/welcome-dialog.component';

const appRoutes: Routes = [
  {
    path: 'welcome',
    component: WelcomeComponent,
    data: {
      state: 'welcome'
    }
  },
  {
    path: 'send',
    component: SendComponent,
    data: {
      state: 'send'
    }
  },
  {
    path: '',
    redirectTo: '/welcome',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    SendComponent,
    SuccessDialogComponent,
    ErrorDialogComponent,
    WelcomeDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(
      appRoutes,
      {
        useHash: true
      }
    ),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatCheckboxModule
  ],
  providers: [
    MailSenderService,
    MailProviderSendgridService,
    MailProviderMailgunService,
    SettingsService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    SuccessDialogComponent,
    ErrorDialogComponent,
    WelcomeComponent,
    WelcomeDialogComponent
  ]
})
export class AppModule { }
