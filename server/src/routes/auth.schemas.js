const loginOpts = {
  schema: {
    body: {
      type: "object",
      properties: {
        email: { type: "string" },
        password: { type: "string" },
      },
      required: ["email", "password"],
    },
    response: {
      200: {
        type: "object",
        properties: {
          _id: { type: "string" },
          email: { type: "string" },
          name: { type: "string" },
        },
      },
    },
  },
};
const isauthOpts = {
  schema: {
    response: {
      200: {
        type: "object",
        properties: {
          _id: { type: "string" },
          email: { type: "string" },
          name: { type: "string" },
        },
      },
    },
  },
};

module.exports = {
  isauthOpts,
  loginOpts,
};
