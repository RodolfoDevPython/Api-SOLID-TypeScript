import { IMailProvider, IMessage } from "../IMailProviders";
import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";

export class MailtrapMailProvider implements IMailProvider {
    //https://mailtrap.io/inboxes/1247161/messages
    private transporter: Mail;

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: "smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "c1813bd42aab03",
                pass: "437d67fd554ad7"
            }
        })
    }

    async sendMail(message: IMessage): Promise<void> {
        await this.transporter.sendMail({
            to: {
                name: message.to.name,
                address: message.to.email
            },
            from: {
                name: message.from.name,
                address: message.from.email
            },
            subject: `Seja Bem Vindo ${message.to.name} ao MailTrap`,
            html: message.body
        })
    }
}