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
                            await Contact.update(req.body, { where: { id: result.id } });
                            const updatedData = await Contact.findByPk(result.id);
                            data = updatedData;
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
        } else if (!errorMessage.vin && vin.length !== 17) {
            errorMessage.vin = 'Invalid Vin code'
        }
        try {
            if (!Object.keys(errorMessage).length) {
                let data
                await Truck.findOne({ where: { usdot_id } })
                    .then(async (result) => {
                        if (result) {
                            await Truck.update(req.body, { where: { id: result.id } });
                            const updatedData = await Truck.findByPk(result.id);
                            data = updatedData;
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
                            await Route.update({
                                usdot_id,
                                route_type,
                                trip_type,
                                entrance_point,
                                exit_point
                            }, { where: { id: result.id } })
                            const updatedData = await Route.findByPk(result.id);
                            route = updatedData;
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
        const taxData = [
            {
                weight: "26,001 - 28,000",
                for_five_axles: 0.07200,
                for_six_axles: 0.07200,
                for_seven_axles: 0.07200,
                for_eight_axles: 0.07200,
                for_nine_or_more_axles: 0.07200
            },
            {
                weight: "28,001 - 30,000",
                for_five_axles: 0.07640,
                for_six_axles: 0.07640,
                for_seven_axles: 0.07640,
                for_eight_axles: 0.07640,
                for_nine_or_more_axles: 0.07640
            },
            {
                weight: "30,001 - 32,000",
                for_five_axles: 0.07980,
                for_six_axles: 0.07980,
                for_seven_axles: 0.07980,
                for_eight_axles: 0.07980,
                for_nine_or_more_axles: 0.07980
            },
            {
                weight: "32,001 - 34,000",
                for_five_axles: 0.08340,
                for_six_axles: 0.08340,
                for_seven_axles: 0.08340,
                for_eight_axles: 0.08340,
                for_nine_or_more_axles: 0.08340
            },
            {
                weight: "34,001 - 36,000",
                for_five_axles: 0.08660,
                for_six_axles: 0.08660,
                for_seven_axles: 0.08660,
                for_eight_axles: 0.08660,
                for_nine_or_more_axles: 0.08660
            },
            {
                weight: "36,001 - 38,000",
                for_five_axles: 0.09110,
                for_six_axles: 0.09110,
                for_seven_axles: 0.09110,
                for_eight_axles: 0.09110,
                for_nine_or_more_axles: 0.09110
            },
            {
                weight: "38,001 - 40,000",
                for_five_axles: 0.09450,
                for_six_axles: 0.09450,
                for_seven_axles: 0.09450,
                for_eight_axles: 0.09450,
                for_nine_or_more_axles: 0.09450
            },
            {
                weight: "40,001 - 42,000",
                for_five_axles: 0.09800,
                for_six_axles: 0.09800,
                for_seven_axles: 0.09800,
                for_eight_axles: 0.09800,
                for_nine_or_more_axles: 0.09800
            },
            {
                weight: "42,001 - 44,000",
                for_five_axles: 0.10160,
                for_six_axles: 0.10160,
                for_seven_axles: 0.10160,
                for_eight_axles: 0.10160,
                for_nine_or_more_axles: 0.10160
            },
            {
                weight: "44,001 - 46,000",
                for_five_axles: 0.10500,
                for_six_axles: 0.10500,
                for_seven_axles: 0.10500,
                for_eight_axles: 0.10500,
                for_nine_or_more_axles: 0.10500
            },
            {
                weight: "46,001 - 48,000",
                for_five_axles: 0.10840,
                for_six_axles: 0.10840,
                for_seven_axles: 0.10840,
                for_eight_axles: 0.10840,
                for_nine_or_more_axles: 0.10840
            },
            {
                weight: "48,001 - 50,000",
                for_five_axles: 0.11200,
                for_six_axles: 0.11200,
                for_seven_axles: 0.11200,
                for_eight_axles: 0.11200,
                for_nine_or_more_axles: 0.11200
            },
            {
                weight: "50,001 - 52,000",
                for_five_axles: 0.11610,
                for_six_axles: 0.11610,
                for_seven_axles: 0.11610,
                for_eight_axles: 0.11610,
                for_nine_or_more_axles: 0.11610
            },
            {
                weight: "52,001 - 54,000",
                for_five_axles: 0.12050,
                for_six_axles: 0.12050,
                for_seven_axles: 0.12050,
                for_eight_axles: 0.12050,
                for_nine_or_more_axles: 0.12050
            },
            {
                weight: "54,001 - 56,000",
                for_five_axles: 0.12500,
                for_six_axles: 0.12500,
                for_seven_axles: 0.12500,
                for_eight_axles: 0.12500,
                for_nine_or_more_axles: 0.12500
            },
            {
                weight: "56,001 - 58,000",
                for_five_axles: 0.13020,
                for_six_axles: 0.13020,
                for_seven_axles: 0.13020,
                for_eight_axles: 0.13020,
                for_nine_or_more_axles: 0.13020
            },
            {
                weight: "58,001 - 60,000",
                for_five_axles: 0.13610,
                for_six_axles: 0.13610,
                for_seven_axles: 0.13610,
                for_eight_axles: 0.13610,
                for_nine_or_more_axles: 0.13610
            },
            {
                weight: "60,001 - 62,000",
                for_five_axles: 0.14320,
                for_six_axles: 0.14320,
                for_seven_axles: 0.14320,
                for_eight_axles: 0.14320,
                for_nine_or_more_axles: 0.14320
            },
            {
                weight: "62,001 - 64,000",
                for_five_axles: 0.15110,
                for_six_axles: 0.15110,
                for_seven_axles: 0.15110,
                for_eight_axles: 0.15110,
                for_nine_or_more_axles: 0.15110
            },
            {
                weight: "64,001 - 66,000",
                for_five_axles: 0.15970,
                for_six_axles: 0.15970,
                for_seven_axles: 0.15970,
                for_eight_axles: 0.15970,
                for_nine_or_more_axles: 0.15970
            },
            {
                weight: "66,001 - 68,000",
                for_five_axles: 0.17110,
                for_six_axles: 0.17110,
                for_seven_axles: 0.17110,
                for_eight_axles: 0.17110,
                for_nine_or_more_axles: 0.17110
            },
            {
                weight: "68,001 - 70,000",
                for_five_axles: 0.18310,
                for_six_axles: 0.18310,
                for_seven_axles: 0.18310,
                for_eight_axles: 0.18310,
                for_nine_or_more_axles: 0.18310
            },
            {
                weight: "70,001 - 72,000",
                for_five_axles: 0.19520,
                for_six_axles: 0.19520,
                for_seven_axles: 0.19520,
                for_eight_axles: 0.19520,
                for_nine_or_more_axles: 0.19520
            },
            {
                weight: "72,001 - 74,000",
                for_five_axles: 0.20640,
                for_six_axles: 0.20640,
                for_seven_axles: 0.20640,
                for_eight_axles: 0.20640,
                for_nine_or_more_axles: 0.20640
            },
            {
                weight: "74,001 - 76,000",
                for_five_axles: 0.21700,
                for_six_axles: 0.21700,
                for_seven_axles: 0.21700,
                for_eight_axles: 0.21700,
                for_nine_or_more_axles: 0.21700
            },
            {
                weight: "76,001 - 78,000",
                for_five_axles: 0.22740,
                for_six_axles: 0.22740,
                for_seven_axles: 0.22740,
                for_eight_axles: 0.22740,
                for_nine_or_more_axles: 0.22740
            },
            {
                weight: "78,001 - 80,000",
                for_five_axles: 0.23700,
                for_six_axles: 0.23700,
                for_seven_axles: 0.23700,
                for_eight_axles: 0.23700,
                for_nine_or_more_axles: 0.23700
            },
            {
                weight: "80,001 - 82,000",
                for_five_axles: 0.24470,
                for_six_axles: 0.22380,
                for_seven_axles: 0.20920,
                for_eight_axles: 0.19880,
                for_nine_or_more_axles: 0.18750
            },
            {
                weight: "82,001 - 84,000",
                for_five_axles: 0.25260,
                for_six_axles: 0.22740,
                for_seven_axles: 0.21270,
                for_eight_axles: 0.20130,
                for_nine_or_more_axles: 0.19000
            },
            {
                weight: "84,001 - 86,000",
                for_five_axles: 0.26020,
                for_six_axles: 0.23270,
                for_seven_axles: 0.21610,
                for_eight_axles: 0.20380,
                for_nine_or_more_axles: 0.19270
            },
            {
                weight: "86,001 - 88,000",
                for_five_axles: 0.26900,
                for_six_axles: 0.23770,
                for_seven_axles: 0.21950,
                for_eight_axles: 0.20740,
                for_nine_or_more_axles: 0.19520
            },
            {
                weight: "88,001 - 90,000",
                for_five_axles: 0.27950,
                for_six_axles: 0.24380,
                for_seven_axles: 0.22310,
                for_eight_axles: 0.21090,
                for_nine_or_more_axles: 0.19880
            },
            {
                weight: "90,001 - 92,000",
                for_five_axles: 0.29150,
                for_six_axles: 0.25080,
                for_seven_axles: 0.22640,
                for_eight_axles: 0.21430,
                for_nine_or_more_axles: 0.20220
            },
            {
                weight: "92,001 - 94,000",
                for_five_axles: 0.30470,
                for_six_axles: 0.25770,
                for_seven_axles: 0.23000,
                for_eight_axles: 0.21770,
                for_nine_or_more_axles: 0.20490
            },
            {
                weight: "94,001 - 96,000",
                for_five_axles: 0.31860,
                for_six_axles: 0.26560,
                for_seven_axles: 0.23430,
                for_eight_axles: 0.22130,
                for_nine_or_more_axles: 0.20820
            },
            {
                weight: "96,001 - 98,000",
                for_five_axles: 0.33330,
                for_six_axles: 0.27520,
                for_seven_axles: 0.23950,
                for_eight_axles: 0.22490,
                for_nine_or_more_axles: 0.21180
            },
            {
                weight: "98,001 - 100,000",
                for_five_axles: 0.00000,
                for_six_axles: 0.28540,
                for_seven_axles: 0.24470,
                for_eight_axles: 0.22910,
                for_nine_or_more_axles: 0.21520
            },
            {
                weight: "100,001 - 102,000",
                for_five_axles: 0.00000,
                for_six_axles: 0.00000,
                for_seven_axles: 0.24990,
                for_eight_axles: 0.23430,
                for_nine_or_more_axles: 0.21880
            },
            {
                weight: "102,001 - 104,000",
                for_five_axles: 0.00000,
                for_six_axles: 0.00000,
                for_seven_axles: 0.25520,
                for_eight_axles: 0.23950,
                for_nine_or_more_axles: 0.22310
            },
            {
                weight: "104,001 - 105,500",
                for_five_axles: 0.00000,
                for_six_axles: 0.00000,
                for_seven_axles: 0.26200,
                for_eight_axles: 0.24470,
                for_nine_or_more_axles: 0.22740
            }
        ];
        await Taxes.bulkCreate(taxData)
        const exitPoints = getExitBorderPoints()
        res.status(200).send({ exitPoints })
    }

    getStartPoints = async (req, res) => {
        const startPoints = getStartBorderPoints()
        res.status(200).send({ startPoints })
    }

    getWeights = async (req, res) => {
        const weights = await Taxes.findAll()
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
            const data = await Contact.findOne({ where: { id: usdot, draft: true }, include: [{ model: Truck, attributes: ['registered_weight', "axels", "apportioned_with_oregon"] }, { model: Route, include: { model: Stops } }] })
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