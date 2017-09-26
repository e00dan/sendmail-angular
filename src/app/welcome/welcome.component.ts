import { Component, OnInit } from '@angular/core';
import { MdDialog } from '@angular/material';
import { WelcomeDialogComponent } from '../welcome-dialog/welcome-dialog.component';
import { MailProviderSendgridService } from '../mail-provider-sendgrid.service';
import { MailProviderMailgunService } from '../mail-provider-mailgun.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  constructor(
    private dialog : MdDialog,
    private sendgrid : MailProviderSendgridService,
    private mailgun : MailProviderMailgunService
  ) { }

  ngOnInit() {
    setTimeout(() => this.openWelcomeDialog(), 0);
  }

  openWelcomeDialog() : void {
    this.dialog.open(WelcomeDialogComponent, {
      width: '600px'
    });
  }
}
