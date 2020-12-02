"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const logging_1 = __importDefault(require("./config/logging"));
const config_1 = __importDefault(require("./config/config"));
const mongoose_1 = __importDefault(require("mongoose"));
const bookRoute_1 = require("./routes/bookRoute");
const NAMESPACE = "Server";
class App {
    constructor() {
        this.dbUri = 'mongodb+srv://aparna_31:test123@cluster0.1d44q.mongodb.net/node-tuts?retryWrites=true&w=majority';
        this.book_routes = new bookRoute_1.BookRoutes();
        this.app = express_1.default();
        this.config();
        this.mongoConnect();
        this.book_routes.route(this.app);
    }
    config() {
        this.app.use((req, res, next) => {
            logging_1.default.info(NAMESPACE, `METHOD - [${req.method}, URL - [${req.url}], IP [${req.socket.remoteAddress}]`);
            res.on('finish', () => {
                logging_1.default.info(NAMESPACE, `METHOD - [${req.method}, URL - [${req.url}], IP [${req.socket.remoteAddress}], 
                    STATUS - [${res.statusCode}]`);
            });
            next();
        });
        this.app.use(body_parser_1.default.urlencoded({ extended: false }));
        this.app.use(body_parser_1.default.json());
    }
    // Handling error
    // router.use((req, res, next) => {
    //     const error = new Error('not found');
    //     return res.status(404).json({
    //         message: error.message
    //     });
    // });
    //Create server
    // const httpServer = http.createServer(router);
    //Connect to mongo atlas
    mongoConnect() {
        mongoose_1.default.connect(this.dbUri, { useNewUrlParser: true, useUnifiedTopology: true })
            .catch((err) => {
            return err.json.toString;
        });
    }
}
;
let server = new App();
server.app.listen(config_1.default.server.port, () => logging_1.default.info(NAMESPACE, `Server running on ${config_1.default.server.hostname}: ${config_1.default.server.port}`));
//# sourceMappingURL=server.js.map