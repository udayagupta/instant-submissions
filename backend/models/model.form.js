const mongoose = require("mongoose");

const Form = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: false },
    ownerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

}, { timestamps: true })

module.exports = mongoose.model("Form", Form);

