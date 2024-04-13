import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name:{
        type: String,
        require: true,
        trim: true
    },
    lastName:{
        type: String,
        require: true,
        trim: true
    },
    email:{
        type: String,
        require: true,
        trim: true
    },
    password:{
        type: String,
        require: true
    },
    books:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book"
    }],
    createdAt: Date
});

const User = mongoose.model("User", userSchema);

export default User