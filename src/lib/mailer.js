const nodemailer = require('nodemailer');

module.exports = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "d7b6b5abcf41d2",
        pass: "1536905b159681"
    }
});