import mongoose from 'mongoose'

export const connectDb = async()=>{
    try {
       const conn =  await mongoose.connect(process.env.CONNECTION_STRING)
       console.log(`Connected to the database ${conn.connection.host}`)
    }
    catch(error){
        console.error(error);
    }
}