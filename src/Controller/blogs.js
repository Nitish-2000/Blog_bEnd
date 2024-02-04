import blogModel from "../Models/blogs.js";

const createBlogs = async (req, res) => {
  try {
    let { title, imageUrl, description } = req.body;
    if (title && imageUrl && description) {
      await blogModel.create({
        title,
        imageUrl,
        description,
        createdBy: req.headers.userId
      });
      res.status(201).send({
        message: "Blog submitted and send for Approval!",
      });
    } else {
      res.status(400).send({
        message: "Title, url, description are required",
      });
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const editBlog = async (req, res) => {
  try {
    let blogId = await req.params.id;
    if (blogId) {
      let { title, imageUrl, description } = await req.body;

      let blog = await blogModel.findById(blogId);

      if (blog) {
        blog.title = title;
        blog.imageUrl = imageUrl;
        blog.description = description;
        blog.status="pending",
        blog.modifiedAt = Date.now();

        await blog.save();

        res.status(200).send({
          message: "Blog Editted Successfully",
        });
      }
    } else {
      res.status(400).send("Id not found");
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getBlogByUserId = async (req, res) => {
  try {
    let userBlogs = await blogModel.find({createdBy:req.headers.userId},{reason:0,__v:0});
    res.status(200).send({
      message: "Blogs retrived",
      userBlogs,  
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const updateBlogStatus = async (req, res) => {
  try {
    let blogId = await req.params.id;
    let status = await req.params.status;
    if (blogId && status) {
      const { reason } = await req.body;
      let blog = await blogModel.findById(blogId);
      if (status === "approved") {
        blog.status = "approved";
        blog.approvedBy = req.headers.id;
      } else if (status === "rejected") {
        blog.status = "rejected";
        // blog.reason = reason;
        blog.approvedBy = req.headers.id;
      } else {
        blog.status = "pending";
      }
      blog.modifiedAt = Date.now();
      await blog.save();

      res.status(200).send({
        message: "Blog Updated Successfully",
      });
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getAllBlogs = async (req, res) => {
  try {
    let userBlogs = await blogModel.find({}).sort({ creaatedAt: 1 });
    res.status(200).send({
      message: "blogs Fetched Successfully",
      userBlogs,
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getBlogsById = async (req, res) => {
  try {
    let blogId = await req.params.id;
    if (blogId) {
      let blog = await blogModel.findById(blogId);

      res.status(200).send({
        message: "Blog fetched",
        blog
      });
    } else {
      res.status(400).send({
        message: "id is required",
      });
    }
  } catch (error) {
    res.status(400).send(`invalid id ${req.params.id}`);
  }
};

const deleteblog = async(req,res)=>{
  try {
    let blogId = req.params.id;
    if(blogId){
      let res = await blogModel.deleteOne({_id:blogId})
      res.send({
        message:"blog Deleted"
      })
    }

  } catch (error) {
    
  }
}

export default {
  createBlogs,
  editBlog,
  getBlogByUserId,
  updateBlogStatus,
  getAllBlogs,
  getBlogsById,
  deleteblog
};
