import e from "express";
import userModel from "../models/userModel.js";
const router = e.Router();

router.get("/signup", (req, res) => {
  return res.render("signup",{activePage:"signup"});
});
router.get("/signin", (req, res) => {
  return res.render("signin",{activePage:'signin'});
});

router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await userModel.matchPasswordAndGenerateToken(
      email,
      password,
    );

    // console.log("token", token);
    
    return res.cookie("token", token).redirect("/");
  } catch (error) {
    return res.status(401).render("signin", {
      error: "Incorrect Email or Password",
      activePage: "signin",
    });
  }
});

router.post("/signup", async (req, res) => {
  const { fullName, email, password } = req.body;
  await userModel.create({ fullName, email, password });
  return res.redirect("/user/signin");
});

router.get('/logout',(req,res)=>{
  res.clearCookie("token").redirect('/')
})
export default router;
