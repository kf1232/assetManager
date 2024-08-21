const Sequelize = require('sequelize')
const sequelize = require('./database')

const MobileAdmin_Log = sequelize.define('Log', {
    LogId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Timestamp: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },
    ApiEndpoint: {
        type: Sequelize.STRING(255)
    },
    UserField: {
        type: Sequelize.STRING(255),
        allowNull: true
    }
}, {
    timestamps: false,
    tableName: 'Log',
    schema: 'MobileAdmin'
})

module.exports = { MobileAdmin_Log }