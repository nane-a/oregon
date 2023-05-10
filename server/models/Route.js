module.exports = (sequelize, Sequelize) => {
    const Route = sequelize.define("route", {
        route_type: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        trip_type: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        entrance_point: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        exit_point: {
            type: Sequelize.STRING,
            allowNull: true,
        },

    }, { freezeTableName: true, timestamps: false })

    return Route
}
