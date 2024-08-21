require('dotenv').config()

const swaggerAutogen = require('swagger-autogen')()

const doc = {
    info: {
        title: 'Mobile Admin API',
        description: '',
    },
    host: `${process.env.HOST}:${process.env.PORT}`,
    schemes: ['https']
};

const prodOutputFile = './build/src/swagger_output.json'
const devOutputFile = './src/swagger_output.json'
const endpointsFiles = ['./src/index.ts']

swaggerAutogen(prodOutputFile, endpointsFiles, doc)
swaggerAutogen(devOutputFile, endpointsFiles, doc)