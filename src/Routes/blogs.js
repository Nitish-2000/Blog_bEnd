import express from "express";
import auth from "../common/authentication.js";
import blogRoutes from "../Controller/blogs.js";
const routes = express.Router();

routes.post("/create", auth.validate, blogRoutes.createBlogs);
routes.put("/edit/:id", auth.validate, blogRoutes.editBlog);
routes.get("/user", auth.validate, blogRoutes.getBlogByUserId);
routes.put(
  "/status/:id/:status",
  auth.validate,
  auth.checkrole,
  blogRoutes.updateBlogStatus
);
routes.get("/", auth.validate, auth.checkrole, blogRoutes.getAllBlogs);
routes.get("/:id", blogRoutes.getBlogsById);
routes.delete("/delete/:id",blogRoutes.deleteblog) 

export default routes;
