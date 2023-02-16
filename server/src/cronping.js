const fs = require('fs');
const path = require('path');
const readline = require('readline');
const moment = require('moment');
const nodecron  = require('node-cron');
const { resolve } = require('path');

const env = process.env.NODE_ENV || 'development';
const devFilePath = path.resolve(__dirname, '../public/logfiles');  

const filePath = env === 'production'
? '/var/www/html/logfiles/'
: devFilePath;

  if (!fs.existsSync(filePath)) {
    fs.mkdirSync(filePath, {
      recursive: true,
    });
  } 

const logFileName = `${filePath}/logfile.txt`;

const messages = ['message: ', 'code: ', 'time: '];

function copyLogFile (logFileName, messageParts) {
  const newFile = `${filePath}/logfile_${moment(new Date()).format('yyyy-MM-DD-HH-mm-ss')}.txt`;
  fs.writeFileSync(
    newFile,
    ``,
    { encoding: "utf-8", flag: "a+" }
  );

  readline.createInterface({
            input: fs.createReadStream(logFileName),
            terminal: false
      }).on('line', function(line) {
            if (line.startsWith ('{message: "')) {
                let logline = '{';
                for (let i = 0; i < messageParts.length; i++) {
                    let start = line.indexOf(messageParts[i]);
                    let finish = line.indexOf(',',start+messageParts[i].length);        
                    logline+=line.slice(start, finish)+', '; 
                }
                logline=logline.slice(0,-2)+'}';
                fs.writeFileSync(
                  newFile,
                  `${logline}\n`,
                  { encoding: "utf-8", flag: "a+" }
                );
            }
      }).on('close', function(){
            fs.promises.writeFile(
              logFileName,
              ``,
              { encoding: "utf-8" }
            );
       });
}





module.exports.cronping = () => {
    const job = nodecron.schedule('20 10 2 * * *', () => {
      fs.writeFileSync(
        logFileName,
        ``,
        { encoding: "utf-8", flag: "a+" }
      );
      copyLogFile(logFileName, messages);
    });

    job.start();
}





