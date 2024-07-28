import { Address } from "nodemailer";

export class SendEmailDto{
    from?: Address;
    recipients: string[];
    subject: string;
    html: string;
    text?: string;
    placeholderReplacements?: Record<string, string>;
}

export class OtpDto{
    email: string;
    otp: string;
}