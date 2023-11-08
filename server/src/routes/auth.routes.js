const authController = require("../controllers/auth.controller");
const { loginOpts, isauthOpts } = require("./auth.schemas");

async function routes(fastify, options) {
  fastify.post("/register", authController.createUser);
  fastify.post("/login", loginOpts, authController.login);
  fastify.get("/isauth", isauthOpts, authController.isUserAuth);
}

module.exports = routes;
