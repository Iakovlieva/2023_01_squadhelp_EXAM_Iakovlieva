const { Writable } = require('stream');
const fs = require('fs');
const path = require('path');


const fileloging = async (filename, text) => {

  fs.writeFileSync(
    filename,
    `${text}\n`,
    { encoding: "utf-8", flag: "a+" }
  );

    /*const nodeWritable = fs.createWriteStream(
      filepath,
      { encoding: "utf-8" }
    );

    const webWritableStream = Writable.toWeb(nodeWritable); //???
    const writer = webWritableStream.getWriter();

    try {
      await writer.write(`${text}\n`);  
      await writer.close();
    } finally {
      writer.releaseLock()
    }
    */
}

module.exports = (err, req, res, next) => {
  console.log(err);
  if (err.message ===
    'new row for relation "Banks" violates check constraint "Banks_balance_ck"' ||
    err.message ===
    'new row for relation "Users" violates check constraint "Users_balance_ck"') {
    err.message = 'Not Enough money';
    err.code = 406;
  }
        /*
        if (!err.message || !err.code) {
          err.message = 'Server Error';
          err.code = 500;
          res.status(500).send('Server Error');
        } else {
          res.status(err.code).send(err.message);
        }
        */
  if (!err.message || !err.code) {
    err.message = 'Server Error';
    err.code = 500;
  }

  const env = process.env.NODE_ENV || 'development';
  const devFilePath = path.resolve(__dirname, '../../public/logfiles');  
  const filePath = env === 'production'
  ? '/var/www/html/logfiles/'
  : devFilePath;

  if (!fs.existsSync(filePath)) {
    fs.mkdirSync(filePath, {
      recursive: true,
    });
  } 

  const logFileName = `${filePath}/logfile.txt`;

  const errLogText=`{message: "${err.message}", time: ${Date.parse(new Date())}, code: ${err.code}, stackTrace: {${err.stack}}}`;    

  fileloging(logFileName, errLogText);

  res.status(err.code).send(err.message);
  
};
