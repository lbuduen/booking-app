const createPlaceOpts = {
  schema: {
    body: {
      type: "object",
      properties: {
        title: { type: "string" },
        address: { type: "string" },
        photos: {
          type: "array",
          items: { type: "string" },
        },
        description: { type: "string" },
        perks: {
          type: "array",
          items: { type: "string" },
        },
        extraInfo: { type: "string" },
        checkIn: { type: "string" },
        checkOut: { type: "string" },
        maxGuests: { type: "number" },
      },
      required: ["title"],
    },
  },
};

module.exports = {
  createPlaceOpts,
};
