module.exports = (sequelize, Sequelize) => {
    const Truck = sequelize.define("truck", {
        name_of_first_driver: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        name_of_second_driver: {
            type: Sequelize.STRING,
        },
        year: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        make: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        unit: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        vin: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        license_plate_number: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        license_plate_issue_state: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        apportioned_with_oregon: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        axels: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        registered_weight: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        purchased_by_company: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        your_commodity: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    }, { freezeTableName: true, timestamps: false })

    return Truck
}
