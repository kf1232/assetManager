const express = require('express')
const { QueryTypes } = require('sequelize')
const sequelize = require('../database/database')

const user = express.Router()

module.exports = (io) => {
    user.get('/', (req,res) => {
        /* #swagger.tags = ['User']
           #swagger.summary = '[n/a] default route'
        */
        res.send('default route: user')
    })

    return user;
}