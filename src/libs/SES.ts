import { SendEmailCommand, SendEmailCommandInput, SESClient } from "@aws-sdk/client-ses";

const sesClient = new SESClient()

export const sendEmailNotification = async ({
    email,
    text,
    subject,
    html,
}: {
    email: string,
    text: string,
    subject: string,
    html?: string,

}) => {
    const params: SendEmailCommandInput = {
        Source: 'vishsubramani3@gmail.com',
        Destination: {
            ToAddresses: [email],
        },
        Message: {
            Body: {
                Text: {
                    Charset: 'UTF-8',
                    Data: text,
                }
            },
            Subject: {
                Charset: 'UTF-8',
                Data: subject,
            },
        }
    }

    if (html) {
        params.Message.Body.Html = {
            Charset: 'UTF-8',
            Data: html,
        }
    }

    const command = new SendEmailCommand(params)

    const response = await sesClient.send(command)

    return response.MessageId

    
}

const SES = {
    sendEmailNotification,
}

export default SES