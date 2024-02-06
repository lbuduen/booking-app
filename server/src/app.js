require("dotenv").config();
const fastify = require("fastify")({ logger: true });
const mongoose = require("mongoose");
const path = require("node:path");
const multer = require("fastify-multer");
const upload = multer({ dest: path.join(__dirname, "../uploads/") });

//connect to DB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => fastify.log.info("Connected to the database"))
  .catch((err) => fastify.log.error(err));

fastify.register(require("@fastify/cookie"), {
  secret: process.env.DB_SECRET, // for cookies signature
  hook: "onRequest", // set to false to disable cookie autoparsing or set autoparsing on any of the following hooks: 'onRequest', 'preParsing', 'preHandler', 'preValidation'. default: 'onRequest'
  parseOptions: {}, // options for parsing cookies
});

fastify.register(require("@fastify/static"), {
  root: path.join(__dirname, "../uploads"),
  prefix: "/uploads/",
});

fastify.register(multer.contentParser);
fastify.post(
  "/api/v1/upload/photos",
  { preHandler: upload.array("photos") },
  function (request, reply) {
    reply
      .code(200)
      .send({ filenames: request.files.map((file) => file.filename) });
  }
);

fastify.register(require("./plugins/addUser2Request"));

fastify.register(require("./routes/auth.routes"), { prefix: "/api/v1/auth" });
fastify.register(require("./routes/place.routes"), {
  prefix: "/api/v1/places",
});
fastify.register(require("./routes/booking.routes"), {
  prefix: "/api/v1/bookings",
});

if (process.env.NODE_ENV === "production") {
  fastify.register(require("@fastify/static"), {
    root: path.join(__dirname, "../../client/dist/assets"),
    prefix: "/assets/",
    decorateReply: false,
  });

  fastify.get("*", function (req, reply) {
    reply.sendFile("index.html", path.join(__dirname, "../../client/dist"));
  });
}
//start server
async function main() {
  try {
    const port = process.env.PORT || 5000;
    const host = "RENDER" in process.env ? `0.0.0.0` : `localhost`;
    await fastify.listen({ host, port });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}
main();
