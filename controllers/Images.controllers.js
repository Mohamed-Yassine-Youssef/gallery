const upload = require("../util/upload");
const uploadImage = upload.single("image");
const Image = require("../models/image.models");
const validateImage = require("../validation/imageValidation");
const path = require("path");
const fs = require("fs");
module.exports = {
  Add: async (req, res) => {
    try {
      uploadImage(req, res, async function (err) {
        const { errors, isValid } = validateImage(req);
        if (err) {
          errors.image = err.message;
          res.status(404).json(errors);
        } else {
          if (!isValid) {
            res.status(404).json(errors);
          } else {
            const image = {
              title: req.body.title,
              image: req.file.filename,
              path: "http://localhost:5000" + "/images/" + req.file.filename,
            };
            await Image.create(image);
            await Image.find().then((result) => {
              res.status(200).json(result);
            });
          }
        }
      });
    } catch (error) {
      res.status(500).json({ message: err.message });
    }
  },
  FindAll: async (req, res) => {
    try {
      await Image.find().then((result) => {
        res.status(200).json(result);
      });
    } catch (errors) {
      res.status(500).json({ message: err.message });
    }
  },
  Delete: async (req, res) => {
    try {
      const image = await Image.findOne({ _id: req.params.id });
      const link = path.join(
        __dirname,
        "../public",
        image.path.split("http://localhost:5000")[1].toString()
      );
      await fs.unlink(link, async (err) => {
        await Image.findByIdAndRemove({ _id: req.params.id }).then(async () => {
          await Image.find().then((data) => {
            res.status(200).json(data);
          });
        });
      });
    } catch (error) {
      res.status(500).json({ message: err.message });
    }
  },
};
