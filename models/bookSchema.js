import mongoose from "mongoose";

const bookSchema = mongoose.Schema({
    title:{
        type: String,
        require: true,
    },
    editorial:{
        type: String,
        require: true
    }, 
    opinions:{
        type: String,
    },
    author:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Author"
    }],
    userName: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    createdAt: Date
});


const Book = mongoose.model("Book", bookSchema)

export default Book
