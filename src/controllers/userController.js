const router = require("express").Router();
const userManager = require("../managers/userManagers");
const { getErrorMessage } = require("../utils/errorHelpers");

router.get("/login", (req, res) => {
    res.render("users/login");
});

router.post("/login", async (req, res) => {
    const {email, password} = req.body;

    try { 
    const token = await userManager.login(email, password);
    res.cookie("token", token);
    res.redirect("/") 
    } catch (err) { 
        res.render("users/login", {error: getErrorMessage(err)});
    }
});

router.get("/register", (req, res) => {
    res.render("users/register");
});

router.post("/register", async (req, res) => {
    const { username, email, password, repeatPassword } = req.body;

    //validate password length
    if(password.length < 4){
        const err = new Error("Password must be at least 4 characters");
        res.render("users/register", {error: getErrorMessage(err)});
   }
   
    try {
    
    const token = await userManager.register({ username, email, password, repeatPassword });
    res.cookie("token", token);
    res.redirect("/");
     } catch (err) {
     res.render("users/register", {error: getErrorMessage(err)});
    }
 });

 router.get("/logout", (req, res) => {
    res.clearCookie("token");

    res.redirect("/")
})

module.exports = router;
