import  {Request, Response} from 'express';
import Book from '../models/book';

export default class BookService{
    
    public createBook = async (req:Request) =>{
       let book=new Book(req.body);
       try {
         await book.save();
    } catch(ex) {
        throw new Error(ex)
    }
        return book
    }

    public getAllBooks = ()=>{

    }

    public updateBook = () => {

    }

    public deleteBook = () => {

    }

  
}