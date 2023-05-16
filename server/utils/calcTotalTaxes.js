const { Taxes } = require("../models")

const calcTotalTaxes = async (weight, axles, distance, apportioned_with_oregon) => {
    const fieldName = `for_${axles}_axles`;

    const taxPriceForMile = await Taxes.findOne({ where: { weight }, attributes: [fieldName] })

    return (+taxPriceForMile.dataValues[fieldName] * distance + (apportioned_with_oregon === 'no' ? 50 : 0)).toFixed(2)
}

module.exports = calcTotalTaxes