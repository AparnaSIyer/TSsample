import { json } from 'body-parser';
import  {Request, Response} from 'express';
import { stringify } from 'querystring';
import Book from '../models/book';

export default class BookService{
    
    public createBook = async (req:Request) =>{
       let book=new Book(req.body);
       try{
        await book.save();
    }
    catch(ex){
        throw new Error(ex);
    }
   
        return book
    }

    public getAllBooks = async (req: Request)=> {
        try{
             return await Book.find({})
             .then((result)=>{
                 return result;

        })
        .catch((err)=>{
            if (err.response_code === undefined || err.response_code === null)
                return err;
            throw err;
        });
    }
        catch(ex){
            throw new Error(ex);
        }
        
    }

    public updateBook = async (req:Request) => {
        try{
            return await Book.findByIdAndUpdate(req.params.id, req.body,{useFindAndModify: false})
            .then((result)=>{
                if(!result){
                    return {};
                }
                else{
                    return Book.find({_id:req.params.id}).then((result)=>{
                        return result
                    })
                }
            });
        }
        catch(ex){
                throw new Error(ex);
        }

    }

    public deleteBook = async (req:Request) => {
        try{
            return await Book.findOneAndDelete({_id:req.params.id})
            .then((result)=>{
                if(!result){
                    return {};
                }
                else{
                    let res="Deleted"
                    return res;
                }
            });
        }
        catch(ex){
            if (ex.response_code === undefined || ex.response_code === null)
                console.log(ex);
            throw ex;
        }
    }

  
}