module.exports = (sequelize, Sequelize) => {
    const Contact = sequelize.define("contact", {
        usdot: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        permit_starting_date: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        local_business_name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        email_adress: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        phone_number: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        draft: {
            type: Sequelize.BOOLEAN,
            defaultValue: true,
            allowNull: false
        }
    }, { freezeTableName: true, timestamps: false })

    return Contact
}
