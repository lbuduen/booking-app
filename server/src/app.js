require("dotenv").config();
const fastify = require("fastify")({ logger: true });
const mongoose = require("mongoose");

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

fastify.register(require("./routes/auth.routes"), { prefix: "/api/v1/auth" });

//start server
async function main() {
  try {
    await fastify.listen({ port: process.env.PORT || 5000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}
main();
