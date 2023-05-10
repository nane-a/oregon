const { Sequelize } = require('sequelize')
const { HOST, USER, PASSWORD, DB, DIALECT } = require('../config/db-config')

const sequelize = new Sequelize(DB, USER, PASSWORD, {
    host: HOST,
    dialect: DIALECT
});

const Contact = require("./Contact")(sequelize, Sequelize)
const Truck = require("./Truck")(sequelize, Sequelize)
const Route = require("./Route")(sequelize, Sequelize)
const Stops = require("./Stops")(sequelize, Sequelize)
const Taxes = require("./Taxes")(sequelize, Sequelize)

Contact.hasOne(Truck, {
    foreignKey: 'usdot_id',
})
Truck.belongsTo(Contact, {
    foreignKey: 'usdot_id'
});

Contact.hasOne(Route, {
    foreignKey: 'usdot_id',
})
Route.belongsTo(Contact, {
    foreignKey: 'usdot_id'
});

Route.hasMany(Stops, {
    foreignKey: 'route_id',
})
Stops.belongsTo(Route, {
    foreignKey: 'route_id'
});

sequelize.sync({});

module.exports = {
    Contact,
    Truck,
    Route,
    Stops,
    Taxes
}