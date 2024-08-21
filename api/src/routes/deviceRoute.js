const express = require('express')
const { QueryTypes } = require('sequelize')
const sequelize = require('../database/database')
const { body, validationResult } = require('express-validator')
const { MobileAdmin_Device } = require('../database/model.Mobile.Device')

const device = express.Router()

module.exports = (io) => {
    device.get('/team/r/:teamName', async (req, res) => {
        /* 
            #swagger.tags = ['Device'] 
            #swagger.summary = '[MobileAdmin.RegisteredDevices] Select all devices where the ownerTeam matches teamName variable'
        */
    
        let { teamName } = req.params
    
        const output = {}
    
        const team_devices = await sequelize.query(
            "SELECT * FROM [MIM_Prod].[MobileAdmin].[RegisteredDevices] WHERE ownerTeam = :id", {
            replacements: { id: teamName },
            type: QueryTypes.SELECT
        })
    
        output.team_devices = team_devices
    
        /* Example Data
        output.team_devices = [
            {
              "serialNumber": "R3CW50NK9PV",
              "ownerTeam": "IT Strategy",
              "registerDate": "2024-03-28",
              "gsWave": "M-00004 2024-05-09",
              "assignedUser": "",
              "checkUser": null,
              "checkTimestamp": null,
              "ashift": null,
              "bshift": null,
              "cshift": null,
              "dshift": null,
              "deviceNotes": null,
              "ModelId": "SM-S918U1",
              "ModelName": "S23 Ultra 5G",
              "AndroidVer": "13",
              "MacAddress": "6CACC226FCDD",
              "IMEI": "350105093895251",
              "ICCId": "89012803330882997454",
              "PhoneNum": "15512599004",
              "McuvicId": "S23Ultra_FCDD",
              "EMMId": "S23Ultra_K9PV",
              "EMMGroup": "SAS Admin",
              "VPNId": "S23Ultra_9004",
              "LastUserGhrId": "24512901",
              "mysingle_id": "b.hablinski",
              "nt_id": "bhablinski2901",
              "full_name": "Brandon Wayne Hablinski",
              "dept_name_short": "CM",
              "LastUserDeptName": "CM Engineering",
              "LastUserTimestamp": "2024-07-08T17:29:10.687Z",
              "LastAPTimestamp": "2024-07-08T17:45:00.000Z",
              "LastAp": "T1M:2M:IDF"
            },
            {
              "serialNumber": "R58NB2Q2Y2J",
              "ownerTeam": "IT Strategy",
              "registerDate": "2024-06-20",
              "gsWave": "AMHSx5200 2024-07-03",
              "assignedUser": "Storage Locker",
              "checkUser": null,
              "checkTimestamp": null,
              "ashift": null,
              "bshift": null,
              "cshift": null,
              "dshift": null,
              "deviceNotes": null,
              "ModelId": "SM-G715U1",
              "ModelName": "XCover Pro",
              "AndroidVer": "10",
              "MacAddress": "C03D036AF579",
              "IMEI": "352744110809024",
              "ICCId": null,
              "PhoneNum": null,
              "McuvicId": "XCoverPro_F579",
              "EMMId": "XCoverPro_2Y2J",
              "EMMGroup": "SAS WiFi",
              "VPNId": null,
              "LastUserGhrId": "06735360",
              "mysingle_id": "m.dickey",
              "nt_id": "mdickey",
              "full_name": "Malcom Ray Dickey",
              "dept_name_short": "CVD",
              "LastUserDeptName": "CVD Ops",
              "LastUserTimestamp": "2021-12-01T14:12:11.830Z",
              "LastAPTimestamp": "2024-07-07T00:40:00.000Z",
              "LastAp": "A2O:3E:OFF"
            }
        ] */
        
        io.emit('eventName', {message: 'event message', data: output});
        res.send(output)
    })
    
    device.get('/team/u/:teamName', async (req, res) => {
        /* 
            #swagger.tags = ['Device'] 
            #swagger.summary = '[MobileAdmin.UnregisteredDevices] Select all devices where department short is matched to teamName'
        */
        let { teamName } = req.params
    
        const output = {}
    
        const team_devices = await sequelize.query(
            "SELECT * FROM [MIM_Prod].[MobileAdmin].[UnregisteredDevices] WHERE dept_name_short = :id", {
            replacements: { id: teamName },
            type: QueryTypes.SELECT
        })
    
        output.team_devices = team_devices
    
        /* Example Data
        output.team_devices = [
            {
              "SerialNum": "R28J42T2DSE",
              "ModelId": "SM-G950U1",
              "ModelName": "S8",
              "AndroidVer": "9",
              "MacAddress": "A0CC2BA55572",
              "IMEI": "357753081412390",
              "ICCId": "89014103272725604033",
              "PhoneNum": "12016374550",
              "McuvicId": "S8_5572",
              "EMMId": "S8_2DSE",
              "EMMGroup": "SAS PLTE",
              "EMMStatus": "Active",
              "VPNId": "S8_5572",
              "LastUserGhrId": "10520887",
              "mysingle_id": "n.bowlin",
              "nt_id": "nbowlin",
              "full_name": "Nathaniel Bowlin",
              "dept_name_short": "IT Strategy",
              "LastUserDeptName": "IT Strategy - Mobile & Information Management",
              "LastUserTimestamp": "2021-06-14T15:25:12.387Z",
              "LastAPTimestamp": "2022-01-07T09:06:41.000Z",
              "LastAp": "A2F:FSF:I03"
            },
            {
              "SerialNum": "R28K31JQP8F",
              "ModelId": "SM-N950U1",
              "ModelName": "Note 8",
              "AndroidVer": "9",
              "MacAddress": "8C45000BB590",
              "IMEI": "358510081771137",
              "ICCId": "89014102271992379890",
              "PhoneNum": "15125712200",
              "McuvicId": "Note8_56488",
              "EMMId": "Note8_QP8F",
              "EMMGroup": "SAS PLTE",
              "EMMStatus": "Active",
              "VPNId": "Note8_B590",
              "LastUserGhrId": "21518224",
              "mysingle_id": "j2.jun",
              "nt_id": "jjun8224",
              "full_name": "Jinwon Jun",
              "dept_name_short": "IT Strategy",
              "LastUserDeptName": "IT Strategy - Application Solutions",
              "LastUserTimestamp": "2024-07-02T09:07:51.350Z",
              "LastAPTimestamp": "2024-07-02T10:00:00.000Z",
              "LastAp": "A2O:3E:OFF"
            }
        ] */
    
        res.send(output)
    })
    
    device.get('/user/:user', async (req, res) => {
        /* 
            #swagger.tags = ['Device'] 
            #swagger.summary = '[MobileAdmin.RegisteredDevices] Select all devices that match the users input id'
        */
        let { user } = req.params
    
        const output = {}
    
        const my_devices = await sequelize.query(
            "SELECT * FROM [MIM_Prod].[MobileAdmin].[RegisteredDevices] WHERE ( assignedUser = :id OR ashift = :id OR bshift = :id OR cshift = :id OR dshift = :id ) ", {
            replacements: { id: user },
            type: QueryTypes.SELECT
        })
    
        output.my_devices = my_devices
    
        /* Example Data
        output.my_devices = [
            {
              "serialNumber": "R52X50892RL",
              "ownerTeam": "Etch",
              "registerDate": "2024-07-02",
              "gsWave": null,
              "assignedUser": "m.banach",
              "checkUser": null,
              "checkTimestamp": null,
              "ashift": "",
              "bshift": "",
              "cshift": "Juan A Ochoa",
              "dshift": "kfinkernagel3138",
              "deviceNotes": null,
              "ModelId": "SM-X810",
              "ModelName": "Tab S9+",
              "AndroidVer": "14",
              "MacAddress": "08A5DFFC78D5",
              "IMEI": null,
              "ICCId": null,
              "PhoneNum": null,
              "McuvicId": "TabS9Plus_78D5",
              "EMMId": "TabS9Plus_92RL",
              "EMMGroup": "SAS WiFi",
              "VPNId": null,
              "LastUserGhrId": "21533138",
              "mysingle_id": "k.finkernage",
              "nt_id": "kfinkernagel3138",
              "full_name": "Kyle Patrick Finkernagel",
              "dept_name_short": "IT Strategy",
              "LastUserDeptName": "IT Strategy - Wireless Services",
              "LastUserTimestamp": "2024-07-03T10:04:55.710Z",
              "LastAPTimestamp": "2024-07-08T17:40:00.000Z",
              "LastAp": "A2O:2E:CR205"
            },
            {
              "serialNumber": "R5CW914922H",
              "ownerTeam": "IT Strategy",
              "registerDate": "2024-03-28",
              "gsWave": "M-00022 On Loan",
              "assignedUser": "kfinkernagel3138",
              "checkUser": null,
              "checkTimestamp": null,
              "ashift": null,
              "bshift": null,
              "cshift": null,
              "dshift": null,
              "deviceNotes": null,
              "ModelId": "SM-G736U1",
              "ModelName": "XCover6 Pro",
              "AndroidVer": "13",
              "MacAddress": "B40B1DA135F9",
              "IMEI": "359299951796569",
              "ICCId": "89012803330882996787",
              "PhoneNum": "15129792486",
              "McuvicId": "XCover6Pro_35F9",
              "EMMId": "XCover6Pro_922H",
              "EMMGroup": "SAS PLTE",
              "VPNId": "XCover6Pro_2486",
              "LastUserGhrId": "22500971",
              "mysingle_id": "mario.ruiz",
              "nt_id": "mruiz0971",
              "full_name": "Mario P. Ruiz",
              "dept_name_short": "Facilities Services",
              "LastUserDeptName": "Facilities Services IRP",
              "LastUserTimestamp": "2024-07-08T06:06:17.080Z",
              "LastAPTimestamp": "2024-07-08T17:40:00.000Z",
              "LastAp": "T1O:2W:BRIDGE"
            }
        ] */
    
        res.send(output)
    })
    
    device.post('/user/', async (req, res) => {
        /* #swagger.tags = ['Device']
           #swagger.summary = '[MobileAdmin.RegisteredDevices] Select all devices that match the any of the users provided ID'
           #swagger.parameters['limit'] = {
               in: 'body',
               description: 'Register new device to service',
               schema: {
                    name: 'string',
                    mysingle_id: 'string',
                    nt_id: 'string',
               }
           }
       */
        const output = {}
    
        const my_devices = await sequelize.query(
            "SELECT * FROM [MIM_Prod].[MobileAdmin].[RegisteredDevices] WHERE ( assignedUser in (:id, :id2, :id3 ) OR ashift in (:id, :id2, :id3 ) OR bshift in (:id, :id2, :id3 ) OR cshift in (:id, :id2, :id3 ) or dshift in (:id, :id2, :id3 ) ) ", {
            replacements: { id: req.body.name, id2: req.body.mysingle_id, id3: req.body.nt_id },
            type: QueryTypes.SELECT
        })
    
        output.my_devices = my_devices
    
        res.send(output)
    })
    
    device.get('/phonebook', async (req, res) => {
        /* #swagger.tags = ['Device']
           #swagger.summary = '[MobileAdmin.RegisteredDevices] Return phonebook data for devices with registered gsWave info'
        */
        const output = {}
    
        const phonebook = await sequelize.query(
            "SELECT gsWave, ownerTeam, assignedUser, ashift, bshift, cshift, dshift, full_name, LastUserTimestamp, LastUserDeptName, LastAPTimestamp FROM [MIM_Prod].[MobileAdmin].[RegisteredDevices] WHERE gsWave != '' AND gsWave IS NOT NULL", {
            type: QueryTypes.SELECT
        })
    
        output.phonebook = phonebook
    
        /* Example Data
        output.phonebook = [
            {
            "gsWave": "Tablet Clip - 07",
            "ownerTeam": "Metal",
            "assignedUser": null,
            "ashift": null,
            "bshift": null,
            "cshift": null,
            "dshift": null,
            "full_name": "Kenneth Scott Mills",
            "LastUserDeptName": "AT Operations",
            "LastAPTimestamp": "2024-07-08T17:35:00.000Z"
            },
            {
            "gsWave": "M-00004 2024-05-09",
            "ownerTeam": "IT Strategy",
            "assignedUser": "",
            "ashift": null,
            "bshift": null,
            "cshift": null,
            "dshift": null,
            "full_name": "Brandon Wayne Hablinski",
            "LastUserDeptName": "CM Engineering",
            "LastAPTimestamp": "2024-07-08T17:35:00.000Z"
            }
        ]*/
    
        res.send(output)
    })
    
    device.post('/upsert', [
        body('serialNumber').not().isEmpty().withMessage('Serial number is required')
    ], async (req, res, next) => {
        /* 
            #swagger.tags = ['Device']
            #swagger.summary = '[MobileAdmin.Device] Create/Update a device into the system.'
            #swagger.parameters['limit'] = {
                in: 'body',
                description: 'Register new device to service',
                schema: {
                    serialNumber: 'string',
                    ownerTeam: 'string',
                    registerDate: 'string',
                    gsWave: 'string',
                    assignedUser: 'string',
                    checkUser: 'string',
                    checkTimestamp: 'string',
                    ashift: 'string',
                    bshift: 'string',
                    cshift: 'string',
                    dshift: 'string',
                    deviceNotes: 'string'
                }
            }
        */
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    
        try {
            const [instance, wasCreated] = await MobileAdmin_Device.upsert(req.body, { returning: true });
    
            io.emit('device_update', instance);
    
            res.send({
                message: wasCreated ? 'Device created successfully.' : 'Device updated successfully.',
                device: instance
            });
    
        } catch (error) {
            next(error);
        }
    });
    
    device.get('/serial/:serialNumber', async (req, res) => {
        /* 
            #swagger.tags = ['Device']
            #swagger.summary = '[MobileAdmin.RegisteredDevices] Lookup a device from its serial number'
        */
        let { serialNumber } = req.params
    
        const output = {}
    
        const device = await sequelize.query(
            "SELECT * FROM MobileAdmin.RegisteredDevices WHERE serialNumber = :id", {
            replacements: { id: serialNumber },
            type: QueryTypes.SELECT
        })
    
        output.device = device[0]
    
        res.send(output)
    });
    
    return device;
};