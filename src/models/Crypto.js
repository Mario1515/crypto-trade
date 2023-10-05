const mongoose = require("mongoose");

const cryptoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
    },
    image: {
        type: String,
        required: [true, "ImageUrl is required"],
    },
    price: {
        type: Number,
        required: [true, "Price is required"],
    },
    description: {
        type: String,
        required: [true, "Description is required"],
    },
    payment: {
        type: String,
        required: [true, "Payment is required"],
    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref: "User",
    },

    comments: [
        {
            user: {
                type: mongoose.Types.ObjectId,
                required: true,
                ref: "User",
            },
        }
    ]
});

const Photo = mongoose.model("Photo", photoSchema);

module.exports = Photo;