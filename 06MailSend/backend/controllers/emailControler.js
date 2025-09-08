import transporter from '../config/nodeMailer.js'
import { WELCOME_EMAIL_TEMPLATE } from '../config/emailTemplete.js'
const sendEmail = async (req, res) => {
    try {

        const { name, email, message } = req.body;

        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: 'Welcome to my Website',
            html: WELCOME_EMAIL_TEMPLATE
                .replace(/{{name}}/g, name)
                .replace(/{{email}}/g, email)
                .replace(/{{message}}/g, message)
        }


        await transporter.sendMail(mailOptions);

        res.json({
            success: true,
            message: "Email Send Successfully"
        })

    } catch (error) {
        res.json({
            success: false,
            message: error.message || "Email Could not send"
        })
    }
}

export default sendEmail