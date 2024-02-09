import { Controller, Post } from '@nestjs/common';
import { MailService } from './mail.service';
import { SendEmailDto } from './dto/mail.dto';
// import './emailTemplates/password-reset.html';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post('/send-email')
  async sendMail() {
    const dto: SendEmailDto = {
      //   from: { name: 'John', address: 'doe@email.com' },
      recipients: [{ name: 'Cat', address: 'post@man.com' }],
      subject: 'Password Reset',
      html: '<p>Hey Email</p>',
    };

    // return await this.mailService.sendEmail(dto);
  }
}
