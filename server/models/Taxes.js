module.exports = (sequelize, Sequelize) => {
    const Taxes = sequelize.define("taxes", {
        weight: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        for_five_axles: {
            type: Sequelize.DECIMAL(10, 5),
            allowNull: false,
        },
        for_six_axles: {
            type: Sequelize.DECIMAL(10, 5),
            allowNull: false,
        },
        for_seven_axles: {
            type: Sequelize.DECIMAL(10, 5),
            allowNull: false,
        },
        for_eight_axles: {
            type: Sequelize.DECIMAL(10, 5),
            allowNull: false,
        },
        for_nine_or_more_axles: {
            type: Sequelize.DECIMAL(10, 5),
            allowNull: false,
        },
    }, { freezeTableName: true, timestamps: false })

    return Taxes
}
