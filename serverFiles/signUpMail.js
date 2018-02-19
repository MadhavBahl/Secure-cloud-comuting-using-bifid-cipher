var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'teambifid@gmail.com',
    pass: 'bifid@123'
  }
});

var signUpMail = (userInfo,callback) => {
  // console.log(userInfo);
  var send = `Hi ${userInfo.name}, \n
You have signed up for the Bifid-Crypt.
Congratulations!! You are a now an official part of our secure file safety system,
Your Password is : "${userInfo.pass}". 
Your Secret Key is : "${userInfo.key}". 
Please keep it safe and secret :) \n
REGARDS,
Team Bifid-Crypt`;

  var mailOptions = {
    from: 'Bifid-Crypt',
    to: userInfo.email,
    subject: 'Congrats! You are a part of our Secured Cloud Storage System',
    text: send
  };

  transporter.sendMail(mailOptions,(err,info) => {
    if(err){
      return callback(err);
    } else {
      return callback(undefined, info.response);
    }
  });
}

module.exports = {signUpMail}
