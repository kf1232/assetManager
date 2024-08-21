const Sequelize = require('sequelize')
const sequelize = require('./database')

const MobileAdmin_Users = sequelize.define('users', {
    ghrNumber: {
        type: Sequelize.STRING(50),
        primaryKey: true,
    },
    teamName: {
        type: Sequelize.STRING(255),
        defaultValue: Sequelize.NOW
    },
    appRole: {
        type: Sequelize.STRING(255)
    },
}, {
    timestamps: false,
    tableName: 'users',
    schema: 'MobileAdmin'
})

module.exports = { MobileAdmin_Users }