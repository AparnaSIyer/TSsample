import  { Application,Request, Response  } from 'express';
import  BookController from '../controllers/BookController';

export class SampleRoutes{


    public route(app:Application)
    {
        app.get('/sample/',(req:Request, res: Response)=>{
            res.status(200).send({
                message: "Sample"
            });

        });
        
    };

}
