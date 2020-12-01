"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const logging_1 = __importDefault(require("./config/logging"));
const config_1 = __importDefault(require("./config/config"));
const sample_1 = __importDefault(require("./routes/sample"));
const NAMESPACE = 'Server';
const router = express_1.default();
router.use((req, res, next) => {
    logging_1.default.info(NAMESPACE, `METHOD - [${req.method}, URL - [${req.url}], IP [${req.socket.remoteAddress}]`);
    res.on('finish', () => {
        logging_1.default.info(NAMESPACE, `METHOD - [${req.method}, URL - [${req.url}], IP [${req.socket.remoteAddress}], 
            STATUS - [${res.statusCode}]`);
    });
    next();
});
router.use(body_parser_1.default.urlencoded({ extended: false }));
router.use(body_parser_1.default.json());
// Routes
router.use('/sample', sample_1.default);
// Handling error
router.use((req, res, next) => {
    const error = new Error('not found');
    return res.status(404).json({
        message: error.message
    });
});
const httpServer = http_1.default.createServer(router);
httpServer.listen(config_1.default.server.port, () => logging_1.default.info(NAMESPACE, `Server running on ${config_1.default.server.hostname}: ${config_1.default.server.port}`));
