const { Contact, Truck, Route, Stops, Taxes } = require('../models');
const calcTotalTaxes = require('../utils/calcTotalTaxes');
const axelsNameFormator = require('../formators/axelsNameFormator');
const formValidation = require('../utils/formValidation');
const getStartBorderPoints = require('../utils/getStartBorderPoints');
const getExitBorderPoints = require('../utils/getExitBorderPoints');
const getDistance = require('../utils/getDistance');
const getUsStates = require('../utils/getUsStates');
const getCanadaProvinces = require('../utils/getCanadaProvinces');

class PermitController {
    contacts = async (req, res) => {
        const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/;
        const { usdot, permit_starting_date, local_business_name, email_adress, phone_number } = req.body
        let errorMessage = formValidation(req.body)

        if (!errorMessage.phone_number && !phoneRegex.test(phone_number)) {
            errorMessage.phone_number = "Invalid phone number"
        }

        try {
            if (!Object.keys(errorMessage).length) {
                let data
                await Contact.findOne({ where: { usdot, draft: true } })
                    .then(async (result) => {
                        if (result) {
                            data = result
                            await Contact.update(req.body, { where: { id: result.id } })
                        } else {
                            data = await Contact.create(req.body)
                        }
                    })

                res.status(200).send({
                    success: true,
                    data: { usdot_id: data.id, usdot, permit_starting_date, local_business_name, email_adress, phone_number },
                    message: 'You have successfully completed the Contact form',
                    error: null
                })
            } else {
                let err = new Error('');
                err = errorMessage;
                throw err;
            }
        } catch (error) {
            res.status(422).send({
                success: false,
                data: null,
                message: 'You failed form validation',
                error
            })
        }
    };

    truckData = async (req, res) => {
        const { name_of_first_driver, name_of_second_driver, usdot_id, vin } = req.body
        const nameRegex = /^[A-Za-z]+(?:\s+[A-Za-z]+)*$/
        let errorMessage = formValidation(req.body, ["name_of_second_driver"])

        if (!errorMessage.name_of_first_driver && !nameRegex.test(name_of_first_driver)) {
            errorMessage.name_of_first_driver = 'Invalid name field'
        } else if (name_of_second_driver && !errorMessage.name_of_second_driver && !nameRegex.test(name_of_second_driver)) {
            errorMessage.name_of_second_driver = 'Invalid name field'
        } else if (!errorMessage.vin && vin.length !== 16) {
            errorMessage.vin = 'Invalid Vin code'
        }
        try {
            if (!Object.keys(errorMessage).length) {
                let data
                await Truck.findOne({ where: { usdot_id } })
                    .then(async (result) => {
                        if (result) {
                            data = result
                            await Truck.update(req.body, { where: { id: result.id } })
                        } else {
                            data = await Truck.create(req.body)
                        }
                    })

                res.status(200).send({
                    success: true,
                    data,
                    message: `You have successfully completed the Truck form`,
                    error: null
                })
            } else {
                let err = new Error('');
                err = errorMessage;
                throw err;
            }
        } catch (error) {
            res.status(422).send({
                success: false,
                data: null,
                message: 'You failed form validation',
                error
            })
        }
    }

    routeData = async (req, res) => {
        const { stops, usdot_id, route_type, trip_type, entrance_point, exit_point } = req.body

        let route;
        let errorMessage = formValidation(req.body, ["stops", "exit_point"])

        if (!exit_point && stops.length === 0) {
            errorMessage.stop_or_exit_point = "Stop or exit point is required"
        }

        try {
            if (!Object.keys(errorMessage).length) {
                await Route.findOne({ where: { usdot_id } })
                    .then(async (result) => {
                        if (result) {
                            route = result

                            await Route.update({
                                usdot_id,
                                route_type,
                                trip_type,
                                entrance_point,
                                exit_point
                            }, { where: { id: result.id } })

                            Stops.destroy({
                                where: {
                                    route_id: result.id
                                }
                            })

                        } else {
                            route = await Route.create({
                                usdot_id,
                                route_type,
                                trip_type,
                                entrance_point,
                                exit_point
                            })
                        }

                        for (let i = 0; i < stops.length; i++) {
                            await Stops.create({ route_id: route.id, city_or_zip: stops[i].city_or_zip, service_type: stops[i].service_type })
                        }
                    })

                res.status(200).send({
                    success: true,
                    data: route,
                    message: `You have successfully completed the Route form`,
                    error: null
                })
            } else {
                let err = new Error('');
                err = errorMessage;
                throw err;
            }
        } catch (error) {
            res.status(422).send({
                success: false,
                data: null,
                message: 'You failed form validation',
                error
            })
        }
    }

    getExitPoints = async (req, res) => {
        const exitPoints = getExitBorderPoints()
        res.status(200).send({ exitPoints })
    }

    getStartPoints = async (req, res) => {
        const startPoints = getStartBorderPoints()
        res.status(200).send({ startPoints })
    }

    getWeights = async (req, res) => {
        const weights = await Taxes.findAll({ attributes: ['weight'] })
        res.status(200).send({
            success: true,
            data: weights,
            message: `Your request was successfully completed`,
            error: null
        })
    }

    getUsStates = async (req, res) => {
        const usStates = getUsStates()
        res.status(200).send({
            success: true,
            data: usStates,
            message: `Your request was successfully completed`,
            error: null
        })
    }

    getCanadaStates = async (req, res) => {
        const canadaProvinces = getCanadaProvinces()
        res.status(200).send({
            success: true,
            data: canadaProvinces,
            message: `Your request was successfully completed`,
            error: null
        })
    }

    getTotalPriceAndDistance = async (req, res) => {
        const { usdot } = req.body
        try {
            const data = await Contact.findOne({ where: { id: usdot }, include: [{ model: Truck, attributes: ['registered_weight', "axels", "apportioned_with_oregon"] }, { model: Route, include: { model: Stops } }] })
            const { registered_weight, axels, apportioned_with_oregon } = data.truck
            let { entrance_point, exit_point, stops, trip_type } = data.route
            stops.sort((a, b) => a.id - b.id)
            const axelsName = await axelsNameFormator(axels)

            let originLatArr = [entrance_point.split(", ")[0]]
            let originLngArr = [entrance_point.split(", ")[1]]

            let destLatArr = []
            let destLngArr = []

            for (let i = 0; i < stops.length; i++) {
                originLatArr.push(stops[i].city_or_zip.split(", ")[0])
                originLngArr.push(stops[i].city_or_zip.split(", ")[1])
                destLatArr.push(stops[i].city_or_zip.split(", ")[0])
                destLngArr.push(stops[i].city_or_zip.split(", ")[1])
            }

            if (exit_point) {
                destLatArr.push(exit_point.split(", ")[0])
                destLngArr.push(exit_point.split(", ")[1])
            }

            const apiKey = process.env.API_KEY;

            let distance = await getDistance(originLatArr, originLngArr, destLatArr, destLngArr, apiKey)

            let price = await calcTotalTaxes(registered_weight, axelsName, distance, apportioned_with_oregon)

            distance *= trip_type === 'round trip' ? 2 : 1
            price = (trip_type === 'round trip' ? 2 : 1) * (+price)

            res.status(200).send({
                success: true,
                data: { price, distance },
                message: `Your request was successfully completed`,
                error: null
            })
        }
        catch (error) {
            res.status(400).send({
                success: false,
                data: null,
                message: `Your request was failed`,
                error
            })
        }
    }
}

module.exports = new PermitController