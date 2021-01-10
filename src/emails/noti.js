const nodemailer = require('nodemailer');

var mail = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.MAIL,
        pass: process.env.PASS
    }
});

const notify = async (subject, cont) => {
    var mailOptions = {
        from: process.env.MAIL,
        to: process.env.TO,
        subject: subject,
        text: cont
    };

    mail.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

module.exports = notify;