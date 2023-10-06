const Crypto = require("../models/Crypto");

exports.getAll = () => Crypto.find().populate("owner");

exports.getOne = (cryptoId) => Crypto.findById(cryptoId).populate("owner");

exports.search = async (name, payment) => {
   let crypto = await this.getAll().lean();

    if(name){
        crypto = crypto.filter(x => x.name.toLowerCase() == name);
        console.log(crypto);
    }

    if(payment){
        crypto = crypto.filter(x => x.payment == payment);
    }

    return crypto;
}

exports.create = (cryptoData) => Crypto.create(cryptoData);

exports.buy = async (cryptoId, userId) => {

    const crypto = await Crypto.findById(cryptoId);

    crypto.purchased.push(userId);

    return crypto.save();

}
exports.delete = (cryptoId) => Crypto.findByIdAndDelete(cryptoId);

exports.edit = (cryptoId, cryptoData) => Crypto.findByIdAndUpdate(cryptoId, cryptoData);
