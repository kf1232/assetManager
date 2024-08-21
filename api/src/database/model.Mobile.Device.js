const Sequelize = require('sequelize')
const sequelize = require('./database')

const MobileAdmin_Device = sequelize.define('devices', {
    serialNumber: {
        type: Sequelize.STRING(50),
        primaryKey: true,
    },
    ownerTeam: {
        type: Sequelize.STRING(120),
        defaultValue: 'Unknown'
    },
    registerDate: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },
    gsWave: {
        type: Sequelize.STRING(120),
        defaltValue: null
    },
    assignedUser: {
        type: Sequelize.STRING(120),
        defaultValue: null
    },
    ashift: {
        type: Sequelize.STRING(120),
        defaultValue: null
    },
    bshift: {
        type: Sequelize.STRING(120),
        defaultValue: null
    },
    cshift: {
        type: Sequelize.STRING(120),
        defaultValue: null
    },
    dshift: {
        type: Sequelize.STRING(120),
        defaultValue: null
    },
    deviceNotes: {
        type: Sequelize.STRING(120),
        defaultValue: null
    },
}, {
    timestamps: false,
    tableName: 'devices',
    schema: 'MobileAdmin'
})

module.exports = { MobileAdmin_Device }