import { NextFunction, Request, Response } from "express";
import { Socket } from "socket.io";

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const ntlm = require('express-ntlm');
const fsr = require('file-stream-rotator');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger_output.json');
const socketIo = require('socket.io');
const https = require('https');
const sequelize = require('./database/database')
const { QueryTypes } = require('sequelize')

// Env Variables ==============================================================
const { PORT, HTTPS_OPTIONS, FILE_STREAM_CONFIG, CORS_OPTIONS } = require('./env');
let data_cache_user_lookup: any = null
let last_data_cache_user_lookup: any = null

const fileStream = fsr.getStream(FILE_STREAM_CONFIG);
const app = express();

// Middleware Functions =======================================================
const updateCache = async () => {
    try {
        const user_lookup = await sequelize.query("SELECT ghrNumber, full_name, mysingle_id, nt_id FROM [MIM_PROD].[MobileAdmin].[RegisteredUsers]", {
            type: QueryTypes.SELECT
        })
        data_cache_user_lookup = user_lookup;
        last_data_cache_user_lookup = new Date();

    } catch (error) {
        console.error(error)

    }
}

const cacheMiddleware = async (req: Request, res: Response, next: any) => {
    const cacheDuration = 10 * 60 * 1000;
    const now = new Date();

    if (!last_data_cache_user_lookup || now.getTime() - last_data_cache_user_lookup.getTime() > cacheDuration) {
        await updateCache();
    }

    next();
}


// Middleware =================================================================
app.use(cors(CORS_OPTIONS));
app.use(ntlm());


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("tiny"));
app.use(morgan('combined', { stream: fileStream }));




// Server Starup===============================================================

const server = https.createServer(HTTPS_OPTIONS, app);

const io = socketIo(server, {
    cors: CORS_OPTIONS
});



// Docs Page ============================================================
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));

// Route Includes =======================================================
// Routes ===============================================================
const loginRoute = require('./routes/loginRoute')(io);
const deviceRoute = require('./routes/deviceRoute')(io);
const teamRoute = require('./routes/teamRoute')(io);
const userRoute = require('./routes/userRoute')(io);

app.use('/login', loginRoute);
app.use('/devices', deviceRoute);
app.use('/team', teamRoute);
app.use('/user', userRoute);

// Custom Mini-routes ===================================================
app.get('/user/lookup/', cacheMiddleware, (req: Request, res: Response, next: NextFunction) => {

    if (!data_cache_user_lookup) {
        return res.status(500).json({ error: 'Cache is not available' });
    } else {
        res.send(data_cache_user_lookup)
    }
})


// Server Startup =======================================================
io.on('connection', (socket: Socket) => {
    console.log({socketData: socket.id})
    console.log('a client connected');

    socket.on('disconnect', () => {
        console.log('client disconnected');
    });
});


server.listen(PORT, () => {
    console.log(`HTTPS Server is running on port ${PORT}`);
});

// Data Sync on launch ==================================================
updateCache();