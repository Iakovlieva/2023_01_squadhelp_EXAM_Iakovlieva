const path = require('path');
const fs = require('fs');
const env = process.env.NODE_ENV || 'development';

const imagesFilePath = env === 'production'
  ? '/var/www/html/images/'
  : path.resolve(__dirname, '../../public/images');

if (!fs.existsSync(imagesFilePath)) {
  fs.mkdirSync(imagesFilePath, {
    recursive: true,
  });
} 

const logFilePath = env === 'production'
? '/var/www/html/logfiles/'
: path.resolve(__dirname, '../../public/logfiles');

if (!fs.existsSync(logFilePath)) {
  fs.mkdirSync(logFilePath, {
    recursive: true,
  });
} 

module.exports = {
    IMAGES_PATH: imagesFilePath,
    LOGFILE_PATH: logFilePath,
}