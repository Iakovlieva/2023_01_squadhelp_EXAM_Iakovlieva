const nodecron  = require('node-cron');
const { copyLogFile }= require('../src/utils/fileLogging');

const { LOGFILE_PATH } = require('./config/path.config');
const { LOGFILENAME } = require('./constants');

module.exports.cronping = () => {
    const job = nodecron.schedule('20 10 2 * * *', () => {
      copyLogFile(`${LOGFILE_PATH}/${LOGFILENAME}`,  ['message: ', 'code: ', 'time: ']);
    });

    job.start();
}