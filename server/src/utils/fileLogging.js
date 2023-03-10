const fs = require('fs');
const readline = require('readline');
const moment = require('moment');


module.exports.fileloging = async ( filename, err ) => {
  const errLogText=`{message: "${err.message}", time: ${Date.parse(new Date())}, code: ${err.code}, stackTrace: {${err.stack}}}`;    
  fs.writeFileSync(
     filename,
    `${errLogText}\n`,
    { encoding: "utf-8", flag: "a+" }
  );
}

module.exports.copyLogFile = (logFileName, messageParts) => {
    const newfilename=logFileName.slice(0,logFileName.length-4);
    const newFile = `${newfilename}_${moment(new Date()).format('yyyy-MM-DD-HH-mm-ss')}.txt`;
    fs.writeFileSync(
        logFileName,
        ``,
        { encoding: "utf-8", flag: "a+" }
      );
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