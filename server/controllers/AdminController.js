const bcrypt = require('bcrypt');
const { Admin, Contact, Taxes } = require('../models');
const jwt = require('jsonwebtoken');
const { Truck } = require('../models');
const { Route } = require('../models');
const { Stops } = require('../models');

class AdminController {
    loggedUser(req, res) {
        if (!req.user) {
            res.json({
                username: "nobody",
            });
        } else {
            res.json(req.user);
        }
    }

    login(req, res) {
        const token = jwt.sign({ id: req.user.id }, "jwt_secret");
        res.json({ token });
    }

    isLogged(jwt_payload, done) {
        Admin.findByPk(jwt_payload.id)
            .then((admin) => {
                return done(null, admin);
            })
            .catch((err) => {
                return done(err, false, {
                    message: "Token not matched.",
                });
            });
    }

    async isRegistered(email, password, done) {
        const admin = await Admin.findOne({
            where: { email },
        });
        if (!admin) {
            return done(null, false);
        } else if (await bcrypt.compare(password, admin.password)) {
            return done(null, admin);
        }
        return done(null, false, {
            message: "Incorrect Password"
        });
    }

    getDrivers = async (req, res) => {
        const { page, count } = req.body
        try {
            const pageCount = await Contact.count()
            const drivers = await Contact.findAll({
                offset: (page - 1) * count,
                limit: count
            })
            res.status(200).send({
                success: true,
                data: { data: drivers, pages: Math.ceil(pageCount / count) },
                message: `Your request was successfully completed`,
                error: null
            })
        } catch (error) {
            res.status(400).send({
                success: false,
                data: null,
                message: `Your request was failed`,
                error
            })
        }

    }

    getTaxes = async (req, res) => {
        const { page, count } = req.body
        try {
            const pageCount = await Taxes.count()
            const taxes = await Taxes.findAll({
                offset: (page - 1) * count,
                limit: count
            })
            res.status(200).send({
                success: true,
                data: { data: taxes, pages: Math.ceil(pageCount / count) },
                message: `Your request was successfully completed`,
                error: null
            })
        } catch (error) {
            res.status(400).send({
                success: false,
                data: null,
                message: `Your request was failed`,
                error
            })
        }
    }

    deleteDriver = async (req, res) => {
        const { id } = req.body
        try {
            await Contact.destroy({ where: { id } })
            res.status(200).send({
                success: true,
                data: null,
                message: `Your request was successfully completed`,
                error: null
            })
        } catch (error) {
            res.status(400).send({
                success: false,
                data: null,
                message: `Your request was failed`,
                error
            })
        }
    }

    aboutDriver = async (req, res) => {
        const { id } = req.body
        try {
            const driver = await Contact.findOne({
                where: { id },
                include: [
                    Truck,
                    {
                        model: Route,
                        include: Stops,
                    }
                ],
            })
            res.status(200).send({
                success: true,
                data: driver,
                message: `Your request was successfully completed`,
                error: null
            })
        } catch (error) {
            res.status(400).send({
                success: false,
                data: null,
                message: `Your request was failed`,
                error
            })
        }
    }

    logoutUser = async (req, res) => {
        try {
            req.logout()
            res.status(200).send({
                success: true,
                data: null,
                message: `Your request was successfully completed`,
                error: null
            })
        } catch (error) {
            res.status(400).send({
                success: false,
                data: null,
                message: `Your request was failed`,
                error
            })
        }
    }
}

module.exports = new AdminController


