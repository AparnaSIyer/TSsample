import  { Application,Request, Response  } from 'express';
import  BookController from '../controllers/BookController';

export class BookRoutes{

    private book_controller : BookController = new BookController();

    public route(app:Application)
    {
        app.post('/book/save/',(req:Request, res: Response)=>{
            this.book_controller.createBook(req,res);

        });
    };

}
