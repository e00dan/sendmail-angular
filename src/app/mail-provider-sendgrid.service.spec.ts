import { TestBed, inject } from '@angular/core/testing';

import { MailProviderSendgridService } from './mail-provider-sendgrid.service';

describe('MailProviderSendgridService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MailProviderSendgridService]
    });
  });

  it('should be created', inject([MailProviderSendgridService], (service: MailProviderSendgridService) => {
    expect(service).toBeTruthy();
  }));
});
