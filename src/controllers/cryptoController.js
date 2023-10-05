const router = require('express').Router();

router.get("/", async (req, res) => {
    res.render("crypto");
});

module.exports = router;