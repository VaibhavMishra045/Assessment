import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const connectDB= ()=>{
    mongoose
        .connect(process.env.MONGO_URI,{
            dbName: "assignment",
        })
        .then(()=>{
            console.log("Connected to database");
        })
        .catch((err)=>{
            console.log(`Some error occured while connecting to the database: ${err}`);
        })
}


export default connectDB;
