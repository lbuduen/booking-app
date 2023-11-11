const fastifyPlugin = require("fastify-plugin");
const jwt = require("jsonwebtoken");

module.exports = fastifyPlugin(async function (fastify, opts) {
  fastify.decorateRequest("user", null);

  fastify.addHook("preHandler", async (request, reply) => {
    if (request.cookies["x-access-token"]) {
      const cookie = request.unsignCookie(request.cookies["x-access-token"]);
      if (cookie.valid) {
        const jwtToken = cookie.value;
        if (jwtToken) {
          try {
            const userData = jwt.verify(jwtToken, process.env.DB_SECRET);
            request.userId = userData._id;
          } catch (error) {
            fastify.log.error(error);
          }
        }
      }
    }
  });
});
