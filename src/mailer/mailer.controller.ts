import { Controller, Post,Body } from '@nestjs/common';
import { MailerService } from './mailer.service';
import { OtpDto, SendEmailDto } from './dto/sendEmail.dto';
import { Public } from 'src/decorators/public.decorator';

@Controller('otpService')
export class MailerController {
  constructor(private readonly mailerService: MailerService) {}

  @Public()
  @Post('sendOtp')
  async sendMail(@Body() otpDto: OtpDto) {

    const dto: SendEmailDto = {
      recipients: [otpDto.email],
      subject: "Complete your Registration",
      html: "<p>Hello your OTP is <strong>"+otpDto.otp+"</strong>, complete your registration</p>"
    }
    return await this.mailerService.sendEmail(dto);
  }
}
