const multer = require('multer');
const ServerError = require('../errors/ServerError');
const { IMAGES_PATH } = require('../config/path.config');


const storage = multer.diskStorage({
  destination (req, file, cb) {
    cb(null, IMAGES_PATH);
  },
  filename (req, file, cb) {
    cb(null, `${Date.now()}.${file.originalname}`)
  },
});

const uploadAvatar = multer({ storage }).single('avatar');
const uploadContestFiles = multer({ storage }).array(
  'files', 3);
  const updateContestFile = multer({ storage }).single(
  'file');
  const uploadLogoFiles = multer({ storage }).single(
  'offerData');

module.exports.uploadAvatar = (req, res, next) => {
  uploadAvatar(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      next(new ServerError());
    } else if (err) {
      next(new ServerError());
    }
    return next();
  });
};

module.exports.uploadContestFiles = (req, res, next) => {
  uploadContestFiles(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      next(new ServerError());
    } else if (err) {
      next(new ServerError());
    }
    return next();
  });
};

module.exports.updateContestFile = (req, res, next) => {
  updateContestFile(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      next(new ServerError());
    } else if (err) {
      next(new ServerError());
    }
    return next();
  });
};

module.exports.uploadLogoFiles = (req, res, next) => {
  uploadLogoFiles(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      next(new ServerError());
    } else if (err) {
      next(new ServerError());
    }
    return next();
  });
};
