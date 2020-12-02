import  {Request, Response} from 'express';
import BookService from '../services/BookService';


export default class BookController{
    
    private book_service: BookService = new BookService();
    
    public createBook(req: Request, res: Response) {

        this.book_service.createBook(req).then(result=>{
            res.status(200).send({
                message: result
            });
        });
        

    }
    
}