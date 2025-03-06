import jwt from "jsonwebtoken";
import { URLSearchParams } from "url";
import nodemailer from "nodemailer";

const SECRET_KEY = process.env.SECRET_EMAIL_TOKEN_KEY as string;
import { Algorithm } from "jsonwebtoken";

const HASH_ALOGOROTHM = process.env.HASH_ALOGOROTHM as Algorithm;

type TokenPayload = {
  email: string;
  exp: number;
};

export function generateToken(email: string): string {
  const payload: TokenPayload = {
    email,
    exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60, // Валидност 24 часа
  };
  return jwt.sign(payload, SECRET_KEY, { algorithm: HASH_ALOGOROTHM });
}

export function decodeToken(token: string) {
  const decodedData = jwt.verify(token, SECRET_KEY);
  if (!decodedData) {
    return null;
  }
  return decodedData;
}

export function generateLink(baseUrl: string, token: string): string {
  const params = new URLSearchParams({ token });
  return `${baseUrl}?${params.toString()}`;
}

export function replaceVariables(
  template: string,
  variables: Record<string, string>
): string {
  return template.replace(/{{([\w-]+)}}/g, (_, key) => {
    const value = variables[key];
    return value !== undefined && value !== null ? value : `{{${key}}}`;
  });
}

export async function sendEmail(
  email: string,
  subject: string,
  html: string,
): Promise<void> {
  const SMTP_HOST = process.env.SMTP_HOST as string;
  const SMTP_USER = process.env.SMTP_USER as string;
  const SMTP_PASS = process.env.SMTP_PASS as string;

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });

  const mailOptions = {
    from: SMTP_USER,
    to: email,
    subject: subject,
    html: html,
  };

  await transporter.sendMail(mailOptions);
}
