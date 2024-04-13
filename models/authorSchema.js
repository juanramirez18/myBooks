import mongoose from "mongoose";

const authorSchema = mongoose.Schema({
    name:{
        type: String,
        trim: true,
        require: true
    },
    lastName:{
        type: String,
        trim: true,
        require: true
    },
    country:{
        type: String,
        trim: true,
        require: true,
        unique: true
    },
    books:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book"
    }],
    createAt: Date
});

const Author = mongoose.model("Author", authorSchema);
export default Author