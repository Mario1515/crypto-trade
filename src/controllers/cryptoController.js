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

router.get("/:cryptoId/details", async (req, res) => {
    const cryptoId = req.params.cryptoId;

    const crypto = await cryptoManager.getOne(cryptoId).populate("purchased.user").lean();

    const isOwner = req.user?._id == crypto.owner._id; // checking if there is a user id

    console.log(crypto);

    res.render("crypto/details", { crypto, isOwner });
});

router.post("/:cryptoId/buy", isAuth, async (req, res) => {
    const cryptoId = req.params.cryptoId;
    const cryptoData = req.body;
    const user = req.user._id;

    try{

    await cryptoManager.buy(cryptoId, user)

    const current = await cryptoManager.getOne(cryptoId).lean();
    console.log(`this is current ${current.purchased}`);

    res.redirect(`/crypto/${cryptoId}/details`);

    } catch (err) {
        res.render("404");
        console.log(err);
    }

});


module.exports = router;