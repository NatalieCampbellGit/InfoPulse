const express = require("express");
const router = express.Router();
const TemplateImage = require("../../models/TemplateImage");
const multer = require("multer");
const upload = multer();
const withAuth = require("../../utils/auth");
const path = require("path");
const sharp = require("sharp");

// does not return all of the image data; they need to be requested individually
router.get("/", withAuth, async (req, res) => {
  try {
    const templateImages = await TemplateImage.findAll({
      attributes: ["id", "title", "description", "width", "height", "filename"],
      order: [["title", "ASC"]],
    });
    if (!templateImages || templateImages.length === 0) {
      res.status(404).json({ message: "No template images were found" });
      return;
    }
    const templateImagesData = templateImages.map((image) =>
      image.get({ plain: true })
    );
    res.status(200).json(templateImagesData);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err, message: "Error getting template images" });
  }
});

// TODO: confirm that image request in html is using the auth cookie
// if not, have to remove the withAuth middleware from this route
// return the image file for a single image
router.get("/:id", withAuth, async (req, res) => {
  try {
    const id = req.params.id;
    const image = await TemplateImage.findByPk(id);

    if (!image) {
      res.status(404).send("An image by that id was not found");
      return;
    }
    const imageData = image.get({ plain: true });

    if (!imageData || imageData.length === 0) {
      res.status(404).send("Image data not found");
      return;
    }

    const extension = path.extname(imageData.filename).slice(1).toLowerCase(); // remove the dot
    res.contentType(`image/${extension}`);
    res.status(200).send(imageData.image_data);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while retrieving image");
  }
});

// return metadata for a single image
router.get("/metadata/:id", withAuth, async (req, res) => {
  try {
    const id = req.params.id;
    const image = await TemplateImage.findByPk(id, {
      attributes: ["id", "title", "description", "width", "height", "filename"],
    });

    if (!image) {
      res.status(404).send("An image by that id was not found");
      return;
    }
    const imageData = image.get({ plain: true });

    if (!imageData || imageData.length === 0) {
      res.status(404).send("Image data not found");
      return;
    }

    res.status(200).json(imageData);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while retrieving image");
  }
});
router.post("/", withAuth, upload.single("image"), async function (req, res) {
  try {
    let image = req.file.buffer; // req.file.buffer contains the image data
    if (!image || image.length === 0) {
      res.status(400).json({ message: "No image data was received" });
      return;
    }
    // get the dimensions of the image using sharp library
    let { width, height } = await sharp(image).metadata();
    // scale image down to 1200px wide if bigger than this
    if (width > 1200) {
      try {
        const scaledImage = await sharp(image).resize(1200).toBuffer();
        image = scaledImage;
        const metaData = await sharp(image).metadata();
        width = metaData.width;
        height = metaData.height;
      } catch (error) {
        console.log("Couldn't rescale the image" + error.message);
      }
    }

    const title = req.body.title;
    const description = req.body.description;
    const filename = req.file.originalname; // req.file.originalname contains the original filename

    const newImage = await TemplateImage.create({
      image_data: image,
      title,
      description,
      width,
      height,
      filename,
    });
    if (newImage) {
      const savedImage = newImage.get({ plain: true });
      // console.log(savedImage)
      res.status(200).json({
        message: "Image uploaded and stored into database!",
        id: savedImage.id,
      });
    } else {
      console.log("An error occurred while uploading image");
      res
        .status(500)
        .json({ message: "An error occurred while saving the image" });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error, message: "An error occurred while uploading the image" });
  }
});

module.exports = router;
