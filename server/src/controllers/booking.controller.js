const Booking = require("../models/booking.model");

async function bookPlace(request, reply) {
  if (request.userId) {
    try {
      const booking = new Booking({ ...request.body, user: request.userId });
      const res = await booking.save();
      return reply.send(res);
    } catch (error) {
      return reply.status(422).send(error);
    }
  }
  return reply.status(401);
}

async function getAllBookings(request, reply) {
  if (request.userId) {
    try {
      return reply.send(
        await Booking.find({ user: request.userId }).populate("place")
      );
    } catch (error) {
      return reply.status(500).send(error);
    }
  }
  return reply.status(401);
}

async function getBookingById(request, reply) {
  if (!request.userId) {
    return reply.status(401);
  }
  try {
    const booking = await Booking.findById(request.params.id).populate("place");
    if (booking) {
      return reply.send(booking);
    }
    return reply.status(404);
  } catch (error) {
    return reply.status(500).send(error);
  }
}

module.exports = {
  bookPlace,
  getAllBookings,
  getBookingById,
};
