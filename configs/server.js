'use strict'

import express from "express"
import cors from "cors"
import helmet from "helmet"
import morgan from "morgan"
import { dbConnection } from "./mongo.js"
import authRoutes from "../src/auth/auth.routes.js"
import cursoRoutes from "../src/curso/curso.routes.js"
import apilimiter from "../middelwares/validar-cantidad-peticiones.js"
import studentRoutes from "../src/student/student.routes.js"
import teacherRoutes from "../src/teacher/teacher.routes.js"

const middelwares = (app)=> {
    app.use(express.urlencoded({extended: false}))
    app.use(express.json())
    app.use(cors())
    app.use(helmet())
    app.use(morgan("dev"))
    app.use(apilimiter)
}

const routes = (app) => {
    app.use("/gestorAcademico/v1/auth", authRoutes)
    app.use("/gestorAcademico/v1/curso", cursoRoutes)
    app.use("/gestorAcademico/v1/student", studentRoutes)
    app.use("/gestorAcademico/v1/teacher", teacherRoutes)
}

const conectarDB = async () =>{
    try{
        await dbConnection()
    }catch(err){
        console.log(`Database connection failed: ${err}`)
        process.exit(1)
    }
}

export const initServer = () =>{
    const app = express()
    try{
        middelwares(app)
        conectarDB()
        routes(app)
        app.listen(process.env.PORT)
        console.log(`Server runing on a port ${process.env.PORT}`)
    }catch(err){
        console.log(`Server int failed: ${err}`)
    }
}