const nodemailer= require('nodemailer');
const SendEmailUtility=async (EmailTo,EmailText,EmailSubject)=>{
    // Gmail SMTP configuration
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'zxstudio.official@gmail.com',
                pass: 'ewbgbgliuvdwglsl',
            },
        });

    let mailOption={
        from:'Task Manager MERN3<zxstudio.official@gmail.com>',
        to:EmailTo,
        subject:EmailSubject,
        text:EmailText
    }
    return  await transporter.sendMail(mailOption);
}

module.exports=SendEmailUtility;
