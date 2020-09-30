import nodemailer from 'nodemailer'

export async function sendEmail(to: string, message: string) {
    // let testAccount = await nodemailer.createTestAccount()
    
    let transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
            user: 'dk3hitkx34zkx7k2@ethereal.email',
            pass: '2Fv9UJDyTbeefSRfte'
        }
    })

    let info = await transporter.sendMail({
        from: 'MediCare <noreply@medicare.com',
        to: to,
        subject: 'alterar senha',
        html: message
    })

    console.log('Message sent: %s', info.MessageId)
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))
}