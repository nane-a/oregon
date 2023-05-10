const { Taxes } = require("../models")

const calcTotalTaxes = async (weight, axles, distance) => {
    const fieldName = `for_${axles}_axles`;

    const taxPriceForMile = await Taxes.findOne({ where: { weight }, attributes: [fieldName] })

    return (+taxPriceForMile.dataValues[fieldName] * distance).toFixed(2)
}

module.exports = calcTotalTaxes