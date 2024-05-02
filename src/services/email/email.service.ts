import { CustomLogger, Logger } from '@providers/logger.provider';
import { Service } from 'typedi';
import nodemailer from 'nodemailer';
import { config } from '@providers/config.provider';

@Service()
export class EmailService {
  @Logger()
  private readonly logger: CustomLogger;
  transport: nodemailer.Transporter;

  constructor() {
    this.transport = nodemailer.createTransport({
      auth: {
        pass: config.SMTP_PASSWORD,
        user: config.SMTP_USERNAME,
      },
      host: config.SMTP_HOST_NAME,
      port: Number(config.SMTP_PORT),
      from: config.SENDER_EMAIL,
    });
  }
}
