import { Injectable } from '@angular/core';
import { IMailProvider } from './business/IMailProvider';
import { detect } from 'async';
import { MailProviderSendgridService } from './mail-provider-sendgrid.service';
import { MailProviderMailgunService } from './mail-provider-mailgun.service';

export const NO_PROVIDER_ERROR_MESSAGE = 'No working, enabled and fully configured email provider.';

@Injectable()
export class MailSenderService {
  private _providers : IMailProvider[] = []

  constructor(
    sendgridProvider : MailProviderSendgridService,
    mailgunProvider : MailProviderMailgunService) {
      this._providers.push(sendgridProvider);
      this._providers.push(mailgunProvider);
  }

  getWorkingProvider() : Promise<IMailProvider> {
    return new Promise((resolve, reject) => {
      detect(this._providers, async (provider, callback) => {
        try {
          callback(null, await provider.checkStatus());

        } catch (error) {
          callback(error, false)
        }
      }, (error, workingProvider) => {
        if (error) {
          return reject(error);
        }

        resolve(workingProvider);
      });
    });
  }

  async sendMail(from : string, to : string, subject : string, message : string) : Promise<boolean> {
    try {
      const provider = await this.getWorkingProvider();

      if (!provider) {
        throw NO_PROVIDER_ERROR_MESSAGE;
      }

      return await provider.sendMail(from, to, subject, message);
    } catch (error) {
      throw error;
    }
  }
}
