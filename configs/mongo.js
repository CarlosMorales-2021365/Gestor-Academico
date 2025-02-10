'use strict'

import mongoose from "mongoose"

export const dbConnection = async () => {
    try{
        mongoose.connection.on("error", ()=>{
            console.log('MongoDB | Could not br connect to MongoDB')
            mongoose.disconnect()
        })
        mongoose.connection.on("connecting", ()=>{
            console.log('MongoDB | Try connecting')
        })
        mongoose.connection.on("open", ()=>{
            console.log('MongoDB | Connected to database ')
        })
        mongoose.connection.on("reconnected", ()=>{
            console.log('MongoDB | Reconected to MongoDB')
        })
        mongoose.connection.on("disconnected", ()=>{
            console.log('MongoDB | Disconected to MongoDB')
        })

        await mongoose.connect(process.env.URI_MONGO,{
            serverSelectionTimeoutMS: 5000,
            maxPoolSize: 50
        })
    }catch(err){
        console.log(`Database connection failed ${err}`)
    }
}