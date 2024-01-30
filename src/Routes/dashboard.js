import express from "express";
import dashboard from "../Controller/dashboard.js";
import auth from "../common/authentication.js";

const routes = express.Router();

routes.get("/", auth.validate, dashboard.dashboardData);

export default routes;
