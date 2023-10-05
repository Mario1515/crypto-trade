const router = require('express').Router();
const cryptoManager = require('../managers/cryptoManager');
const { isAuth } = require("../middlewares/authMiddleware");
const {getErrorMessage} = require("../utils/errorHelpers");

router.get("/", async (req, res) => {

    const crypto = await cryptoManager.getAll().lean();

    res.render("crypto", {crypto} );
});

router.get("/create", isAuth, (req, res) => {
    res.render("crypto/create");
});

router.post("/create", isAuth, async (req, res) => {
    const cryptoData = {
        ...req.body,
        owner: req.user._id,
    };

    try{
        await cryptoManager.create(cryptoData);
        res.redirect("/crypto");
    } catch(err) {
        res.render("crypto/create", { error: getErrorMessage(err) });
    }
});



module.exports = router;