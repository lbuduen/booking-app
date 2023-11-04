const placeController = require("../controllers/place.controller");
const { createPlaceOpts } = require("./place.schemas");

async function routes(fastify, options) {
  fastify.post("/upload-photo-link", placeController.uploadPhotoLink);
  fastify.post("/", createPlaceOpts, placeController.createPlace);
}

module.exports = routes;
