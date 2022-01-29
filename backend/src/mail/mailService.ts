import nodemailer from "./../../node_modules/nodemailer";

export class MailService {
  public async send(address: string, subject: string, body: string) {
    console.log("sending", address, subject, body);
  }
}
