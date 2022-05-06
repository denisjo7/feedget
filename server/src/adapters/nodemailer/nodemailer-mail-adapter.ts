import { MailAdapter, SendMailData } from '../mail-adapter';
import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: '15eab1d5e18c06',
    pass: 'e0632bcd39e5ad',
  },
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({ subject, body }: SendMailData) {
    await transport.sendMail({
      from: 'Equipe Feedget <freezing@feedget.com>',
      to: 'Denis Jonathan <denisjonathan7@gmail.com>',
      subject,
      html: body,
    });
  }
}
