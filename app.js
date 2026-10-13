import 'dotenv/config'

import e from "express";
import path from "path";
import cookieParser from "cookie-parser";
import router from "./routes/userRouter.js";
import dbConnect from "./config/db.js";
import checkForAuthenticationCookie from "./middleware/authentication.js";
import blogRouter from "./routes/blogRouter.js";
import blogModel from "./models/blogModel.js";

const app = e();
const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(e.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));
app.use(e.static(path.resolve("./public")));

// Database connection
await dbConnect(process.env.MONGO_URL);

app.get("/", async (req, res) => {
  const allBlog = await blogModel.find({});
  res.render("home", {
    activePage: "home",
    user: req.user,
    blogs: allBlog,
  });
});

// routes
app.use("/user", router);
app.use("/blog", blogRouter);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
