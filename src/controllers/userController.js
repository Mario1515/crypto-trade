const router = require("express").Router();
const userManager = require("../managers/userManagers");

router.get("/login", (req, res) => {
    res.render("users/login");
});

module.exports = router;
