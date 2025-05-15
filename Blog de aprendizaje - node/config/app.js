import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import publicationRoutes from "../src/Publications/publication.routes.js"
import commentRoute from "../src/Comments/comment.routes.js"

const config = (app)=>{
    app.use(express.json())
    app.use(express.urlencoded({extended: false}))
    app.use(cors())
    app.use(helmet())
    app.use(morgan("dev"))
}

const routes = (app)=>{
    app.use('/publication',publicationRoutes)
    app.use('/comment', commentRoute)
}

export const initServer = ()=>{
    const app = express()
    try{
        config(app)
        routes(app)
        app.listen(process.env.PORT)
        console.log(`Server running in port: ${process.env.PORT}`)
    }catch(error){
        console.error("Server init failde", error)
    }
}