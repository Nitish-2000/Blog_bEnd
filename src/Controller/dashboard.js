import blogModel from "../Models/blogs.js";

const dashboardData = async (req, res) => {
  try {
    let blogs = await blogModel.find({ status: "approved" });
    res.status(200).send({
      message: "successful",
      blogs,
    });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};
export default {
  dashboardData,
};
