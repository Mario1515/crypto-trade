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

    const isOwner = req.user?._id == crypto.owner._id; // checking if this is the creater
    const isBuyer = crypto.purchased.some(id => id == req.user?._id); //checking if is the buyer
    
    res.render("crypto/details", { crypto, isOwner, isBuyer});
});

router.post("/:cryptoId/buy", isAuth, async (req, res) => {
    const cryptoId = req.params.cryptoId;
    const userId = req.user._id;

    try{

    await cryptoManager.buy(cryptoId, userId)
  
    res.redirect(`/crypto/${cryptoId}/details`);

    } catch (err) {
        res.render("404");
        console.log(err);
    }

});

router.get("/:cryptoId/delete", isAuth,  async (req,res) => {
    const cryptoId = req.params.cryptoId;
    
        try {
            await cryptoManager.delete(cryptoId);
    
            res.redirect("/crypto");
        } catch (err){
            res.render("404");
            console.log(`Error while deleting ${cryptoId}, error: ${err}`);
        }
});

router.get("/:cryptoId/edit", isAuth, async (req, res) => {
    const crypto = await cryptoManager.getOne(req.params.cryptoId).lean();

    res.render(`crypto/edit`, { crypto });
});

router.post("/:cryptoId/edit", isAuth, async (req, res) => {
    const cryptoData = req.body;
    const cryptoId = req.params.cryptoId;

    try{

    await cryptoManager.edit(cryptoId, cryptoData);

    res.redirect(`/crypto/${cryptoId}/details`);

    } catch (err) {
        const crypto = await cryptoManager.getOne(cryptoId).populate("purchased.user").lean();
        res.render("crypto/edit", {error: "Unable to edit photo", crypto}); //to check
    }

});


module.exports = router;