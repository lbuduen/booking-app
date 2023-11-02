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
    console.error(error);
    return reply.code(500).send({ error: "An error occurred during login" });
  }
}

async function isUserAuth(request, reply) {
  if (request.cookies["x-access-token"]) {
    const cookie = request.unsignCookie(request.cookies["x-access-token"]);
    if (!cookie.valid) {
      return reply.code(403).send({ error: "Invalid access cookie" });
    }
    const jwtToken = cookie.value;
    if (!jwtToken) {
      return reply.code(401).send({ error: "Invalid access token" });
    }
    try {
      const userData = jwt.verify(jwtToken, process.env.DB_SECRET);
      const user = await User.findById(userData._id);
      return reply.send(user);
    } catch (error) {
      console.log(error);
      return reply.code(500).send({ error: "Unable to process access data" });
    }
  }
  return reply.code(401).send({ error: "No access cookie" });
}

async function logout(request, reply) {
  return reply
    .setCookie("x-access-token", "", {
      path: "/",
    })
    .send(true);
}

module.exports = {
  createUser,
  login,
  isUserAuth,
  logout,
};
