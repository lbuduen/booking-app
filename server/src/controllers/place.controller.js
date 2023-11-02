const path = require("node:path");

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

module.exports = {
  uploadPhotoLink,
};
