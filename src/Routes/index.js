import express from 'express'
import userRouter from './user.js'
const routes = express.Router()

routes.get('/',(req,res)=>{
    res.status(200).send(`
    <h1>Hello World</h1>`)
})
routes.use('/users',userRouter)

export default routes;