import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MailSenderService } from '../mail-sender.service';
import { MdDialog } from '@angular/material';
import { SuccessDialogComponent } from '../success-dialog/success-dialog.component';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

@Component({
  selector: 'app-send',
  templateUrl: './send.component.html',
  styleUrls: ['./send.component.scss']
})
export class SendComponent implements OnInit {
  isSendingRequest = false

  fromFormControl = new FormControl('test@wp.pl', [
    Validators.required,
    Validators.pattern(EMAIL_REGEX)
  ])

  toFormControl = new FormControl('kuzirashi@interia.pl', [
    Validators.required,
    Validators.pattern(EMAIL_REGEX)
  ])

  subjectFormControl = new FormControl('Subject', [
    Validators.required
  ])

  messageFormControl = new FormControl('Message', [
    Validators.required
  ])

  constructor(
    private mailSenderService : MailSenderService,
    private dialog : MdDialog
  ) { }

  ngOnInit() {
  }

  isValid() : boolean {
    return [
      this.fromFormControl.valid,
      this.toFormControl.valid,
      this.subjectFormControl.valid,
      this.messageFormControl.valid
    ].every(value => value === true);
  }

  async send() {
    if (!this.isValid()) {
      return this.openErrorDialog('Form is invalid.');
    }

    try {
      this.isSendingRequest = true;

      await this.mailSenderService.sendMail(
        this.fromFormControl.value,
        this.toFormControl.value,
        this.subjectFormControl.value,
        this.messageFormControl.value
      );

      this.openSuccessDialog();
    } catch (error) {
      this.openErrorDialog(error);
    } finally {
      this.isSendingRequest = false;
    }
  }

  openSuccessDialog() : void {
    this.dialog.open(SuccessDialogComponent, {
      width: '600px'
    });
  }

  openErrorDialog(error : string) : void {
    this.dialog.open(ErrorDialogComponent, {
      width: '600px',
      data: {
        error
      }
    });
  }
}
