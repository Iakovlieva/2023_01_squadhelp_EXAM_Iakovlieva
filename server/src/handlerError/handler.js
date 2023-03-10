const { LOGFILE_PATH } = require('../config/path.config');
const { LOGFILENAME } = require('../constants');
const { fileloging } = require('../utils/fileLogging');


module.exports = (err, req, res, next) => {
  console.log(err);
  if (err.message ===
    'new row for relation "Banks" violates check constraint "Banks_balance_ck"' ||
    err.message ===
    'new row for relation "Users" violates check constraint "Users_balance_ck"') {
    err.message = 'Not Enough money';
    err.code = 406;
  }
  if (!err.message || !err.code) {
    err.message = 'Server Error';
    err.code = 500;
  }

  fileloging(`${LOGFILE_PATH}/${LOGFILENAME}`, err);

  res.status(err.code).send(err.message);
};
