const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: "ebnrshd521@gmail.com",
        subject: "Welcome to the task-manager",
        text: `welcome ${name}. we hope you enjoy using the task-manager app.`
    });
}

const sendGoodbyeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: "ebnrshd521@gmail.com",
        subject: "Farewell",
        text: `GoodBye ${name}`
    });
}

module.exports = {
    sendWelcomEmail,
    sendGoodbyeEmail
}