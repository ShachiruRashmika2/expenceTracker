const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
});

const sendEmail = async (req,res) => {

    const{recEmail,sub,msg}=req.body;

    try {
        const mailOptions = {
            from: 'dsdas',
            to: recEmail,
            subject: sub,
            text: msg
        };
        await transporter.sendMail(mailOptions);
        res.status(200).json({message: 'Email sent successfully'});
    } catch (err) {     
        res.status(500).json({message: 'Internal server error',err});
    }

   


}

module.exports = {sendEmail};