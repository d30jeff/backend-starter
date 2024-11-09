import { Injectable } from '@decorators/di';
import nodemailer from 'nodemailer';

import { config } from '@/providers/config.provider.js';
import { CustomLogger, Logger } from '@/providers/logger.provider.js';

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
      from: '',
      host: config.SMTP_HOST_NAME,
      port: Number(config.SMTP_PORT),
    });
  }
}
