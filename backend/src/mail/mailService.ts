import { Transport } from "nodemailer";
import nodemailer from "./../../node_modules/nodemailer";

export class MailService {
  transport = nodemailer.createTransport({
    host: "posteo.de",
    port: 465,
    secure: true, // upgrade later with STARTTLS
    auth: {
      user: "USER",
      pass: "YOUR_PWD",
    },
  });

  public async send(address: string, subject: string, body: string) {
    console.log("sending", address, subject, body);

    const mailOptions = {
      from: "tippkaemper@posteo.de",
      to: address,
      subject: "Registering in Maniacforum2",
      text: body,
    };

    this.transport.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  }
}
