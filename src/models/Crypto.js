const mongoose = require("mongoose");

const cryptoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        minLength: 2,
    },
    image: {
        type: String,
        validate: /^https?:\/\//,
        required: [true, "ImageUrl is required"],
    },
    price: {
        type: Number,
        minLength: 0,
        required: [true, "Price is required"],
    },
    description: {
        type: String,
        required: [true, "Description is required"],
        minLength: 10,
    },
    payment: {
        type: String,
        required: [true, "Payment is required"],
    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref: "User",
    },
    purchased: [{
            type: mongoose.Types.ObjectId,
            ref: "User",
        }]
});

const Crypto = mongoose.model("Crypto", cryptoSchema);

module.exports = Crypto;