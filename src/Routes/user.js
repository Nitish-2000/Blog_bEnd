import express from 'express'
import userRoutes from '../Controller/user.js'
const routes = express.Router()

routes.post('/signup',userRoutes.createUser)
routes.post('/login',userRoutes.logincheck)

export default routes;