import http from 'http';
import express, { Router } from 'express';
import bodyParser from 'body-parser';
import logging from './config/logging';
import config from './config/config';
import sampleRoutes from './routes/sample';

const NAMESPACE = 'Server';
const router = express();

router.use((req, res, next) => {
    logging.info(NAMESPACE, `METHOD - [${req.method}, URL - [${req.url}], IP [${req.socket.remoteAddress}]`);

    res.on('finish', () => {
        logging.info(
            NAMESPACE,
            `METHOD - [${req.method}, URL - [${req.url}], IP [${req.socket.remoteAddress}], 
            STATUS - [${res.statusCode}]`
        );
    });
    next();
});

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

// Routes
router.use('/sample', sampleRoutes);

// Handling error
router.use((req, res, next) => {
    const error = new Error('not found');

    return res.status(404).json({
        message: error.message
    });
});

const httpServer = http.createServer(router);
httpServer.listen(config.server.port, () => logging.info(NAMESPACE, `Server running on ${config.server.hostname}: ${config.server.port}`));
