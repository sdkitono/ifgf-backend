import fs from 'fs';
import mailcomposer from 'mailcomposer';
import path from 'path';

const apiKey = 'key-74d442167dbfce45c0e861b4031aa958';
const domain = 'finliv.com';
const mailgun = require('mailgun-js')({ apiKey, domain });

const htmlTemplateString = fs.readFileSync(path.resolve(__dirname, 'action.html'), 'UTF-8');

/*
const data = {
  from: 'Excited User <me@samples.mailgun.org>',
  to: 'serobnic@mail.ru',
  subject: 'Hello',
  text: 'Testing some Mailgun awesomness!'
};
*/

class MailgunHelper {
  static sendMailWithToken(token, toEmail, callback) {
    const mail = mailcomposer({
      from: 'no-reply@finliv.com',
      to: toEmail,
      subject: 'Confirm Email',
      html: htmlTemplateString.replace(/replaceme.com/g, `${process.env.FRONTEND_SERVER}/confirmEmail/${token}`)
    });

    mail.build((mailBuildError, message) => {
      if (mailBuildError) {
        console.log(mailBuildError);
      } else {
        const dataToSend = {
          to: toEmail,
          message: message.toString('ascii')
        };
        mailgun.messages().sendMime(dataToSend, (sendError, body) => {
          if (sendError) {
            console.log(sendError);
          }
        });
      }
    });
  }
}

export default MailgunHelper;
