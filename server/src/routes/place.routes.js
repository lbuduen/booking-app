const placeController = require('../controllers/place.controller')
async function routes(fastify, options) {
  fastify.post("/upload-photo-link", placeController.uploadPhotoLink);
}

module.exports = routes;
