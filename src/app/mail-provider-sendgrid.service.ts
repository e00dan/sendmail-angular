import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SettingsService } from './settings.service';
import { IMailProvider } from './business/IMailProvider';
import 'rxjs/add/operator/toPromise';

export const SETTING_ENABLED_KEY = 'sendgridEnabled';
export const SETTING_API_KEY_NAME = 'sendgridApiKey';

@Injectable()
export class MailProviderSendgridService implements IMailProvider {
  public get isConfigured() : boolean {
    return Boolean(this.apiKey);
  }

  public get isEnabled() : boolean {
    if (!this.settings.isSet(this._settingEnabledKey)) {
      this.settings.set(this._settingEnabledKey, true);

      return true;
    }

    return this.settings.getBoolean(this._settingEnabledKey);
  }

  public set isEnabled(value : boolean) {
    this.settings.setBoolean(this._settingEnabledKey, value);
  }

  public get apiKey() : string {
    return this.settings.get(this._settingApiKeyName);
  }

  public set apiKey(value : string) {
    this.settings.set(this._settingApiKeyName, value);
  }

  private readonly _apiHost = 'https://api.sendgrid.com/v3/mail/send'

  private readonly _statusApiUrl = 'http://3tgl2vf85cht.statuspage.io/api/v2/status.json'

  private readonly _settingEnabledKey = SETTING_ENABLED_KEY

  private readonly _settingApiKeyName = SETTING_API_KEY_NAME

  private get _headers() : HttpHeaders {
    let headers = new HttpHeaders();

    headers = headers.append('Authorization', `Bearer ${this.apiKey}`);
    headers = headers.append('Content-Type', 'application/json');

    return headers;
  }

  constructor(
    private http : HttpClient,
    private settings : SettingsService
  ) {

  }

  public async sendMail(from: string, to: string, subject : string, message: string) : Promise<boolean> {
    const body = this._getSendMailRequestBody(from, to, subject, message);

    const result = await this.http.post(this._apiHost, body, {
      headers: this._headers,
      responseType: 'text'
    }).toPromise();

    return true;
  }

  public async checkStatus() : Promise<boolean> {
    if (!this.isEnabled || !this.isConfigured) {
      return Promise.resolve(false);
    }

    try {
      const response = await this.http.get(this._statusApiUrl).toPromise();

      return response['status']['indicator'] === 'none';
    } catch (error) {
      return false;
    }
  }

  private _getSendMailRequestBody(from : string, to : string, subject : string, message : string) {
    return {
      personalizations: [
        {
          to: [
            {
              email: to
            }
          ],
          subject
        }
      ],
      from: {
        email: from
      },
      content: [
        {
          type: 'text/plain',
          value: message
        }
      ]
    };
  }
}
