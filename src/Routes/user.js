import express from 'express'
const routes = express.Router()

routes.get('/',(req,res)=>{
    res.status(200).send(`
    <h1>Hello users</h1>`)
})

export default routes;