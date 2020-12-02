import * as mongoose from 'mongoose';

const Schema =  mongoose.Schema;


const bookSchema= new Schema({

    isbn:{
        type:String,
        required:true
    },
    title: {
        type:String,
        required:true
    },
    author_name:{
        type: String,
        required: true
    },
    category_name:{
        type:String,
        required: true
    }
});


export default mongoose.model('books',bookSchema);