const { Contact } = require('../models');
const stripe = require('stripe')('sk_test_51N6qlXB6vEmDvOeAb7bl3Pr8GQ5SRu0dczUug974dwx3YwmWDcwo3lahBkMwMpNvFmM4BWi88yxrOgMK4ySsjd9V00Symc3jfE');
const nodemailer = require('nodemailer');

class PermitController {
    sendPayment = async (req, res) => {
        const { token, amount, usdot_id } = req.body
        stripe.charges.create({
            amount,
            currency: 'usd',
            source: token,
            description: 'Oregon Truck Payment',
        }, async (err, charge) => {
            if (err) {
                res.status(400).send({
                    success: false,
                    data: null,
                    message: `Your payment was failed`,
                    error: err
                })
            } else {
                const user = await Contact.findOne({ where: { id: usdot_id } })
                let transporter = nodemailer.createTransport({
                    service: 'gmail',
                    host: process.env.MAIL_AUTHENTICATION_HOST,
                    port: process.env.MAIL_AUTHENTICATION_PORT,
                    secure: false,
                    auth: {
                        user: process.env.MAIL_AUTHENTICATION_USER,
                        pass: process.env.MAIL_AUTHENTICATION_PASSWORD
                    }
                });

                let mailOptions = {
                    from: process.env.MAIL_AUTHENTICATION_USER,
                    to: user.email_adress,
                    subject: 'Oregon Truck Payment',
                    text: 'Your Payment successfully completed!'
                };

                await Contact.update({ draft: 0 }, { where: { id: usdot_id } })

                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Email sent: ' + info.response);
                    }
                });

                res.status(200).send({
                    success: true,
                    data: charge,
                    message: `Your payment was successfully completed`,
                    error: null
                })
            }
        });
    }
}

module.exports = new PermitController