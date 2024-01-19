import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import routes from './src/Routes/index.js'
dotenv.config()
const app = express()
app.use(express.json());


const PORT = process.env.PORT
app.use(cors())
app.use(express.Router())
app.use("/",routes)

app.listen(PORT,()=>console.log(`Server listening to port of ${PORT}`))