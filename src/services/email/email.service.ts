import { CustomLogger, Logger } from '@/providers/logger.provider.js';
import { Injectable } from '@decorators/di';
import { config } from '@/providers/config.provider.js';
import nodemailer from 'nodemailer';

@Injectable()
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
