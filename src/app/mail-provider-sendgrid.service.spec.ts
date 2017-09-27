import { TestBed, inject } from '@angular/core/testing';

import { MailProviderSendgridService, SETTING_API_KEY_NAME, SETTING_ENABLED_KEY } from './mail-provider-sendgrid.service';
import { HttpClient } from '@angular/common/http';
import { SettingsService } from './settings.service';

const EXAMPLE_API_KEY = 'SENDGRID_API_KEY_123';
const EXAMPLE_IS_ENABLED = 'true';
const EXAMPLE_IS_ENABLED_BOOLEAN = true;

describe('MailProviderSendgridService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MailProviderSendgridService,
        {
          provide: HttpClient,
          useValue: {}
        },
        {
          provide: SettingsService,
          useValue: {
            map: {
              [SETTING_API_KEY_NAME]: EXAMPLE_API_KEY,
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
        }
      ]
    });
  });

  it('should be created', inject([MailProviderSendgridService], (service: MailProviderSendgridService) => {
    expect(service).toBeTruthy();
  }));

  it('should get value of apiKey from settings', inject([MailProviderSendgridService], (service: MailProviderSendgridService) => {
    expect(service.apiKey).toEqual(EXAMPLE_API_KEY);
  }));

  it('should get value of isEnabled from settings', inject([MailProviderSendgridService], (service: MailProviderSendgridService) => {
    expect(service.isEnabled).toEqual(EXAMPLE_IS_ENABLED_BOOLEAN);
  }));
});
