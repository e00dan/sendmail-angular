import { Injectable } from '@angular/core';
import { IMailProvider } from './business/IMailProvider';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URLSearchParams } from '@angular/http';
import { SettingsService } from './settings.service';
import 'rxjs/add/operator/toPromise'

const DOMAIN_NAME_PLACEHOLDER = '{DOMAIN_NAME}';

@Injectable()
export class MailProviderMailgunService implements IMailProvider {
  public get isConfigured() : boolean {
    return Boolean(this.domainName && this.apiKey);
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

  public get domainName() : string {
    return this.settings.get(this._settingDomainNameKey);
  }

  public set domainName(value : string) {
    this.settings.set(this._settingDomainNameKey, value);
  }

  public get apiKey() : string {
    return this.settings.get(this._settingApiKeyName);
  }

  public set apiKey(value : string) {
    this.settings.set(this._settingApiKeyName, value);
  }

  private readonly _apiHostFormat = `https://api.mailgun.net/v3/${DOMAIN_NAME_PLACEHOLDER}/messages`

  private readonly _statusUrl = 'https://www.mailgun.com/';

  private readonly _settingEnabledKey = 'mailgunEnabled'

  private readonly _settingDomainNameKey = 'mailgunDomainName'

  private readonly _settingApiKeyName = 'mailgunApiKey'

  private get _apiHost() : string {
    return this._apiHostFormat.replace(DOMAIN_NAME_PLACEHOLDER, this.domainName);
  }

  private get _headers() : HttpHeaders {
    let headers = new HttpHeaders();

    headers = headers.append('Authorization', 'Basic ' + btoa(`api:${this.apiKey}`));
    headers = headers.append('Content-Type', 'application/x-www-form-urlencoded');

    return headers;
  }

  constructor(
    private http : HttpClient,
    private settings : SettingsService
  ) { }

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
      const response = await this.http.get(this._statusUrl, {
        responseType: 'text'
      }).toPromise();

      return true;
    } catch (error) {
      return false;
    }
  }

  private _getSendMailRequestBody(from : string, to : string, subject : string, message : string) {
    const body = new URLSearchParams();

    body.set('from', from);
    body.set('to', to);
    body.set('subject', subject);
    body.set('text', message);

    return body.toString();
  }
}
