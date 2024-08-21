const express = require('express')
const { QueryTypes } = require('sequelize')
const sequelize = require('../database/database')

const login = express.Router()

module.exports = (io) => {
    login.get('/ntlm', async (req, res) => {
        /* 
            #swagger.tags = ['Login Services'] 
            #swagger.summary = '[MobileAdmin.SiteUsers && MobileAdmin.Users ] Find a user and return their information NTLM.'
        */

        const output = {}
        output.ntlm = req.ntlm;


        const SiteUsers = await sequelize.query(
            "SELECT TOP 1 * FROM [MIM_PROD].[MobileAdmin].[SiteUsers] WHERE (mysingle_id = :id OR nt_id = :id)", {
            replacements: { id: output.ntlm.UserName },
            type: QueryTypes.SELECT
        })

        output.site_users = SiteUsers[0]

        const RegisterUsers = await sequelize.query(
            "SELECT TOP 1 * FROM [MIM_PROD].[MobileAdmin].[Users] WHERE (ghrNumber = :id)", {
            replacements: { id: SiteUsers[0].GHR_ID },
            type: QueryTypes.SELECT
        })

        output.reg_users = RegisterUsers[0]

        /* Example Data = {
            "ntlm": {
                "DomainName": "company-AUSTIN",
                "UserName": "kfinkernagel3138",
                "Workstation": "IT-0655",
                "Authenticated": true
            },
            "site_users": {
                "GHR_ID": "21533138",
                "full_name": "Kyle Patrick Finkernagel",
                "mysingle_id": "k.finkernage",
                "nt_id": "kfinkernagel3138",
                "title": "Engineer II",
                "dept_name_short": "IT Strategy",
                "dept_name": "IT Strategy - Wireless Services"
            },
            "reg_users": {
                "ghrNumber": "21533138",
                "teamName": "IT Strategy",
                "appRole": "Admin"
            }
        }
        */

        res.send(output)
    })

    return login;
}