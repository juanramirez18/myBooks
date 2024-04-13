import mongoose from "mongoose";
import dotenv from "dotenv/config"

export const connectDb = async() => {
    try {
        const db = await mongoose.connect(process.env.DB_MONGO)
        const url = `${db.connection.host} : ${db.connection.port}`
        console.log("BD connect sucessful in:", url)
    } catch (error) {
        console.log(error)
    }
}