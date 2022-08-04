const isEmpty = require("./isEmpty");
const validator = require("validator");
module.exports = function validateImage(req) {
  let errors = {};
  req.body.title = !isEmpty(req.body.title) ? req.body.title : "";
  req.file = !isEmpty(req.file) ? req.file : "";

  if (isEmpty(req.body.title)) {
    errors.title = "Required title";
  }
  if (!req.file.filename) {
    errors.image = "Required image";
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
};
