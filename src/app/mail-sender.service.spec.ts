import { TestBed, inject } from '@angular/core/testing';

import { MailSenderService } from './mail-sender.service';

describe('MailSenderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MailSenderService]
    });
  });

  it('should be created', inject([MailSenderService], (service: MailSenderService) => {
    expect(service).toBeTruthy();
  }));
});
