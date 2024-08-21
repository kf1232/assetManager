require('dotenv').config()
const Sequelize = require('sequelize')

const Mobile_Database = new Sequelize(
    process.env.MOBILE_NAME,
    process.env.MOBILE_USER,
    process.env.MOBILE_PASSWORD,
    {
        host: process.env.MOBILE_HOST,
        dialect: 'mssql',
        dialectModule: require('tedious'),
        logging: false
    }
)

// Test the connection
Mobile_Database
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch((error) => {
        console.error('Unable to connect to the database:', error);
        console.log({
            host: process.env.MOBILE_HOST,
            user: process.env.MOBILE_USER,
            data: process.env.MOBILE_NAME
        })
    });

module.exports = Mobile_Database