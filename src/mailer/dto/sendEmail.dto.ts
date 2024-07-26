export class SendEmailDto{
    from?: string;
    recipients: string[];
    subject: string;
    html: string;
    text?: string;
    placeholderReplacements?: Record<string, string>;
}