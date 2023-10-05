const Crypto = require("../models/Crypto");

exports.getAll = () => Crypto.find().populate("owner");

exports.getOne = (cryptoId) => Crypto.findById(cryptoId).populate("owner");

exports.create = (cryptoData) => Crypto.create(cryptoData);

exports.buy = async (cryptoId, user) => {

    const crypto = await Crypto.findById(cryptoId);

    crypto.purchased.push({user: user});

    return crypto.save();
}
