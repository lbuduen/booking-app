const mongoose = require("mongoose");

const bookingSchema = mongoose.Schema({
  place: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Place",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  checkIn: {
    type: Date,
    required: true,
  },
  checkOut: {
    type: Date,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  price: Number,
  guests: Number,
});

module.exports = mongoose.model("Booking", bookingSchema);
