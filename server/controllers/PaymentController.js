const { Contact } = require('../models');
const stripe = require('stripe')('sk_test_51N6qlXB6vEmDvOeAb7bl3Pr8GQ5SRu0dczUug974dwx3YwmWDcwo3lahBkMwMpNvFmM4BWi88yxrOgMK4ySsjd9V00Symc3jfE');
const nodemailer = require('nodemailer');

class PermitController {
    showList = async (req, res) => {
        const { count, last_id } = req.body
        let obj = { limit: count }
        if (last_id) {
            obj.starting_after = last_id
        }
        await stripe.charges.list(obj, (err, payments) => {
            if (err) {
                console.error(err);
            } else {
                payments.data = payments.data.map(payment => {
                    if (payment.description.split("")[0] === "{") {
                        let json = JSON.parse(payment.description)
                        let amount = payment.amount
                        if (amount && json.email && json.name && json.usdot)
                            return {
                                amount,
                                email: json.email,
                                name: json.name,
                                usdot: json.usdot,
                                id: payment.id
                            }
                    }
                    return 5
                }).filter(elm => elm !== 5)
                res.status(200).send({
                    success: true,
                    data: payments.data,
                    message: `Your payment was successfully completed`,
                    error: null
                })
            }
        });
    }

    sendPayment = async (req, res) => {
        const { token, amount, usdot_id, email, usdot } = req.body
        const customer = await stripe.customers.create({
            email,
            name: usdot,
            description: 'New customer'
        })
        await stripe.customers.createSource(
            customer.id,
            { source: token },
            async (err, source) => {
                if (err) {
                    console.error(err);
                } else {
                    await stripe.charges.create({
                        amount,
                        currency: 'usd',
                        source: source.id,
                        customer: customer.id,
                        description: JSON.stringify({
                            info: 'Oregon truck payment',
                            email: customer.email,
                            name: customer.name,
                            usdot: usdot_id
                        }),
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
        );
    }
}

module.exports = new PermitController