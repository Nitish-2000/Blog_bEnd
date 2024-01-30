import express from "express";
import userRouter from "./user.js";
import blogRouter from "./blogs.js";
import dashboardRouter from "./dashboard.js";

const routes = express.Router();

// routes.get('/',(req,res)=>{
//     res.status(200).send(`
//     <h1>Hello World</h1>`)
// })
routes.use("/users", userRouter);
routes.use("/blog", blogRouter);
routes.use("/dashboard", dashboardRouter);

export default routes;
