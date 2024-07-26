import { Controller, Post } from '@nestjs/common';
import { MailerService } from './mailer.service';
import { SendEmailDto } from './dto/sendEmail.dto';
import { Public } from 'src/decorators/public.decorator';

@Controller('otpService')
export class MailerController {
  constructor(private readonly mailerService: MailerService) {}

  @Public()
  @Post('sendOtp')
  async sendMail() {
    const dto: SendEmailDto = {
      recipients: ["james@email.com"],
      subject: "Complete your Registration",
      html: "<p>Hello your OTP is <strong>123456</strong>, complete your registration</p>"
    }
    return await this.mailerService.sendEmail(dto);
  }
}
