import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { SendEmailDto } from './dto/mail.dto';
import Mail from 'nodemailer/lib/mailer';

@Injectable()
export class MailService {
  constructor(private readonly configService: ConfigService) {}

  // Would like to utilize mail.ts file for modularization purposes. Not sure how, haha.
  mailTransport() {
    const transporter = nodemailer.createTransport({
      service: this.configService.get<string>('MAIL_SERVICE'),
      host: this.configService.get<string>('MAIL_HOST'),
      port: this.configService.get<number>('MAIL_PORT'),
      secure: false,
      auth: {
        user: this.configService.get<string>('MAIL_USER'),
        pass: this.configService.get<string>('MAIL_PASSWORD'),
      },
    });

    return transporter;
  }

  async sendPasswordResetEmail(dto: SendEmailDto) {
    const { from, recipients, subject, html } = dto;

    const transport = this.mailTransport();

    const options: Mail.Options = {
      from: from ?? {
        name: this.configService.get<string>('APP_NAME'),
        address: this.configService.get<string>('DEFAULT_MAIL_FROM'),
      },
      to: recipients,
      subject,
      html,
    };

    try {
      const result = await transport.sendMail(options);
      return result;
    } catch (error) {
      console.error('Error sending email:: ', error);
    }
  }
}
