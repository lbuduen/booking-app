const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

async function createUser(request, reply) {
  try {
    const user = new User(request.body);
    const res = await user.save();
    return reply.send(res);
  } catch (error) {
    reply.status(422).send(error);
  }
}

async function login(request, reply) {
  const { email, password } = request.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return reply.status(401).send({ error: "User not found" });
    }
    if (!(await user.comparePassword(password))) {
      return reply.status(401).send({ error: "Incorrect password" });
    }

    const jwtToken = user.generateAuthToken();

    return reply
      .setCookie("x-access-token", jwtToken, {
        path: "/",
        signed: true,
      })
      .send(user);
  } catch (error) {
    request.log.error(error);
    return reply.code(500).send({ error: "An error occurred during login" });
  }
}

async function isUserAuth(request, reply) {
  if (request.userId) {
    try {
      const user = await User.findById(request.userId);
      if (!user) {
        return reply.code(404).send({ error: "User not found" });
      }
      return reply.send(user);
    } catch (error) {
      request.log.log(error);
      return reply.code(500).send({ error: "Unable to process access data" });
    }
  }
  return reply.code(401).send({ error: "Unable to process access cookie, please log in" });
}

module.exports = {
  createUser,
  login,
  isUserAuth,
};
