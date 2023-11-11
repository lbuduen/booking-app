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
    request.log.error(error);
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
      return reply.status(500).send(error);
    }
  }
  return reply.status(401).raw.end();
}

async function getAllUserPlaces(request, reply) {
  if (request.userId) {
    try {
      const places = await Place.find({ owner: request.userId });
      return reply.send(places);
    } catch (error) {
      reply.status(500).send(error);
    }
  }
  return reply.status(401).raw.end();
}

async function getAllPlaces(request, reply) {
  try {
    return reply.send(await Place.find());
  } catch (error) {
    reply.status(500).send(error);
  }
}

async function getPlaceById(request, reply) {
  try {
    const place = await Place.findById(request.params.id);
    if (place) {
      return reply.send(place);
    }
    return reply.status(404).send({ error: "Place not found" });
  } catch (error) {
    reply.status(500).send(error);
  }
}

async function updatePlace(request, reply) {
  if (request.userId && request.userId === request.body.owner) {
    delete request.body.owner;
    try {
      const place = await Place.findByIdAndUpdate(
        request.params.id,
        request.body,
        { new: true }
      );
      if (place) {
        return reply.send(place);
      }
      return reply.status(404).send({ error: "Place not found" });
    } catch (error) {
      reply.status(500).send(error);
    }
  }
  return reply.status(401).raw.end();
}

module.exports = {
  uploadPhotoLink,
  createPlace,
  getAllPlaces,
  getAllUserPlaces,
  getPlaceById,
  updatePlace,
};
