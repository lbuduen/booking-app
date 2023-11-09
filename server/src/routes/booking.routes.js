const bookingController = require("../controllers/booking.controller");
const { bookingOpts } = require("./booking.schemas");

async function routes(fastify, options) {
  fastify.post("/", bookingOpts, bookingController.bookPlace);
  fastify.get("/", bookingController.getAllBookings);
  fastify.get("/:id", bookingController.getBookingById);
}

module.exports = routes;
