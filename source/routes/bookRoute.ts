import  { Application,Request, Response  } from 'express';
import  BookController from '../controllers/BookController';

export class BookRoutes{

    private book_controller : BookController = new BookController();

    public route(app:Application)
    {
        app.get('/book/',(req:Request,res:Response)=>{
            this.book_controller.getAllBooks(req,res);
        });
        
        app.post('/book/save/',(req:Request, res: Response)=>{
            this.book_controller.createBook(req,res);

        });
        app.put('/book/update/:id',(req:Request,res: Response)=>{
            this.book_controller.updateBook(req,res);

        });
        app.delete('/book/delete/:id',(req:Request,res:Response)=>{
            this.book_controller.deleteBook(req,res);
        })
       
    };

}
