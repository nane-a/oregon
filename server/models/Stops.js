module.exports = (sequelize, Sequelize) => {
    const Stops = sequelize.define("stops", {
        city_or_zip: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        service_type: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        route_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
        }
    }, { freezeTableName: true, timestamps: false })


    return Stops
}
