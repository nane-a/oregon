module.exports = (sequelize, Sequelize) => {
    const Chat = sequelize.define("chat", {
        from: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        to: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        text: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        time: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        new_messages: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
        }
    }, { freezeTableName: true, timestamps: false })

    return Chat
}
