import { TestBed, inject } from '@angular/core/testing';

import { MailSenderService } from './mail-sender.service';
import { MailProviderSendgridService } from './mail-provider-sendgrid.service';
import { MailProviderMailgunService } from './mail-provider-mailgun.service';
import { HttpClient } from '@angular/common/http';
import { SettingsService } from './settings.service';

describe('MailSenderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MailSenderService,
        MailProviderSendgridService,
        MailProviderMailgunService,
        {
          provide: HttpClient,
          useValue: {}
        },
        {
          provide: SettingsService,
          useValue: {}
        }
      ]
    });
  });

  it('should be created', inject([MailSenderService], (service: MailSenderService) => {
    expect(service).toBeTruthy();
  }));
});
