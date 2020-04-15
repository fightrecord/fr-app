const admin = require('firebase-admin');
const Busboy = require('busboy');

module.exports = (req, res) => {
  const busboy = new Busboy({ headers });

  busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
    console.log('File [' + fieldname + ']: filename: ' + filename + ', encoding: ' + encoding + ', mimetype: ' + mimetype);

    file.on('data', data => {
      console.log('File [' + fieldname + '] got ' + data.length + ' bytes');
    });

    file.on('end', () => {
      console.log('File [' + fieldname + '] Finished');
    });
  });

  busboy.on('field', (fieldname, val) => {
    console.log('Field [' + fieldname + ']: value: ' + inspect(val));
  });

  busboy.on('finish', () => {
    console.log('Done parsing form!');
    res.send('OK');
  });

  req.pipe(busboy);
};