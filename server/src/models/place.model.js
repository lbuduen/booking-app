const mongoose = require("mongoose");

const placeSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    title: String,
    address: String,
    photos: [String],
    description: String,
    perks: [String],
    extraInfo: String,
    checkIn: Date,
    checkOut: Date,
    maxGuests: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Place", placeSchema);
