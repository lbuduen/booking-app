const bookingOpts = {
  schema: {
    body: {
      type: "object",
      properties: {
        place: { type: "string" },
        name: { type: "string" },
        phone: { type: "string" },
        checkIn: { type: "string" },
        checkOut: { type: "string" },
        guests: { type: "number" },
      },
      required: ["place", "name", "phone", "checkIn", "checkOut"],
    },
  },
};

module.exports = {
  bookingOpts,
};
