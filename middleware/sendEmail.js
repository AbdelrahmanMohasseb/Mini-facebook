const nodemailer = require("nodemailer");


const sendEmail=async function(destination,message){
 // let testAccount=nodemailer.createTestAccount();
 const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    secure: false,
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user:"abdelrahmanmohasseb2712000@gmail.com",
      pass:"wecahvordtalwleb" 
    }
  });
  
  // async..await is not allowed in global scope, must use a wrapper
  
    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: '"Fred Foo 👻" <abdelrahmanmohasseb2712000@gmail.com>', // sender address
      to: "abdelrahmanmohasseb2712000@gmail.com", // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      html: message, // html body
    });
    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  
    //
    // NOTE: You can go to https://forwardemail.net/my-account/emails to see your email delivery status and preview
    //       Or you can use the "preview-email" npm package to preview emails locally in browsers and iOS Simulator
    //       <https://github.com/forwardemail/preview-email>
    //

}


module.exports={sendEmail}