require('dotenv').config()
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || '3000';
const HOST = process.env.HOST || 'localhost';
const IP = process.env.IP;

// < TAG: HARD_URL >
const BASE_URL_2423 = `https://${HOST}:2423`
const BASE_URL_3000 = `https://${HOST}:2324`
const BASE_LOCAL_2423 = 'https://localhost:2423'
const BASE_LOCAL_3000 = 'https://localhost:2324'
const BASE_IP_2423 = `https://${IP}:2423`
const BASE_IP_3000 = `https://${IP}:2324`

const CERT_PATH = path.join(__dirname, 'cert', 'mydomain.crt');
const KEY_PATH = path.join(__dirname, 'cert', 'mydomain.key');

const FILE_STREAM_CONFIG = {
    date_format: 'YYYY-MM-DD',
    filename: './log/api-%DATE%.log',
    frequency: 'daily',
    verbose: false
}

const HTTPS_OPTIONS = {
    cert: fs.readFileSync(CERT_PATH),
    key: fs.readFileSync(KEY_PATH)
}

const CORS_OPTIONS = {
    origin: [BASE_URL_2423, BASE_URL_3000, BASE_LOCAL_2423, BASE_LOCAL_3000, BASE_IP_2423, BASE_IP_3000, 'https://it-0655:2423/'],
    methods: ["GET", "POST", "PUT"],
    credentials: true
}

module.exports = {
    CORS_OPTIONS,
    HTTPS_OPTIONS,
    FILE_STREAM_CONFIG,

    PORT, HOST
}

/*

MIM_DEV_USER='mimadmin'
MIM_DEV_PASS='2ZQ^f$*ne7$zD5'
MIM_DEV_NAME='MIM_Dev'
MIM_DEV_HOST='sql2k16dev'

MIM_PROD_USER='mimadmin'
MIM_PROD_PASS='Mim@dmin!2022'
MIM_PROD_NAME='MIM_Prod'
MIM_PROD_HOST='SASSQL16'

*/