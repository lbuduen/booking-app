const placeController = require("../controllers/place.controller");
const { placeOpts } = require("./place.schemas");

async function routes(fastify, options) {
  fastify.post("/upload-photo-link", placeController.uploadPhotoLink);
  fastify.post("/", placeOpts, placeController.createPlace);
  fastify.get("/", placeController.getAllPlaces);
  fastify.get("/user", placeController.getAllUserPlaces);
  fastify.get("/:id", placeController.getPlaceById);
  fastify.put("/:id", placeOpts, placeController.updatePlace);
}

module.exports = routes;
