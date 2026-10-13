import e from "express";
import multer from "multer";
import path from "path";
import blogModel from "../models/blogModel.js";
import fs, { existsSync } from "fs";
import commentModel from "../models/comment.js";
const router = e.Router();

if (!existsSync("./public/uploads")) {
  fs.mkdirSync("./public/uploads");
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(`./public/uploads`));
  },
  filename: function (req, file, cb) {
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName);
  },
});
const upload = multer({ storage });

router.get("/add-new", (req, res) => {
  return res.render("addBlog", { user: req.user, activePage: "blog" });
});

router.post("/", upload.single("coverImage"), async (req, res) => {
  const { title, body } = req.body;
  const blog = await blogModel.create({
    title,
    body,
    createdBy: req.user._id,
    coverImageURL: `/uploads/${req.file.filename}`,
  });
  return res.redirect(`/blog/${blog._id}`);
});

router.get("/:id", async (req, res) => {
  const blog = await blogModel.findById(req.params.id).populate("createdBy");
  const comments = await commentModel
    .find({ blogId: req.params.id })
    .populate("createdBy");

  // console.log("comments", comments);

  return res.render("blog", {
    user: req.user,
    blog,
    comments,
    activePage: "blog",
  });
});

router.post("/comment/:blogId", async (req, res) => {
  const comment = await commentModel.create({
    content: req.body.content,
    blogId: req.params.blogId,
    createdBy: req.user._id,
  });
  return res.redirect(`/blog/${req.params.blogId}`);
});

export default router;
