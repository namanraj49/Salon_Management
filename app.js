import express from "express"

const app = express()






import userRouter from './routes/user.routes.js'

app.use("/users",userRouter)