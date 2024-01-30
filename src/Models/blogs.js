import mongoose from "./index.js";

const blogSchema = mongoose.Schema(
  {
    title: { type: String, required: [true, "title is Required"] },
    imageUrl: { type: String, required: [true, "Url is Required"] },
    description: { type: String, required: [true, "descryption is Required"] },
    status: { type: String, default: "pending" },
    createdBy: { type: String, required: [true, " Creator name is required"] },
    approvedBy: { type: String },
    modifiedAt: { type: Date },
    rejectedBy: { type: String },
    reason: { type: String, default: "" },
    createdAt: { type: Date, default: Date.now() },
  },
  {
    versionkey: false,
  }
);

const blogModel = mongoose.model("blogs", blogSchema);

export default blogModel;
