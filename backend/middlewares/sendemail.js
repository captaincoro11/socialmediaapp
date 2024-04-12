const nodemailer = require('nodemailer');
exports.sendemail = async(options)=>{
    var transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "4d6c81c065633c",
          pass: "********585f"
        }
      });
    const mailoptions = {
        from :"sandbox.smtp.mailtrap.io" ,
        to : options.email,
        subject: options.subject,
        text:options.message,
    }
    await transport.sendMail(mailoptions);
}