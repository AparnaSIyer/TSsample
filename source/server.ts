import express from 'express';
import bodyParser, { json } from 'body-parser';
import logging from './config/logging';
import config from './config/config';
import mongoose from 'mongoose';
import { BookRoutes } from './routes/bookRoute';
import { SampleRoutes}  from './routes/sampleRoutes';
const NAMESPACE="Server";

class App{

    public app : express.Application;
    private dbUri : string= 'mongodb+srv://aparna_31:test123@cluster0.1d44q.mongodb.net/node-tuts?retryWrites=true&w=majority';
    
    private book_routes: BookRoutes = new BookRoutes();
    private sample_routes: SampleRoutes= new SampleRoutes();

    constructor(){
        this.app = express();
        this.config();
        this.mongoConnect();
        this.book_routes.route(this.app);
        this.sample_routes.route(this.app);
    }

    private config():void{
        this.app.use((req, res, next) => {
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
    
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(bodyParser.json());
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
    private mongoConnect():void{
        mongoose.connect(this.dbUri, { useNewUrlParser: true, useUnifiedTopology: true })
        .catch((err) => {
            return err.json.toString;
        });
    }
    
};

let server = new App();
server.app.listen(config.server.port, () => logging.info(NAMESPACE, `Server running on ${config.server.hostname}: ${config.server.port}`));