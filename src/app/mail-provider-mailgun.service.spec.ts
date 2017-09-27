import { TestBed, inject } from '@angular/core/testing';

import {
  MailProviderMailgunService,
  SETTING_DOMAIN_NAME_KEY,
  SETTING_ENABLED_KEY,
  SETTING_API_KEY_NAME
} from './mail-provider-mailgun.service';
import { SettingsService } from './settings.service';
import { HttpClient } from '@angular/common/http';

const EXAMPLE_MAILGUN_API_KEY = '123MAILGUN_API_KEY321';
const EXAMPLE_MAILGUN_DOMAIN_NAME = 'sandbox@asd.eu';
const EXAMPLE_IS_ENABLED = 'false';
const EXAMPLE_IS_ENABLED_BOOLEAN = false;

describe('MailProviderMailgunService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MailProviderMailgunService,
        {
          provide: SettingsService,
          useValue: {
            map: {
              [SETTING_API_KEY_NAME]: EXAMPLE_MAILGUN_API_KEY,
              [SETTING_DOMAIN_NAME_KEY]: EXAMPLE_MAILGUN_DOMAIN_NAME,
              [SETTING_ENABLED_KEY]: EXAMPLE_IS_ENABLED
            },

            get(name : string) {
              return this.map[name];
            },

            getBoolean(name : string) {
              return this.map[name] === 'true';
            },

            isSet(name : string) {
              return true;
            }
          }
        },
        {
          provide: HttpClient,
          useValue: {}
        }
      ]
    });
  });

  it('should be created', inject([MailProviderMailgunService], (service: MailProviderMailgunService) => {
    expect(service).toBeTruthy();
  }));

  it('should get value of apiKey from settings', inject([MailProviderMailgunService], (service: MailProviderMailgunService) => {
    expect(service.apiKey).toEqual(EXAMPLE_MAILGUN_API_KEY);
  }));

  it('should get value of domainName from settings', inject([MailProviderMailgunService], (service: MailProviderMailgunService) => {
    expect(service.domainName).toEqual(EXAMPLE_MAILGUN_DOMAIN_NAME);
  }));

  it('should get value of isEnabled from settings', inject([MailProviderMailgunService], (service: MailProviderMailgunService) => {
    expect(service.isEnabled).toEqual(EXAMPLE_IS_ENABLED_BOOLEAN);
  }));
});
