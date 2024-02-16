import * as nodemailer from 'nodemailer';
import { config as dotenvConfig } from 'dotenv';

dotenvConfig();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: `${process.env.MAIL_HOST}`,
  port: parseInt(process.env.MAIL_PORT),
  secure: false,
  auth: {
    user: `${process.env.MAIL_USER}`,
    pass: `${process.env.MAIL_PASSWORD}`,
  },
});
