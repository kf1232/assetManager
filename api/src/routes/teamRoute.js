const express = require('express')
const { QueryTypes } = require('sequelize')
const sequelize = require('../database/database')
const { body, validationResult } = require('express-validator')
const { MobileAdmin_Users } = require('../database/model.Mobile.User')

const team = express.Router()

module.exports = (io) => {
    team.get('/r/:team', async (req, res) => {
        /* 
            #swagger.tags = ['Team Members'] 
            #swagger.summary = '[MobileAdmin.RegisteredUsers] Select all users that match the users current team.'
        */
        let { team } = req.params
    
        const output = {}
    
        const team_members = await sequelize.query(
            "SELECT * FROM [MIM_PROD].[MobileAdmin].[RegisteredUsers] WHERE teamName = :id", {
            replacements: { id: team },
            type: QueryTypes.SELECT
        })
    
        output.team_members = team_members
    
        /* Example Data
        output.team_members = [
            {
              "ghrNumber": "98565094",
              "full_name": "Michael E Martinez",
              "mysingle_id": "m1.martinez",
              "nt_id": "MMartinez",
              "appRole": "Manager",
              "teamName": "IT Strategy",
              "dept_name_short": "IT Strategy",
              "dept_name": "IT Strategy"
            },
            {
              "ghrNumber": "23501591",
              "full_name": "Daniel Choo",
              "mysingle_id": "s12.choo",
              "nt_id": "schoo1591",
              "appRole": "User",
              "teamName": "IT Strategy ",
              "dept_name_short": "IT Strategy",
              "dept_name": "IT Strategy - Application Solutions"
            }
        ]
        */
    
        res.send(output)
    })
    
    team.get('/u/:team', async (req, res) => {
        /* 
            #swagger.tags = ['Team Members'] 
            #swagger.summary = '[MobileAdmin.UnregisteredUsers] Select all users that match the users current team.'
        */
        let { team } = req.params
    
        const output = {}
    
        const team_members = await sequelize.query(
            "SELECT * FROM [MIM_PROD].[MobileAdmin].[UnregisteredUsers] WHERE dept_name_short = :id", {
            replacements: { id: team },
            type: QueryTypes.SELECT
        })
    
        output.team_members = team_members
    
        /* Example Data
        output.team_members = [
            {
                "GHR_ID": "08545435",
                "full_name": "Wesley H. Ruff",
                "mysingle_id": "w.ruff",
                "nt_id": "wruff",
                "title": "Staff Engineer I TR",
                "dept_name_short": "IT Strategy",
                "dept_name": "IT Strategy"
            },
            {
                "GHR_ID": "17513357",
                "full_name": "Jackie Storm",
                "mysingle_id": "j.storm",
                "nt_id": "jstorm",
                "title": "Staff Engineer I TR",
                "dept_name_short": "IT Strategy",
                "dept_name": "IT Strategy"
            }
        ] */
    
        res.send(output)
    })
    
    team.get('/leaders', async (req, res) => {
        /* 
            #swagger.tags = ['Team Members'] 
            #swagger.summary = '[MobileAdmin.RegisteredUsers] Return a list of Admin and Manager users for the service.'
        */
        let { team } = req.params
    
        const output = {}
    
        const team_members = await sequelize.query(
            "SELECT * FROM [MIM_PROD].[MobileAdmin].[RegisteredUsers] WHERE appRole IN ( 'Manager', 'Admin' )", {
            replacements: { id: team },
            type: QueryTypes.SELECT
        })
    
        output.team_members = team_members
    
        /* Example Data
        output.team_members = [
            {
            "ghrNumber": "97539054",
            "full_name": "Londell Ornick",
            "mysingle_id": "l.ornick",
            "nt_id": "LOrnick",
            "appRole": "Manager",
            "teamName": "Material",
            "dept_name_short": "AT",
            "dept_name": "AT Chemical & Water Analysis"
            },
            {
            "ghrNumber": "10566796",
            "full_name": "Todd Strohschein",
            "mysingle_id": "t.strohschei",
            "nt_id": "tstrohschein",
            "appRole": "Manager",
            "teamName": "Clean",
            "dept_name_short": "Clean",
            "dept_name": "Clean ECIP"
            }
        ] */
    
        res.send(output)
    })
    
    team.post('/upsert', [
        body('ghrNumber').not().isEmpty().withMessage('ghrNumber must be valid.')
    ], async (req, res, next) => {
        /* 
            #swagger.tags = ['Team']
            #swagger.summary = '[MobileAdmin.User] Create/Update a user into the system.'
            #swagger.parameters['limit'] = {
                in: 'body',
                description: 'Update/Register new user to service',
                schema: {
                    ghrNumber: 'string',
                    teamName: 'string',
                    appRole: 'string'
                }
            }
        */
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    
        console.log({data: req.body})


        try {
            const [instance, wasCreated] = await MobileAdmin_Users.upsert(req.body, { returning: true });

            io.emit('user_update', instance);
    
            res.send({
                message: wasCreated ? 'User created successfully.' : 'User updated successfully.',
                user: instance
            });

        } catch (error) {
            console.log(error);
        }
    })

    return team;
};