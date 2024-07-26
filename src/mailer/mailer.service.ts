import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer'
import { SendEmailDto } from './dto/sendEmail.dto';
import { Mail } from 'nodemailer/lib/mailer'

@Injectable()
export class MailerService {
    constructor(private readonly configService: ConfigService) {}
    mailTransport(){
        const transporter = nodemailer.createTransport({
            host: this.configService.get<string>('MAIL_HOST'),
            port: this.configService.get<number>('MAIL_PORT'),
            secure: false,
            auth: {
                user: this.configService.get<string>('MAIL_USER'),
                pass: this.configService.get<string>('MAIL_PASSWORD')
            }
        });

        return transporter;
    }

    async sendEmail(sendEmailDto: SendEmailDto){
        const {from, recipients, subject, html, placeholderReplacements} = sendEmailDto;

        const transport = this.mailTransport();

        const options: Mail.Options = {
            from: {
                name: this.configService.get<string>('APP_NAME'),
                address: this.configService.get<string>('DEFAULT_MAILFROM')
            },
            to: recipients,
            subject,
            html
        };

        try
        {
            const result = await transport.sendMail(options);
        }
        catch(error) 
        {
            console.log('Error', error);
        }
    }
}
