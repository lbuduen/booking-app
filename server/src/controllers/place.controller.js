const path = require("node:path");
const Place = require("../models/place.model");

async function uploadPhotoLink(request, reply) {
  const download = require("image-downloader");

  const options = {
    url: request.body.photoLink,
    dest: path.join(__dirname, "../../uploads"),
  };

  try {
    const image = await download.image(options);
    return reply.send({ filename: path.basename(image.filename) });
  } catch (error) {
    console.error(error);
    return reply.code(500).send({ error: "Unable to upload photo link" });
  }
}

async function createPlace(request, reply) {
  if (request.userId) {
    try {
      const place = new Place({ ...request.body, owner: request.userId });
      const res = await place.save();
      return reply.send(res);
    } catch (error) {
      return reply.status(422).send(error);
    }
  }
  return reply.status(401);
}

module.exports = {
  uploadPhotoLink,
  createPlace,
};
