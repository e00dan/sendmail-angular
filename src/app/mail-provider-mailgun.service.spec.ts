import { TestBed, inject } from '@angular/core/testing';

import { MailProviderMailgunService } from './mail-provider-mailgun.service';

describe('MailProviderMailgunService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MailProviderMailgunService]
    });
  });

  it('should be created', inject([MailProviderMailgunService], (service: MailProviderMailgunService) => {
    expect(service).toBeTruthy();
  }));
});
